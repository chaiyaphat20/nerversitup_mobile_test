import { Department } from "../../../model/Department";
import { DepartmentRepository } from "../../repository/DepartmentRepository";
import { GetDepartment } from "../GetDepartments";

describe('GetDepartment UseCase', () => {
  let mockDepartmentRepository: jest.Mocked<DepartmentRepository>;
  let getDepartmentUseCase: GetDepartment;
  
  beforeEach(() => {
    mockDepartmentRepository = {
      getDepartments: jest.fn(),
      getProducts: jest.fn()
    } as jest.Mocked<DepartmentRepository>;
    
    getDepartmentUseCase = new GetDepartment(mockDepartmentRepository);
  });
  
  it('should get departments from repository', async () => {
    const mockDepartments: Department[] = [
      { id: "1", name: 'HR', imageUrl: '' },
      { id: "2", name: 'IT', imageUrl: '' },
      { id: "3", name: 'Finance', imageUrl: '' }
    ];
    
    mockDepartmentRepository.getDepartments.mockResolvedValue(mockDepartments);
    
    const result = await getDepartmentUseCase.execute();
    
    expect(mockDepartmentRepository.getDepartments).toHaveBeenCalledTimes(1);
    
    expect(result).toEqual(mockDepartments);
    expect(result.length).toBe(3);
    expect(result[0].name).toBe('HR');
  });
  
  it('should propagate error when repository fails', async () => {
    const mockError = new Error('Failed to fetch departments2x');
    mockDepartmentRepository.getDepartments.mockRejectedValue(mockError);
    
    await expect(getDepartmentUseCase.execute()).rejects.toThrowError("Failed to fetch departments2x");
    
    expect(mockDepartmentRepository.getDepartments).toHaveBeenCalledTimes(1);
  });
  
  it('should return empty array when repository returns empty', async () => {
    mockDepartmentRepository.getDepartments.mockResolvedValue([]);
    
    const result = await getDepartmentUseCase.execute();
    
    expect(result).toEqual([]);
    expect(result.length).toBe(0);
  });
});