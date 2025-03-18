import { DepartmentRepositoryImpl } from '../DepartmentRepositoryImpl';
import { DepartmentApi } from '../../remote/api/DepartmentApi';
import { DepartmentResponse } from '../../remote/model/DepartmentResponse';
import { ProductResponse } from '../../remote/model/PropductResponse';

describe('DepartmentRepositoryImpl', () => {
  let mockDepartmentApi: jest.Mocked<DepartmentApi>;
  let departmentRepository: DepartmentRepositoryImpl;
  
  beforeEach(() => {
    mockDepartmentApi = {
      getDepartments: jest.fn(),
      getProducts: jest.fn()
    } as jest.Mocked<DepartmentApi>;
    
    departmentRepository = new DepartmentRepositoryImpl(mockDepartmentApi);
  });
  
  describe('getDepartments', () => {
    it('should transform API response to domain model', async () => {
      const mockApiResponse: DepartmentResponse[] = [
        { id: "1", name: 'Electronics', imageUrl: 'electronics.jpg' },
        { id: "2", name: 'Clothing', imageUrl: 'clothing.jpg' }
      ];
      
      mockDepartmentApi.getDepartments.mockResolvedValue(mockApiResponse);
      
      const result = await departmentRepository.getDepartments();
      
      expect(mockDepartmentApi.getDepartments).toHaveBeenCalledTimes(1);
      
      expect(result).toEqual([
        { id: "1", name: 'Electronics', imageUrl: 'electronics.jpg' },
        { id: "2", name: 'Clothing', imageUrl: 'clothing.jpg' }
      ]);
      
      expect(result.length).toBe(2);
    });
    
    it('should propagate error from API', async () => {
      const mockError = new Error('Network error');
      mockDepartmentApi.getDepartments.mockRejectedValue(mockError);
      
      await expect(departmentRepository.getDepartments()).rejects.toEqual(mockError);
      
      expect(mockDepartmentApi.getDepartments).toHaveBeenCalledTimes(1);
    });
  });
  
  describe('getProducts', () => {
    it('should return products for specific department', async () => {
      const departmentId = '1';
      
      const mockApiResponse: ProductResponse[] = [
        { 
          id: "101", 
          name: 'Laptop', 
          imageUrl: 'laptop.jpg', 
          desc: 'Powerful laptop', 
          price: "1200", 
          type: 'computer',
          departmentId: "1"
        },
        { 
          id: "102", 
          name: 'Smartphone', 
          imageUrl: 'phone.jpg', 
          desc: 'Latest model', 
          price: "800", 
          type: 'mobile',
          departmentId: "1" 
        }
      ];
      
      mockDepartmentApi.getProducts.mockResolvedValue(mockApiResponse);
      
      const result = await departmentRepository.getProducts(departmentId);
      
      expect(mockDepartmentApi.getProducts).toHaveBeenCalledWith(departmentId);
      expect(mockDepartmentApi.getProducts).toHaveBeenCalledTimes(1);
      
      expect(result).toEqual([
        { 
          id: "101", 
          name: 'Laptop', 
          imageUrl: 'laptop.jpg', 
          desc: 'Powerful laptop', 
          price: "1200", 
          type: 'computer',
          departmentId: "1"
        },
        { 
          id: "102", 
          name: 'Smartphone', 
          imageUrl: 'phone.jpg', 
          desc: 'Latest model', 
          price: "800", 
          type: 'mobile',
          departmentId: "1" 
        }
      ]);
      
      expect(result.length).toBe(2);
    });
    
    it('should return empty array when no products found', async () => {
      const departmentId = '999';
      
      mockDepartmentApi.getProducts.mockResolvedValue([]);
      
      const result = await departmentRepository.getProducts(departmentId);
      
      expect(mockDepartmentApi.getProducts).toHaveBeenCalledWith(departmentId);
      
      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });
    
    it('should propagate error from API when fetching products', async () => {
      const departmentId = '1';
      
      const mockError = new Error('Failed to fetch products');
      mockDepartmentApi.getProducts.mockRejectedValue(mockError);
      
      await expect(departmentRepository.getProducts(departmentId)).rejects.toEqual(mockError);
      
      expect(mockDepartmentApi.getProducts).toHaveBeenCalledWith(departmentId);
      expect(mockDepartmentApi.getProducts).toHaveBeenCalledTimes(1);
    });
  });
});