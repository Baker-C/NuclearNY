import { AxiosInstance } from 'axios';
import { ApiService } from './apiService';

export class AuthService extends ApiService {
  constructor(client: AxiosInstance) {
    super(client);
  }

  login({ email, password }: { email: string; password: string }) {
    return this.post('/auth/login', { email, password });
  }

  logout() {
    return this.post('/auth/logout');
  }
}

