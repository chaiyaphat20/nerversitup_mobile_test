import { GetDepartment } from "../domain/usecase/GetDepartments";
import { GetProducts } from "../domain/usecase/GetProducts";
import { DepartmentModule } from "./DepartmentModule";

export default class AppModule {
  static provideGetDepartmentsUseCase(): GetDepartment {
    return DepartmentModule.provideGetDepartmentUseCase();
  }

  static provideGetProductUseCase(): GetProducts {
    return DepartmentModule.provideProductUseCase();
  }
}
