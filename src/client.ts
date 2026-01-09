import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { BASE_URL, DEV_URL } from './settings';
import { APIError } from './errors';
import type { Pagination } from './types';

export type ClientConfig = {
  url: string;
  jwt?: string;
  data?: object;
  params?: object;
};

// Estructura para la cola de peticiones fallidas
interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}

export class Client {
  private client: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: FailedRequest[] = [];

  // Guardamos los tokens internamente en el cliente
  public accessToken?: string;
  public refreshToken?: string;

  // Callback para notificar al frontend (AuthProvider) que los tokens cambiaron
  private onTokenUpdate?: (access: string, refresh: string) => void;
  // Callback para forzar logout si el refresh falla
  private onLogout?: () => void;

  constructor(isDevMode: boolean, origin?: string) {
    let headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (origin) {
      headers['Origin'] = origin;
    }
    this.client = axios.create({
      baseURL: isDevMode ? DEV_URL : BASE_URL,
      headers,
    });

    // Inicializar el interceptor de RESPUESTA (Vital para el refresh)
    this.setupInterceptors();
  }

  // Configurar callbacks desde el AuthProvider
  public setCallbacks(
    onTokenUpdate: (access: string, refresh: string) => void,
    onLogout: () => void,
  ) {
    this.onTokenUpdate = onTokenUpdate;
    this.onLogout = onLogout;
  }

  public setTokens(access: string, refresh: string) {
    this.accessToken = access;
    this.refreshToken = refresh;
  }

  public removeTokens() {
    this.accessToken = undefined;
    this.refreshToken = undefined;
  }

  private processQueue(error: any, token: string | null = null) {
    this.failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token!);
      }
    });
    this.failedQueue = [];
  }

  private setupInterceptors() {
    // Interceptor de Respuesta: Aquí ocurre la magia
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Si es 401 y NO es un reintento (_retry flag)
        if (error.response?.status === 401 && !originalRequest._retry) {
          // Si no tenemos refresh token, no podemos hacer nada -> error
          if (!this.refreshToken) {
            return Promise.reject(error);
          }

          if (this.isRefreshing) {
            // Si ya estamos refrescando, ponemos esta petición en cola
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers['Authorization'] = `Bearer ${token}`;
                return this.client(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            // Llamada directa al endpoint de refresh usando axios puro para evitar bucles
            // Ajusta la URL '/auth/refresh' según tu backend
            const response = await axios.post(
              `${this.client.defaults.baseURL}/auth/refresh`,
              {
                refresh_token: this.refreshToken,
              },
            );

            const { token, refresh_token } = response.data;

            // 1. Actualizar estado interno
            this.setTokens(token, refresh_token);

            // 2. Notificar al AuthProvider para que actualice localStorage/State
            if (this.onTokenUpdate) {
              this.onTokenUpdate(token, refresh_token);
            }

            // 3. Procesar la cola de peticiones en espera
            this.processQueue(null, token);

            // 4. Reintentar la petición original
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return this.client(originalRequest);
          } catch (refreshError) {
            // Si el refresh falla (token expirado o inválido)
            this.processQueue(refreshError, null);
            this.removeTokens();
            if (this.onLogout) this.onLogout(); // Logout forzado
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      },
    );
  }

  async call(method: string, config: ClientConfig): Promise<any> {
    // Usamos el token interno si no se pasa uno explícito,
    // pero priorizamos el config.jwt si existe (para llamadas específicas)
    const tokenToUse = config.jwt || this.accessToken;

    const axiosConfig: AxiosRequestConfig = {
      method: method,
      url: config.url,
      data: config.data,
      params: config.params,
      headers: {},
    };

    if (tokenToUse && axiosConfig.headers) {
      axiosConfig.headers['Authorization'] = `Bearer ${tokenToUse}`;
    }

    try {
      const response = await this.client.request(axiosConfig);
      return response.data;
    } catch (error: unknown) {
      // Manejo de errores simplificado para no ocultar el error original de Axios
      // que necesita el interceptor para funcionar.
      if (axios.isAxiosError(error)) {
        // Dejar pasar el error si ya fue procesado por el interceptor (o si es logout)
        const errorMessage = error.response?.data?.error;
        if (typeof errorMessage === 'string') {
          throw new APIError([errorMessage], error.response?.status ?? 500);
        }
        // Si quieres mantener tu APIError wrapper, asegúrate de no "comer"
        // el error antes de que el interceptor lo vea.
        // Nota: El interceptor corre ANTES que este catch.
        throw new APIError(
          ['Ocurrió un error inesperado'],
          error.response?.status ?? 500,
        );
      }
      throw new Error(error as string);
    }
  }

  async get(config: ClientConfig): Promise<any> {
    const isPaginated = config.params && 'page' in config.params;

    if (isPaginated) {
      const response = (await this.call(
        'get',
        config,
      )) as unknown as Pagination<any>;

      const baseURL = this.client.defaults.baseURL || '';

      if (response.next) {
        response.next = `${baseURL}${response.next}`;
      }
      if (response.previous) {
        response.previous = `${baseURL}${response.previous}`;
      }

      return response;
    } else {
      const data = await this.call('get', config);
      return data;
    }
  }
  async post(config: ClientConfig) {
    return this.call('post', config);
  }
  async put(config: ClientConfig) {
    return this.call('put', config);
  }
  async patch(config: ClientConfig) {
    return this.call('patch', config);
  }
  async delete(config: ClientConfig) {
    return this.call('delete', config);
  }
}
