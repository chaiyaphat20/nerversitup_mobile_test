import { Department } from "../../model/Department";
import { Product } from "../../model/product";

export interface DepartmentRepository {
    getDepartments(): Promise<Department[]>;
    getProducts(departmentId:string): Promise<Product[]>;
}
