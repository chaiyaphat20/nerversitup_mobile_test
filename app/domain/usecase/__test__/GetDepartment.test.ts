import { Department } from "../../../model/Department";
import { DepartmentRepository } from "../../repository/DepartmentRepository";
import { GetDepartment } from "../GetDepartments";

describe('GetDepartment UseCase', () => {
  // สร้าง mock สำหรับ DepartmentRepository
  let mockDepartmentRepository: jest.Mocked<DepartmentRepository>;
  let getDepartmentUseCase: GetDepartment;
  
  beforeEach(() => {
    // จำลองทั้งสองเมธอดใน repository
    mockDepartmentRepository = {
      getDepartments: jest.fn(),
      getProducts: jest.fn()
    } as jest.Mocked<DepartmentRepository>;
    
    getDepartmentUseCase = new GetDepartment(mockDepartmentRepository);
  });
  
  it('should get departments from repository', async () => {
    // กำหนดข้อมูลจำลองที่ repository จะส่งคืน
    const mockDepartments: Department[] = [
      { id: "1", name: 'HR', imageUrl: '' },
      { id: "2", name: 'IT', imageUrl: '' },
      { id: "3", name: 'Finance', imageUrl: '' }
    ];
    
    // กำหนดให้ mock repository คืนค่าที่ต้องการเมื่อถูกเรียกใช้
    mockDepartmentRepository.getDepartments.mockResolvedValue(mockDepartments);
    
    // เรียกใช้ UseCase
    const result = await getDepartmentUseCase.execute();
    
    // ตรวจสอบว่า repository ถูกเรียกใช้หรือไม่
    expect(mockDepartmentRepository.getDepartments).toHaveBeenCalledTimes(1);
    
    // ตรวจสอบผลลัพธ์ว่าตรงกับที่คาดหวังหรือไม่
    expect(result).toEqual(mockDepartments);
    expect(result.length).toBe(3);
    expect(result[0].name).toBe('HR');
  });
  
  it('should propagate error when repository fails', async () => {
    // จำลองการเกิดข้อผิดพลาดใน repository
    const mockError = new Error('Failed to fetch departments2x');
    mockDepartmentRepository.getDepartments.mockRejectedValue(mockError);
    
    // ตรวจสอบว่า UseCase ส่งต่อข้อผิดพลาดไปยังผู้เรียกใช้
    await expect(getDepartmentUseCase.execute()).rejects.toThrowError("Failed to fetch departments2x");
    
    // ตรวจสอบว่า repository ถูกเรียกใช้
    expect(mockDepartmentRepository.getDepartments).toHaveBeenCalledTimes(1);
  });
  
  it('should return empty array when repository returns empty', async () => {
    // กำหนดให้ repository คืนค่าเป็นอาร์เรย์ว่าง
    mockDepartmentRepository.getDepartments.mockResolvedValue([]);
    
    // เรียกใช้ UseCase
    const result = await getDepartmentUseCase.execute();
    
    // ตรวจสอบว่าผลลัพธ์เป็นอาร์เรย์ว่าง
    expect(result).toEqual([]);
    expect(result.length).toBe(0);
  });
});