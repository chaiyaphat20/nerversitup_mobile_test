import { GetProducts } from '../GetProducts';
import { DepartmentRepository } from '../../repository/DepartmentRepository';
import { Product } from '../../../model/product';

describe('GetProducts UseCase', () => {
  // สร้างตัวแปรสำหรับเก็บ mock repository และ usecase
  let mockDepartmentRepository: jest.Mocked<DepartmentRepository>;
  let getProductsUseCase: GetProducts;
  
  beforeEach(() => {
    // สร้าง mock สำหรับ repository ในแต่ละ test case
    mockDepartmentRepository = {
      getDepartments: jest.fn(),
      getProducts: jest.fn()
    } as jest.Mocked<DepartmentRepository>;
    
    // สร้าง instance ของ UseCase โดยใช้ mock repository
    getProductsUseCase = new GetProducts(mockDepartmentRepository);
  });
  
  it('should get products for specific department', async () => {
    // สร้างข้อมูลจำลอง
    const departmentId = '1';
    const mockProducts: Product[] = [
      { id: '1', name: 'Product 1', price: "100", departmentId:"1",desc:'',imageUrl:'',type:'' },
      { id: '2', name: 'Product 2', price: "200", departmentId: "1" ,desc:'',imageUrl:'',type:''},
    ];
    
    // กำหนดให้ mock repository คืนค่าที่ต้องการ
    mockDepartmentRepository.getProducts.mockResolvedValue(mockProducts);
    
    // เรียกใช้ UseCase
    const result = await getProductsUseCase.execute(departmentId);
    
    // ตรวจสอบว่าเรียกใช้ repository method ด้วยพารามิเตอร์ที่ถูกต้อง
    expect(mockDepartmentRepository.getProducts).toHaveBeenCalledWith(departmentId);
    expect(mockDepartmentRepository.getProducts).toHaveBeenCalledTimes(1);
    
    // ตรวจสอบผลลัพธ์
    expect(result).toEqual(mockProducts);
    expect(result.length).toBe(2);
  });
  
  it('should return empty array when no products found', async () => {
    const departmentId = '999'; // ID ที่ไม่มีสินค้า
    
    // กำหนดให้ repository คืนอาร์เรย์ว่าง
    mockDepartmentRepository.getProducts.mockResolvedValue([]);
    
    // เรียกใช้ UseCase
    const result = await getProductsUseCase.execute(departmentId);
    
    // ตรวจสอบการเรียกใช้ repository
    expect(mockDepartmentRepository.getProducts).toHaveBeenCalledWith(departmentId);
    
    // ตรวจสอบผลลัพธ์
    expect(result).toEqual([]);
    expect(result.length).toBe(0);
  });
  
  it('should propagate error when repository fails', async () => {
    const departmentId = '1';
    const mockError = new Error('Failed to fetch products');
    
    // จำลองการเกิดข้อผิดพลาด
    mockDepartmentRepository.getProducts.mockRejectedValue(mockError);
    
    // ตรวจสอบว่า UseCase ส่งต่อข้อผิดพลาด
    await expect(getProductsUseCase.execute(departmentId)).rejects.toEqual(mockError);
    
    // ตรวจสอบการเรียกใช้ repository
    expect(mockDepartmentRepository.getProducts).toHaveBeenCalledWith(departmentId);
    expect(mockDepartmentRepository.getProducts).toHaveBeenCalledTimes(1);
  });
  
  it('should handle invalid department ID', async () => {
    // กรณีส่ง departmentId เป็นค่าว่าง
    const emptyDepartmentId = '';
    
    // เรียกใช้ UseCase
    await getProductsUseCase.execute(emptyDepartmentId);
    
    // ตรวจสอบว่า repository ถูกเรียกด้วยค่าว่าง
    expect(mockDepartmentRepository.getProducts).toHaveBeenCalledWith(emptyDepartmentId);
  });
});