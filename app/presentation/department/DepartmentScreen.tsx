import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions,
} from 'react-native';
import { Department } from '../../model/Department';
import { Product } from '../../model/product';
import ProductModal from '../components/department/modal/ProductModal';
import { useDepartments } from '../hooks/useDepartments';
import { useProducts } from '../hooks/useProducts';
import { useProductModal } from '../hooks/useProductModal';

const { width } = Dimensions.get('window');
const itemWidth = width / 2 - 12; // ลบด้วยค่า padding/margin

const DepartmentScreen = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  
  const { departments, loading: loadingDepartments, error: departmentsError, fetchDepartments } = useDepartments();
  const { products, loading: loadingProducts, error: productsError, fetchProducts } = useProducts();
  const { selectedProduct, openModal, closeModal, isModalOpen } = useProductModal();

  const loading = loadingDepartments || loadingProducts;
  const error = departmentsError || productsError;
  console.log({departmentsError})

  const handleDepartmentPress = (department: Department) => {
    setSelectedDepartment(department);
    fetchProducts(department.id);
  };

  if (loading && departments.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchDepartments}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderDepartmentItem = ({ item }: { item: Department }) => (
    <TouchableOpacity
      style={styles.departmentCard}
      onPress={() => handleDepartmentPress(item)}
    >
      <Text style={styles.departmentTitle}>{item.name}</Text>
      {/* <Image source={{ uri: item.imageUrl }} style={styles.departmentImage} onError={(error) => console.error('Image loading error:', error.nativeEvent.error)} /> */}
      <Image 
        source={{ uri: 'https://picsum.photos/400' }} 
        style={styles.departmentImage} 
        onError={(error) => console.error('Image loading error:', error.nativeEvent.error)} 
      />
    </TouchableOpacity>
  );

  const renderProductDetail = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={[styles.productCard, { width: itemWidth }]}
      onPress={() => openModal(item)}
    >
      <Image 
        source={{ uri: 'https://picsum.photos/200' }} 
        style={styles.productCardImage} 
        onError={(error) => console.error('Image loading error:', error.nativeEvent.error)} 
      />
      {/* <Image source={{ uri: item.imageUrl }} style={styles.productCardImage} onError={(error) => console.error('Image loading error:', error.nativeEvent.error)} /> */}
      <View style={{ width: '100%', height: 1, backgroundColor: 'gray' }} />
      <View style={{ padding: 5, gap: 10, position: 'relative', justifyContent: 'space-between', flex: 1 }}>
        <View>
          <Text>{item.name}</Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.desc}
          </Text>
        </View>
        <Text style={{ alignSelf: 'flex-end' }}>Prices: {item.price} ฿</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screenContainer}>
      <View style={{ gap: 10 }}>
        <Text style={{ fontWeight: '700' }}>Department carousel</Text>
        <FlatList
          data={departments}
          renderItem={renderDepartmentItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContainer}
        />
      </View>

      {loadingProducts && (
        <View style={styles.productLoadingContainer}>
          <ActivityIndicator size="small" color="#0066cc" id='loading-indicator'/>
        </View>
      )}

      {selectedDepartment && !loadingProducts && (
        <View style={{ gap: 10 }}>
          <Text style={{ fontWeight: '700' }}>Product listing: {selectedDepartment.name}</Text>
          <FlatList
            data={products}
            renderItem={renderProductDetail}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={true}
            numColumns={2}
            contentContainerStyle={{ width: '100%' }}
          />
        </View>
      )}

      <ProductModal 
        modalVisible={isModalOpen} 
        product={selectedProduct} 
        closeModal={closeModal} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    flex: 1,
    height: 250,
    borderRadius: 8,
    borderWidth: 1,
    margin: 4,
    overflow: 'hidden',
    borderColor: "gray"
  },
  productCardImage: {
    width: '100%',
    height: "50%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  productLoadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#0066cc',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  screenContainer: {
    flex: 1,
    gap: 20,
    padding: 10
  },
  carouselContainer: {
    paddingHorizontal: 10,
  },
  departmentCard: {
    position: 'relative',
    backgroundColor: 'white',
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 8,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  departmentCardContent: {
    alignItems: 'center',
    padding: 10,
  },
  departmentImage: {
    width: "100%",
    height: "100%",
  },
  departmentTitle: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 14,
    textAlign: 'center',
    zIndex: 10
  },
});

export default DepartmentScreen;