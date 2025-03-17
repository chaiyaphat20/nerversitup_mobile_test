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
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppModule } from '../../di/AppModule';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Department } from '../../model/Department';

type ListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DepartmentList'>;

const x = [
  {
    "name": "Recycled Plastic Tuna",
    "imageUrl": "https://loremflickr.com/640/480",
    "desc": "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    "price": "398.00",
    "type": "normal",
    "id": "1",
    "departmentId": "1"
  },
  {
    "name": "Electronic Wooden Chair",
    "imageUrl": "https://loremflickr.com/640/480",
    "desc": "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
    "price": "283.00",
    "type": "normal",
    "id": "11",
    "departmentId": "1"
  },
  {
    "name": "Handcrafted Fresh Pizza",
    "imageUrl": "https://loremflickr.com/640/480",
    "desc": "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
    "price": "473.00",
    "type": "normal",
    "id": "21",
    "departmentId": "1"
  },
  {
    "name": "Licensed Wooden Computer",
    "imageUrl": "https://loremflickr.com/640/480",
    "desc": "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    "price": "676.00",
    "type": "normal",
    "id": "31",
    "departmentId": "1"
  },
  {
    "name": "Recycled Soft Soap",
    "imageUrl": "https://loremflickr.com/640/480",
    "desc": "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
    "price": "5.00",
    "type": "spacial",
    "id": "41",
    "departmentId": "1"
  },
  {
    "name": "Sleek Concrete Table",
    "imageUrl": "https://loremflickr.com/640/480",
    "desc": "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
    "price": "34.00",
    "type": "spacial",
    "id": "51",
    "departmentId": "1"
  },
  {
    "name": "Elegant Cotton Salad",
    "imageUrl": "https://loremflickr.com/640/480",
    "desc": "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    "price": "976.00",
    "type": "normal",
    "id": "61",
    "departmentId": "1"
  },
  {
    "name": "Awesome Granite Sausages",
    "imageUrl": "https://loremflickr.com/640/480",
    "desc": "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
    "price": "28.00",
    "type": "normal",
    "id": "71",
    "departmentId": "1"
  },
  {
    "name": "Licensed Wooden Bike",
    "imageUrl": "https://loremflickr.com/640/480",
    "desc": "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    "price": "931.00",
    "type": "normal",
    "id": "81",
    "departmentId": "1"
  },
  {
    "name": "Fantastic Rubber Pizza",
    "imageUrl": "https://loremflickr.com/640/480",
    "desc": "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    "price": "538.00",
    "type": "normal",
    "id": "91",
    "departmentId": "1"
  }
]

const { width } = Dimensions.get('window');
const itemWidth = width / 2 - 12 // ลบด้วยค่า padding/margin

const DepartmentScreen = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectDepartment,setSelectDepartment] = useState<Department|null>(null)

  const getDepartmentUseCase = AppModule.provideGetDepartmentsUseCase();

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

 

  const handleDepartmentPress = (departmentId: string) => {
    // TODO: Implement department selection logic
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
      onPress={() => setSelectDepartment(item)}
    >
      <Text style={styles.departmentTitle}>{item.name}</Text>
      {/* <Image source={{ uri: item.imageUrl }} style={styles.departmentImage}  onError={(error) => console.error('Image loading error:', error.nativeEvent.error)}/> */}
      <Image source={{ uri: 'https://picsum.photos/400' }} style={styles.departmentImage}  onError={(error) => console.error('Image loading error:', error.nativeEvent.error)}/>
    </TouchableOpacity>
  );

  const renderDepartmentDetail= ({item}: { item: Department }) => (
    <TouchableOpacity
    style={[styles.productCard,{width:itemWidth}]}
      onPress={() => console.log(`เลือก ${item.id}`)}
    >
      <Image source={{ uri: 'https://picsum.photos/300' }} style={styles.productCardImage}  onError={(error) => console.error('Image loading error:', error.nativeEvent.error)}/>
      <View style={{width:'100%',height:1,backgroundColor:'gray'}}/>
      <View style={{padding:5,gap:10,position:'relative'}}>
        <Text>Name</Text>
        <Text>Date</Text>
        <Text style={{position:'absolute',right:10,bottom:-30,zIndex:10}}>Prices: 20฿</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screenContainer}>
      <View>
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
      {selectDepartment && <View >
      <Text  style={{fontWeight:700}}>Product listing : {selectDepartment.name}</Text>
      <FlatList
        data={x}
        renderItem={renderDepartmentDetail}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={true}
        numColumns={2}  // กำหนดให้แสดง 2 คอลัมน์
        contentContainerStyle={{width:'100%'}}
        />
      </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  productCard:{
    flex:1,
    height:200,
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