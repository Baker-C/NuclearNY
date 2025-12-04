import { AxiosInstance } from 'axios';
import { ApiService } from './apiService';

export class UserService extends ApiService {
  constructor(client: AxiosInstance) {
    super(client);
  }

  getUserById({ id }: { id: string }) {
    return this.get(`/users/${id}`);
  }
}

