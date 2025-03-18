// data/repository/__tests__/DepartmentRepositoryImpl.test.ts
import { DepartmentRepositoryImpl } from '../DepartmentRepositoryImpl';
import { DepartmentApi } from '../../remote/api/DepartmentApi';
import { DepartmentResponse } from '../../remote/model/DepartmentResponse';
import { ProductResponse } from '../../remote/model/PropductResponse';

describe('DepartmentRepositoryImpl', () => {
  // สร้างตัวแปรสำหรับเก็บ mock API และ repository ที่ต้องการทดสอบ
  let mockDepartmentApi: jest.Mocked<DepartmentApi>;
  let departmentRepository: DepartmentRepositoryImpl;
  
  beforeEach(() => {
    // สร้าง mock สำหรับ DepartmentApi
    mockDepartmentApi = {
      getDepartments: jest.fn(),
      getProducts: jest.fn()
    } as jest.Mocked<DepartmentApi>;
    
    // สร้าง instance ของ repository ที่ใช้ mock API
    departmentRepository = new DepartmentRepositoryImpl(mockDepartmentApi);
  });
  
  describe('getDepartments', () => {
    it('should transform API response to domain model', async () => {
      // ข้อมูลจำลองจาก API
      const mockApiResponse: DepartmentResponse[] = [
        { id: "1", name: 'Electronics', imageUrl: 'electronics.jpg' },
        { id: "2", name: 'Clothing', imageUrl: 'clothing.jpg' }
      ];
      
      // กำหนดให้ API คืนค่าที่ต้องการ
      mockDepartmentApi.getDepartments.mockResolvedValue(mockApiResponse);
      
      // เรียกใช้เมธอดที่ต้องการทดสอบ
      const result = await departmentRepository.getDepartments();
      
      // ตรวจสอบว่า API ถูกเรียกใช้
      expect(mockDepartmentApi.getDepartments).toHaveBeenCalledTimes(1);
      
      // ตรวจสอบผลลัพธ์ว่าแปลงข้อมูลถูกต้อง
      expect(result).toEqual([
        { id: "1", name: 'Electronics', imageUrl: 'electronics.jpg' },
        { id: "2", name: 'Clothing', imageUrl: 'clothing.jpg' }
      ]);
      
      // ตรวจสอบจำนวนข้อมูลที่ได้รับ
      expect(result.length).toBe(2);
    });
    
    it('should propagate error from API', async () => {
      // จำลองการเกิดข้อผิดพลาดจาก API
      const mockError = new Error('Network error');
      mockDepartmentApi.getDepartments.mockRejectedValue(mockError);
      
      // ตรวจสอบว่า repository ส่งต่อข้อผิดพลาด
      await expect(departmentRepository.getDepartments()).rejects.toEqual(mockError);
      
      // ตรวจสอบการเรียกใช้ API
      expect(mockDepartmentApi.getDepartments).toHaveBeenCalledTimes(1);
    });
  });
  
  describe('getProducts', () => {
    it('should return products for specific department', async () => {
      // ข้อมูลนำเข้า
      const departmentId = '1';
      
      // ข้อมูลจำลองจาก API
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
      
      // กำหนดให้ API คืนค่าที่ต้องการ
      mockDepartmentApi.getProducts.mockResolvedValue(mockApiResponse);
      
      // เรียกใช้เมธอดที่ต้องการทดสอบ
      const result = await departmentRepository.getProducts(departmentId);
      
      // ตรวจสอบว่า API ถูกเรียกใช้ด้วยพารามิเตอร์ที่ถูกต้อง
      expect(mockDepartmentApi.getProducts).toHaveBeenCalledWith(departmentId);
      expect(mockDepartmentApi.getProducts).toHaveBeenCalledTimes(1);
      
      // ตรวจสอบผลลัพธ์
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
      
      // ตรวจสอบจำนวนข้อมูลที่ได้รับ
      expect(result.length).toBe(2);
    });
    
    it('should return empty array when no products found', async () => {
      const departmentId = '999';
      
      // กำหนดให้ API คืนอาร์เรย์ว่าง
      mockDepartmentApi.getProducts.mockResolvedValue([]);
      
      // เรียกใช้เมธอดที่ต้องการทดสอบ
      const result = await departmentRepository.getProducts(departmentId);
      
      // ตรวจสอบว่า API ถูกเรียกใช้ด้วยพารามิเตอร์ที่ถูกต้อง
      expect(mockDepartmentApi.getProducts).toHaveBeenCalledWith(departmentId);
      
      // ตรวจสอบผลลัพธ์
      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });
    
    it('should propagate error from API when fetching products', async () => {
      const departmentId = '1';
      
      // จำลองการเกิดข้อผิดพลาดจาก API
      const mockError = new Error('Failed to fetch products');
      mockDepartmentApi.getProducts.mockRejectedValue(mockError);
      
      // ตรวจสอบว่า repository ส่งต่อข้อผิดพลาด
      await expect(departmentRepository.getProducts(departmentId)).rejects.toEqual(mockError);
      
      // ตรวจสอบการเรียกใช้ API
      expect(mockDepartmentApi.getProducts).toHaveBeenCalledWith(departmentId);
      expect(mockDepartmentApi.getProducts).toHaveBeenCalledTimes(1);
    });
  });
});