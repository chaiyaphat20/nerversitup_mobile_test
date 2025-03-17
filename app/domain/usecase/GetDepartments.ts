import { Department } from '../../model/Department';
import { DepartmentRepository } from '../repository/DepartmentRepository';

export class GetDepartment {
  private departmentRepository: DepartmentRepository;

  constructor(departmentRepository: DepartmentRepository) {
    this.departmentRepository = departmentRepository;
  }

  async execute(): Promise<Department[]> {
    return this.departmentRepository.getDepartments();
  }
}
