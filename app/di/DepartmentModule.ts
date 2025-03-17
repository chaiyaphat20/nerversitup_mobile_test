import { DepartmentApi } from "../data/remote/api/DepartmentApi";
import { DepartmentRepositoryImpl } from "../data/repository/DepartmentRepositoryImpl";
import { GetDepartment } from "../domain/usecase/GetDepartments";
import { GetProducts } from "../domain/usecase/GetProducts";

export class DepartmentModule {
  static provideDepartmentApi(): DepartmentApi {
    return new DepartmentApi();
  }

  static provideDepartmentRepository(): DepartmentRepositoryImpl {
    const departmentApi = this.provideDepartmentApi();
    return new DepartmentRepositoryImpl(departmentApi);
  }

  static provideGetDepartmentUseCase(): GetDepartment {
    const departmentRepository = this.provideDepartmentRepository();
    return new GetDepartment(departmentRepository);
  }
  

  static provideProductUseCase(): GetProducts {
    const departmentRepository = this.provideDepartmentRepository();
    return new GetProducts(departmentRepository);
  }
}