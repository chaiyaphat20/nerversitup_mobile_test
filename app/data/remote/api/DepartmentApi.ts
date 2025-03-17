import apiClient from '../../../common/network/axiosConfig';
import { DepartmentResponse } from '../model/DepartmentResponse';
import { ProductResponse } from '../model/PropductResponse';

export class DepartmentApi {
  async getDepartments(): Promise<DepartmentResponse[]> {
    try {
      const response = await apiClient.get<DepartmentResponse[]>(`/departments`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getProducts(departmentId:string): Promise<ProductResponse[]> {
    try {
      const response = await apiClient.get<ProductResponse[]>(`/departments/${departmentId}/products`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
