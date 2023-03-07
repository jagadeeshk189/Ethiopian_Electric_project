import React, { useState ,useEffect} from 'react'
import Background from '../components/Background'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { StyleSheet, View, Text ,TouchableOpacity} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dashboard({ navigation }) {
  const [items, setItems] = React.useState([
    { name: 'VIEW BILL HISTORY', code: '#3498db',icon:"export" },
    { name: 'VIEW PAYMENT HISTORY', code: '#9b59b6',icon:"copy1" },
    { name: 'CHANGE PASSWORD', code: '#2980b9',icon:"sync" },
    { name: 'VIEW UNPAID BILL', code: '#1abc9c',icon:"printer"},
    { name: 'CREATE COMPLAINT', code: '#e74c3c',icon:"warning" },
   /*  { name: 'PAY CURRENT BILL', code: '#2ecc71',icon:"creditcard" },
    { name: 'UPLOAD CURRENT BILL', code: '#34495e',icon:"upload" },
    { name: 'COMPLAIN', code: '#e74c3c',icon:"warning" },
    { name: 'SERVICE REQUEST', code: '#27ae60',icon:"customerservice" },
    { name: 'UPDATE PROFILE', code: '#8e44ad',icon:"user" },
   */
    
  ]);
  const [accountID, setAccountID] = useState('');

  console.log("accountID",accountID)


  const displayPage =(value)=>{
    if(value == 'VIEW UNPAID BILL'){
      navigation.navigate('ViewCurrentBill') 
    }
    if(value == 'PAY CURRENT BILL'){
      navigation.navigate('PayCurrentBill') 
    }
    if(value == 'VIEW BILL HISTORY'){
      navigation.navigate('ViewBillHistory') 
    }
    if(value == 'UPLOAD CURRENT BILL'){
      navigation.navigate('UploadCurrentBill') 
    }
    if(value == 'VIEW PAYMENT HISTORY'){
      navigation.navigate('ViewPaymentHistory') 
    }
    if(value == 'CREATE COMPLAINT'){
      navigation.navigate('Complains') 
    }
    if(value == 'ServiceRequest'){
      navigation.navigate('ServiceRequest') 
    }
    if(value == 'CHANGE PASSWORD'){
      navigation.navigate('ChangePassword') 
    }
  }

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('accountID');
      if (value !== null) {
        setAccountID(value);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

 
  return (
    <Background>
        <Header>Hello User</Header>
        <Paragraph>
         Account Number:{accountID}
        </Paragraph>
        <Paragraph>
          Email Id : 
        </Paragraph>
        <Button
          mode="outlined"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'StartScreen' }],
            })
          }
        >
          Logout
        </Button>
        <FlatGrid
          itemDimension={120}
          data={items}
          style={styles.gridView}
          // staticDimension={300}
          // fixed
          spacing={10}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => displayPage(item.name)}
            >
              <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
                <Icon name={item.icon} size={40} style={styles.navBarLeftButton} />
                <Text style={styles.itemName}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
    </Background>
  );
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 100,
  },
  itemName: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  navBarLeftButton: {
    paddingLeft: 36,
    paddingTop:6,
    width: 100,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
});