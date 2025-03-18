import { GetProducts } from '../GetProducts';
import { DepartmentRepository } from '../../repository/DepartmentRepository';
import { Product } from '../../../model/product';

describe('GetProducts UseCase', () => {
  let mockDepartmentRepository: jest.Mocked<DepartmentRepository>;
  let getProductsUseCase: GetProducts;
  
  beforeEach(() => {
    mockDepartmentRepository = {
      getDepartments: jest.fn(),
      getProducts: jest.fn()
    } as jest.Mocked<DepartmentRepository>;
    
    getProductsUseCase = new GetProducts(mockDepartmentRepository);
  });
  
  it('should get products for specific department', async () => {
    const departmentId = '1';
    const mockProducts: Product[] = [
      { id: '1', name: 'Product 1', price: "100", departmentId:"1",desc:'',imageUrl:'',type:'' },
      { id: '2', name: 'Product 2', price: "200", departmentId: "1" ,desc:'',imageUrl:'',type:''},
    ];
    
    mockDepartmentRepository.getProducts.mockResolvedValue(mockProducts);
    
    const result = await getProductsUseCase.execute(departmentId);
    
    expect(mockDepartmentRepository.getProducts).toHaveBeenCalledWith(departmentId);
    expect(mockDepartmentRepository.getProducts).toHaveBeenCalledTimes(1);
    
    expect(result).toEqual(mockProducts);
    expect(result.length).toBe(2);
  });
  
  it('should return empty array when no products found', async () => {
    const departmentId = '999'; // ID ที่ไม่มีสินค้า
    
    mockDepartmentRepository.getProducts.mockResolvedValue([]);
    
    const result = await getProductsUseCase.execute(departmentId);
    
    expect(mockDepartmentRepository.getProducts).toHaveBeenCalledWith(departmentId);
    
    expect(result).toEqual([]);
    expect(result.length).toBe(0);
  });
  
  it('should propagate error when repository fails', async () => {
    const departmentId = '1';
    const mockError = new Error('Failed to fetch products');
    
    mockDepartmentRepository.getProducts.mockRejectedValue(mockError);
    
    await expect(getProductsUseCase.execute(departmentId)).rejects.toEqual(mockError);
    
    expect(mockDepartmentRepository.getProducts).toHaveBeenCalledWith(departmentId);
    expect(mockDepartmentRepository.getProducts).toHaveBeenCalledTimes(1);
  });
  
  it('should handle invalid department ID', async () => {
    const emptyDepartmentId = '';
    
    await getProductsUseCase.execute(emptyDepartmentId);
    
    expect(mockDepartmentRepository.getProducts).toHaveBeenCalledWith(emptyDepartmentId);
  });
});