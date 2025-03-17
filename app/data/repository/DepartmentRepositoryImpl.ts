import { DepartmentRepository } from '../../domain/repository/DepartmentRepository';
import { Department } from '../../model/Department';
import { DepartmentApi } from '../remote/api/DepartmentApi';
import { DepartmentResponse } from '../remote/model/DepartmentResponse';

export class DepartmentRepositoryImpl implements DepartmentRepository {
  private departmentApi: DepartmentApi;

  constructor(departmentApi: DepartmentApi) {
    this.departmentApi = departmentApi;
  }

  private mapResponseToModel(response: DepartmentResponse): Department {
    return {
      id: response.id,
      name: response.name,
      imageUrl:response.imageUrl
    };
  }

  async getDepartments(): Promise<Department[]> {
    try {
      const apiData = await this.departmentApi.getDepartments();
      return apiData.map(department => this.mapResponseToModel(department));
    } catch (error) {
      throw error;
    }
  }
}
