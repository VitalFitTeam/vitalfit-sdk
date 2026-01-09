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

interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}

export class Client {
  private client: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: FailedRequest[] = [];

  public accessToken?: string;
  public refreshToken?: string;

  private onTokenUpdate?: (access: string, refresh: string) => void;
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

    this.setupInterceptors();
  }

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
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (!this.refreshToken) {
            return Promise.reject(error);
          }

          if (this.isRefreshing) {
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
            const response = await axios.post(
              `${this.client.defaults.baseURL}/auth/refresh`,
              {
                refresh_token: this.refreshToken,
              },
            );

            const { token, refresh_token } = response.data;

            this.setTokens(token, refresh_token);

            if (this.onTokenUpdate) {
              this.onTokenUpdate(token, refresh_token);
            }

            this.processQueue(null, token);

            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return this.client(originalRequest);
          } catch (refreshError) {
            this.processQueue(refreshError, null);
            this.removeTokens();
            if (this.onLogout) this.onLogout();
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
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error;
        if (typeof errorMessage === 'string') {
          throw new APIError([errorMessage], error.response?.status ?? 500);
        }
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
