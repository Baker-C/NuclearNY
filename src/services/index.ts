import { apiClient } from './clients';
import { UserService } from './userService';
import { AuthService } from './authService';
import { copyService } from './copyService';

export const userService = new UserService(apiClient);
export const authService = new AuthService(apiClient);
export { copyService };

