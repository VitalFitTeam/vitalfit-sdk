import axios from 'axios';
import { HealthCheck } from './interfaces/healthCheck.interface';
import { ForgotPasswordDTO } from './interfaces/auth.forgotPassword.dto';
import { ForgotPasswordResponse } from './interfaces/auth.forgotPassword.interface';
export class VitalFitSDK {
    private baseURL: string;

    constructor(baseURL?: string) {
        this.baseURL = baseURL || process.env.NEXT_PUBLIC_VITALFIT_HOST || 'https://api.example.com';
        console.log('VitalFitSDK initialized with baseURL:', this.baseURL);
    }

    async healthCheck() : Promise<HealthCheck> {
        try {
            const response = await axios.get(`${this.baseURL}/health`);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to check health: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    async signUp(data: signUpDTO) : Promise<signUpResponse> {
        try {
            const response = await axios.post(`${this.baseURL}/auth/register`, data);

            return response.data;
        } catch (error) {
            throw new Error(`Failed to create user: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    
    async forgotPassword(data: ForgotPasswordDTO) : Promise<ForgotPasswordResponse> {
        try {
            // Petición POST al endpoint de la API
            const response = await axios.post(`${this.baseURL}/auth/password/forgot`, data);
            
            // La API retorna el código 200 si el proceso fue exitoso.
            // Retornamos los datos, tipados por ForgotPasswordResponse.
            return response.data;

        } catch (error) {
            // Maneja errores de red o errores 4xx/5xx de la API.
            // La documentación menciona errores 400 (datos inválidos) y 500 (servidor).
            throw new Error(`Failed to request password reset token: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    
    async login(data: LoginDTO) : Promise<LoginResponse> {
        try {
            // Petición POST al endpoint de la API /auth/login
            const response = await axios.post(`${this.baseURL}/auth/login`, data);
            
            // Retorna los datos de la respuesta (el token)
            return response.data;

        } catch (error) {
            // Manejo de errores simplificado para el SDK
            let errorMessage = "Unknown error during login.";
            
            if (axios.isAxiosError(error) && error.response) {
                // Captura el mensaje de la API o el estado HTTP
                errorMessage = error.response.data?.error || `API Error: ${error.response.status} - ${error.response.statusText}`;
            } else if (error instanceof Error) {
                 errorMessage = error.message;
            }

            throw new Error(`Failed to log in: ${errorMessage}`);
        }
    }
   
}
