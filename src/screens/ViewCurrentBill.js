import React, { useEffect,useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import { TouchableOpacity, Image, StyleSheet,View,Text,SafeAreaView, ScrollView  } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Divider } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ViewCurrentBill({ navigation }) {

  const [accountID, setAccountID] = useState();

  const [isLoading, setLoading] = useState(false);
  const [Data, setData] = useState();

  console.log("Data",Data)

  const url = 'http://196.188.118.70:8080/InvoiceDetails'

  const getCurrentBill = (value)=>{
    console.log("value",value)
    fetch(`${url}/${value}`, {
    })
    .then((response) =>
        response.json())
    .then(responseData => {
      setLoading(true)
      setData(responseData.MT_InvoiceDetails_OUT
        )
    })
  }
  

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('accountID');
      if (value !== null) {
        setAccountID(value);
        getCurrentBill(value);
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
       <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.container}>
              <Image
                  style={styles.image}
                  source={require('../assets/arrow_back.png')}
              />
          </TouchableOpacity>
      <Header>View UNPaid Bill</Header>
      <Paragraph>
        Ethiopian Electric Utility.
      </Paragraph>
      <View style={styles.details}>
      <ScrollView>
      <View>
      {Data && Data.Invoice_Amount &&
          <View>
            <Text style={styles.item}>Bill Month : {Data.BILL_MONTH} </Text>
            <Text style={styles.item}>Account Number : {Data.CA_Number} </Text>
            <Text style={styles.item}>Cs Code : {Data.CSC_CODE} </Text>
            <Text style={styles.item}>Customer Name : {Data.Customer_Name} </Text>
            <Text style={styles.item}>Invoice Date : {Data.INVOICE_DATE} </Text>
            <Text style={styles.item}>Invoice Amount: {Data.Invoice_Amount} </Text>
            <Text style={styles.item}>Invoice Due Date: {Data.Invoice_Due_Date} </Text>
            <Text style={styles.item}>Invoice Number: {Data.Invoice_Number} </Text>
            <Divider style={{ borderColor: 'black',borderWidth:1, margin:10 }}/>
          </View>
      }
      </View>
      </ScrollView>
    </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 4,
  },
  image: {
    width: 24,
    height: 24,
  },
  details: {
    flex: 1,
    padding: 16,
  },
  item: {
    paddingLeft: 15,
    paddingTop: 8,
    paddingBottom: 8
  },
})
