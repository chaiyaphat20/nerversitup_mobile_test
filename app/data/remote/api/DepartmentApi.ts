import apiClient from '../../../common/network/axiosConfig';
import { DepartmentResponse } from '../model/DepartmentResponse';

export class DepartmentApi {
  async getDepartments(): Promise<DepartmentResponse[]> {
    try {
      const response = await apiClient.get<DepartmentResponse[]>(`/departments`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
