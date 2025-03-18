import { useState } from 'react';
import { Product } from '../../model/product';

export const useProductModal = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return {
    selectedProduct,
    openModal,
    closeModal,
    isModalOpen: !!selectedProduct
  };
};