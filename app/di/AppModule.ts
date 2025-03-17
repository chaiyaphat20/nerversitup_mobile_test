import { GetDepartment } from "../domain/usecase/GetDepartments";
import { DepartmentModule } from "./DepartmentModule";

export class AppModule {
  static provideGetDepartmentsUseCase(): GetDepartment {
    return DepartmentModule.provideGetDepartmentUseCase();
  }
}
