import { DepartmentRepository } from '../../domain/repository/DepartmentRepository';
import { Department } from '../../model/Department';
import { Product } from '../../model/product';
import { DepartmentMapper, ProductMapper } from '../mapper/DepartmentMapper';
import { DepartmentApi } from '../remote/api/DepartmentApi';
import { DepartmentResponse } from '../remote/model/DepartmentResponse';
import { ProductResponse } from '../remote/model/PropductResponse';

export class DepartmentRepositoryImpl implements DepartmentRepository {
  private departmentApi: DepartmentApi;

  constructor(departmentApi: DepartmentApi) {
    this.departmentApi = departmentApi;
  }

  async getDepartments(): Promise<Department[]> {
    try {
      const apiData = await this.departmentApi.getDepartments();
      return apiData.map(department => DepartmentMapper.toDomain(department));
    } catch (error) {
      throw error;
    }
  }

  async getProducts (departmentId:string): Promise<Product[]> {
      try {
      const apiData = await this.departmentApi.getProducts(departmentId);
      return apiData.map(product => ProductMapper.toDomain(product));
    } catch (error) {
      throw error;
    }
  }

}
