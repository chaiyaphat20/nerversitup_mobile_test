import { DepartmentRepository } from '../../domain/repository/DepartmentRepository';
import { Department } from '../../model/Department';
import { Product } from '../../model/product';
import { DepartmentApi } from '../remote/api/DepartmentApi';
import { DepartmentResponse } from '../remote/model/DepartmentResponse';
import { ProductResponse } from '../remote/model/PropductResponse';

export class DepartmentRepositoryImpl implements DepartmentRepository {
  private departmentApi: DepartmentApi;

  constructor(departmentApi: DepartmentApi) {
    this.departmentApi = departmentApi;
  }


  private mapResponseToDepartmentModel(response: DepartmentResponse): Department {
    return {
      id: response.id,
      name: response.name,
      imageUrl:response.imageUrl
    };
  }

  private mapResponseToProductModel(response: ProductResponse): Product {
    return {
      "name": response.name,
      "imageUrl":  response.imageUrl,
      "desc": response.desc,
      "price": response.price,
      "type": response.type,
      "id": response.id,
      "departmentId": response.departmentId,
    }
  }


  async getDepartments(): Promise<Department[]> {
    try {
      const apiData = await this.departmentApi.getDepartments();
      return apiData.map(department => this.mapResponseToDepartmentModel(department));
    } catch (error) {
      throw error;
    }
  }

  async getProducts (departmentId:string): Promise<Product[]> {
      try {
      const apiData = await this.departmentApi.getProducts(departmentId);
      return apiData.map(product => this.mapResponseToProductModel(product));
    } catch (error) {
      throw error;
    }
  }

}
