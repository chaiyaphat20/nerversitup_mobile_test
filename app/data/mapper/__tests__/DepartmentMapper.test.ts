// @ts-nocheck
import { DepartmentMapper, ProductMapper } from '../DepartmentMapper';
import { DepartmentResponse } from '../../remote/model/DepartmentResponse';
import { ProductResponse } from '../../remote/model/PropductResponse';

describe('DepartmentMapper', () => {
  it('should map DepartmentResponse to Department domain model', () => {
    // Arrange
    const departmentResponse: DepartmentResponse = {
      id: "1",
      name: 'Electronics',
      imageUrl: 'electronics.jpg'
    };

    // Act
    const result = DepartmentMapper.toDomain(departmentResponse);

    // Assert
    expect(result).toEqual({
      id: "1",
      name: 'Electronics',
      imageUrl: 'electronics.jpg'
    });
  });

  it('should handle undefined imageUrl', () => {
    // Arrange
    const departmentResponse: DepartmentResponse = {
      id: "2",
      name: 'Clothing',
      imageUrl: undefined
    };

    // Act
    const result = DepartmentMapper.toDomain(departmentResponse);

    // Assert
    expect(result).toEqual({
      id: "2",
      name: 'Clothing',
      imageUrl: undefined
    });
  });
});

describe('ProductMapper', () => {
  it('should map ProductResponse to Product domain model', () => {
    // Arrange
    const productResponse: ProductResponse = {
      id: "101",
      name: 'Laptop',
      imageUrl: 'laptop.jpg',
      desc: 'Powerful laptop',
      price: "1200",
      type: 'computer',
      departmentId: "1"
    };

    // Act
    const result = ProductMapper.toDomain(productResponse);

    // Assert
    expect(result).toEqual({
      id: "101",
      name: 'Laptop',
      imageUrl: 'laptop.jpg',
      desc: 'Powerful laptop',
      price: "1200",
      type: 'computer',
      departmentId: "1"
    });
  });

  it('should handle null values in ProductResponse', () => {
    // Arrange
    const productResponse: ProductResponse = {
      id: "102",
      name: 'Smartphone',
      imageUrl: null,
      desc: null,
      price: 800,
      type: 'mobile',
      departmentId: 1
    };

    // Act
    const result = ProductMapper.toDomain(productResponse);

    // Assert
    expect(result).toEqual({
      id: "102",
      name: 'Smartphone',
      imageUrl: null,
      desc: null,
      price: 800,
      type: 'mobile',
      departmentId: 1
    });
  });
});