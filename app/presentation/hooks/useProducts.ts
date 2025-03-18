import { useState, useCallback } from 'react';
import { Product } from '../../model/product';
import AppModule from '../../di/AppModule';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProductUseCase = AppModule.provideGetProductUseCase();

  const fetchProducts = useCallback(async (departmentId: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await getProductUseCase.execute(departmentId);
      setProducts(result);
    } catch (err) {
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts
  };
};