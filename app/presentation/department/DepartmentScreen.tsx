import React, { useState, useEffect } from 'react';
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
import { StackNavigationProp } from '@react-navigation/stack';
import { AppModule } from '../../di/AppModule';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Department } from '../../model/Department';
import { Product } from '../../model/product';
import ProductModal from '../components/department/modal/ProductModal';

type ListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DepartmentList'>;

const { width } = Dimensions.get('window');
const itemWidth = width / 2 - 12 // ลบด้วยค่า padding/margin

const DepartmentScreen = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectDepartment,setSelectDepartment] = useState<Department|null>(null)
  const [selectProduct,setSelectProduct] = useState<Product|null>(null)

  const getDepartmentUseCase = AppModule.provideGetDepartmentsUseCase();
  const getProductUseCase = AppModule.provideGetProductUseCase();

  useEffect(() => {
    fetchDepartment();
  }, []);

  const fetchDepartment = async () => {
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
  };

  const fetchProduct = async (departmentId:string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await getProductUseCase.execute(departmentId);
      setProducts(result);
    } catch (err) {
      setError('Failed to load departments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDepartmentPress = (departmentId: string) => {
    fetchProduct(departmentId)
  };

  if (loading) {
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
        <TouchableOpacity style={styles.retryButton} onPress={fetchDepartment}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }


  const renderDepartmentItem = ({item}: { item: Department }) => (
    <TouchableOpacity
      style={styles.departmentCard}
      onPress={() => {
        setSelectDepartment(item)
        handleDepartmentPress(item.id)
      }}
    >
      <Text style={styles.departmentTitle}>{item.name}</Text>
      {/* <Image source={{ uri: item.imageUrl }} style={styles.departmentImage}  onError={(error) => console.error('Image loading error:', error.nativeEvent.error)}/> */}
      <Image source={{ uri: 'https://picsum.photos/400' }} style={styles.departmentImage}  onError={(error) => console.error('Image loading error:', error.nativeEvent.error)}/>
    </TouchableOpacity>
  );

  const renderProductDetail= ({item}: { item: Product }) => (
    <TouchableOpacity
    style={[styles.productCard,{width:itemWidth}]}
      onPress={() => {
        setSelectProduct(item)
      }}
    >
      <Image source={{ uri: 'https://picsum.photos/200'  }} style={styles.productCardImage}  onError={(error) => console.error('Image loading error:', error.nativeEvent.error)}/>
      {/* <Image source={{ uri: item.imageUrl }} style={styles.productCardImage}  onError={(error) => console.error('Image loading error:', error.nativeEvent.error)}/> */}
      <View style={{width:'100%',height:1,backgroundColor:'gray'}}/>
      <View style={{padding:5,gap:10,position:'relative',justifyContent:'space-between',flex:1}}>
      <View>
        <Text>{item.name}</Text>
          <Text 
          numberOfLines={2} 
          ellipsizeMode="tail"
        >
          {item.desc}
        </Text>
       </View>
        <Text style={{alignSelf:'flex-end'}}>Prices: {item.price}฿</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screenContainer}>
      <View style={{gap:10}}>
        <Text style={{fontWeight:700}}>Department carousel</Text>
        <FlatList
          data={departments}
          renderItem={renderDepartmentItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContainer}
        />
      </View>
      {selectDepartment && <View  style={{gap:10}}>
      <Text  style={{fontWeight:700}}>Product listing : {selectDepartment.name}</Text>
      <FlatList
        data={products}
        renderItem={renderProductDetail}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={true}
        numColumns={2}  // กำหนดให้แสดง 2 คอลัมน์
        contentContainerStyle={{width:'100%'}}
        />
      </View>}
      <ProductModal modalVisible={!!selectProduct} product={selectProduct} closeModal={()=>{
        setSelectProduct(null)
      }}/>
    </View>
  );
};

const styles = StyleSheet.create({
  productCard:{
    flex:1,
    height:250,
    borderRadius:8,
    borderWidth:1,
    margin:4,
    overflow: 'hidden',
    borderColor:"gray"
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
    gap:20,
    padding:10
  },
  
  carouselContainer: {
    paddingHorizontal: 10,
  },
  departmentCard: {
    position:'relative',
    backgroundColor: 'white',
    marginHorizontal: 5,
    marginVertical:5,
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
    position:'absolute',
    top:10,
    right:10,
    fontSize: 14,
    textAlign: 'center',
    zIndex:10
  },
});

export default DepartmentScreen;