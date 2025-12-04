import { AxiosInstance, AxiosResponse } from 'axios';

export abstract class ApiService {
  protected client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  protected async get<T = unknown>(
    url: string,
    config?: unknown
  ): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }

  protected async post<T = unknown>(
    url: string,
    data?: unknown,
    config?: unknown
  ): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

  protected async put<T = unknown>(
    url: string,
    data?: unknown,
    config?: unknown
  ): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config);
  }

  protected async delete<T = unknown>(
    url: string,
    config?: unknown
  ): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }
}

