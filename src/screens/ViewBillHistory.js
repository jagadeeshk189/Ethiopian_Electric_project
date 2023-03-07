import React, { useEffect,useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import { TouchableOpacity, Image, StyleSheet, View,Text,SafeAreaView, ScrollView  } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Divider } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ViewBillHistory({ navigation }) {

  const [accountID, setAccountID] = useState({});

  const [isLoading, setLoading] = useState(false);
  const [Data, setData] = useState([]);

  const getBillHistory = (value)=>{
    fetch('http://196.188.118.70:8080/BillingHistory', {
      method: 'POST',
      body: JSON.stringify({
        Record: {
          ContractAccount: value,
        }
      }),
    })
    .then((response) =>
        response.json())
    .then(responseData => {
      setLoading(true)
      setData(responseData.Record)
    })
  }

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('accountID');
      if (value !== null) {
        setAccountID(value);
        getBillHistory(value);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    retrieveData();
  }, []);

  /* useEffect(async () => {
    let items = await AsyncStorage.getItem('accountID');  
    const items = JSON.parse(localStorage.getItem('accountID'));
    if (items) {
      setAccountID(items);
      
    }  
    
  }, []);*/



  return (
    <Background>
         <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.container}>
              <Image
                  style={styles.image}
                  source={require('../assets/arrow_back.png')}
              />
          </TouchableOpacity>
      <Header>View Bill History</Header>
      <Paragraph>
        Ethiopian Electric Utility.
      </Paragraph>
      <View style={styles.details}>
      <ScrollView>
      <View>
      {isLoading && Data.length ? Data.map((data) => {
        return (
          <View>
            <Text style={styles.item}>Document Number : {data.DocumentNo}</Text>
            <Text style={styles.item}>Account Number : {data.ContractAccount}</Text>
            <Text style={styles.item}>Amount : {data.Amount}</Text>
            <Text style={styles.item}>Posting Date : {data.PostingDate}</Text>
            <Text style={styles.item}>Net Due Date : {data.NetDueDate}</Text>
            <Text style={styles.item}>Billing Period : {data.BillingPeriod}</Text>
            <Divider style={{ borderColor: 'black',borderWidth:1, margin:10 }}/>
          </View>
        );
      }):<Text style={styles.item}>Data does not exists</Text>}
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
  item: {
    paddingLeft: 15,
    paddingTop: 8,
    paddingBottom: 8
  },
  details: {
    flex: 1,
    padding: 16,
  },
  itemText: {
    fontSize: 24,
    color: 'black'
  },
})