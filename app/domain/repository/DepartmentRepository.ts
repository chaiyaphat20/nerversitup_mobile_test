import { Department } from "../../model/Department";

export interface DepartmentRepository {
    getDepartments(): Promise<Department[]>;
}
