import { useState, useEffect, useCallback } from 'react';
import { Department } from '../../model/Department';
import AppModule from '../../di/AppModule';

export const useDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getDepartmentUseCase = AppModule.provideGetDepartmentsUseCase();

  const fetchDepartments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getDepartmentUseCase.execute();
      setDepartments(result);
    } catch (err) {
      setError('Failed to load departments. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  return {
    departments,
    loading,
    error,
    fetchDepartments
  };
};