import { Department } from '../../model/Department';
import { Product } from '../../model/product';
import { DepartmentRepository } from '../repository/DepartmentRepository';

export class GetProducts {
  private departmentRepository: DepartmentRepository;

  constructor(departmentRepository: DepartmentRepository) {
    this.departmentRepository = departmentRepository;
  }

  async execute(departmentId:string): Promise<Product[]> {
    return this.departmentRepository.getProducts(departmentId);
  }
}
