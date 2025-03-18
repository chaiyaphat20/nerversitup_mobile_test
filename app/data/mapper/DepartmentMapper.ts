import { Department } from '../../model/Department';
import { DepartmentResponse } from '../remote/model/DepartmentResponse';

export class DepartmentMapper {
  static toDomain(response: DepartmentResponse): Department {
    return {
      id: response.id,
      name: response.name,
      imageUrl: response.imageUrl
    };
  }
}

import { Product } from '../../model/product';
import { ProductResponse } from '../remote/model/PropductResponse';

export class ProductMapper {
  static toDomain(response: ProductResponse): Product {
    return {
      name: response.name,
      imageUrl: response.imageUrl,
      desc: response.desc,
      price: response.price,
      type: response.type,
      id: response.id,
      departmentId: response.departmentId,
    };
  }
}