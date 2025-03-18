import { DepartmentApi } from '../DepartmentApi';
import apiClient from '../../../../common/network/axiosConfig';
import { DepartmentResponse } from '../../model/DepartmentResponse';
import { ProductResponse } from '../../model/PropductResponse';

// Mock apiClient
jest.mock('../../../../common/network/axiosConfig', () => ({
  get: jest.fn()
}));

describe('DepartmentApi', () => {
  let departmentApi: DepartmentApi;
  
  beforeEach(() => {
    departmentApi = new DepartmentApi();
    jest.clearAllMocks();
  });
  
  describe('getDepartments', () => {
    it('should fetch departments from correct endpoint', async () => {
      // Mock data
      const mockDepartments: DepartmentResponse[] = [
        { id: "1", name: 'Electronics', imageUrl: 'electronics.jpg' },
        { id: "2", name: 'Clothing', imageUrl: 'clothing.jpg' }
      ];

      const mockDepartments2: DepartmentResponse[] = [
        { id: "1", name: 'Electronics ', imageUrl: 'electronics.jpg' },
        { id: "2", name: 'Clothing', imageUrl: 'clothing.jpg' }
      ];
      
      // Mock response
      (apiClient.get as jest.Mock).mockResolvedValue({
        data: mockDepartments
      });
      
      // Execute the method
      const result = await departmentApi.getDepartments();
      
      // Verify apiClient was called with correct endpoint
      expect(apiClient.get).toHaveBeenCalledWith('/departments');
      expect(apiClient.get).toHaveBeenCalledTimes(1);
      
      // Verify result
      expect(result).toEqual(mockDepartments);
      expect(result).not.toEqual(mockDepartments2);
      expect(result.length).toBe(2);
    });
    
    it('should propagate error when request fails', async () => {
      // Mock error
      const mockError = new Error('Network error');
      (apiClient.get as jest.Mock).mockRejectedValue(mockError);
      
      // Verify error is propagated
      await expect(departmentApi.getDepartments()).rejects.toEqual(mockError);
      
      // Verify apiClient was called
      expect(apiClient.get).toHaveBeenCalledWith('/departments');
      expect(apiClient.get).toHaveBeenCalledTimes(1);
    });
  });
  
  describe('getProducts', () => {
    it('should fetch products for specific department', async () => {
      // Input data
      const departmentId = '1';
      
      // Mock data
      const mockProducts: ProductResponse[] = [
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
      
      // Mock response
      (apiClient.get as jest.Mock).mockResolvedValue({
        data: mockProducts
      });
      
      // Execute the method
      const result = await departmentApi.getProducts(departmentId);
      
      // Verify apiClient was called with correct endpoint
      expect(apiClient.get).toHaveBeenCalledWith(`/departments/${departmentId}/products`);
      expect(apiClient.get).toHaveBeenCalledTimes(1);
      
      // Verify result
      expect(result).toEqual(mockProducts);
      expect(result.length).toBe(2);
    });
    
    it('should return empty array when no products found', async () => {
      // Input data
      const departmentId = '999';
      
      // Mock empty response
      (apiClient.get as jest.Mock).mockResolvedValue({
        data: []
      });
      
      // Execute the method
      const result = await departmentApi.getProducts(departmentId);
      
      // Verify apiClient was called with correct endpoint
      expect(apiClient.get).toHaveBeenCalledWith(`/departments/${departmentId}/products`);
      expect(apiClient.get).toHaveBeenCalledTimes(1);
      
      // Verify result
      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });
    
    it('should propagate error when products request fails', async () => {
      // Input data
      const departmentId = '1';
      
      // Mock error
      const mockError = new Error('Failed to fetch products');
      (apiClient.get as jest.Mock).mockRejectedValue(mockError);
      
      // Verify error is propagated
      await expect(departmentApi.getProducts(departmentId)).rejects.toEqual(mockError);
      
      // Verify apiClient was called
      expect(apiClient.get).toHaveBeenCalledWith(`/departments/${departmentId}/products`);
      expect(apiClient.get).toHaveBeenCalledTimes(1);
    });
  });
});