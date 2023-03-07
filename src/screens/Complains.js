import React, { useState, useEffect } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import BackButton from '../components/BackButton'
import { TouchableOpacity, Image, StyleSheet,Alert,ScrollView,Platform,View } from 'react-native'
import TextInput from '../components/TextInput'
import TextInputBox from '../components/TextInputBox'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Picker } from '@react-native-picker/picker';
import Button from '../components/Button'
import { theme } from '../core/theme'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Dropdown,
  GroupDropdown,
  MultiselectDropdown,
} from 'sharingan-rn-modal-dropdown';

export const datas = [
  {
    value: 'ZPO_SUP_NOS',
    label: 'No Supply',
  },

];

export default function Complains({ navigation }) {

  const [selectedValue, setSelectedValue] = useState("");
  const [accountID, setAccountID] = useState('');
  const [text, setText] = useState({ value: '', error: '' })
  const [textbox, setTextBox] = useState({ value: '', error: '' })
  

  const OnHandleComplints = () => {

    fetch('http://196.188.118.70:8080/ComplaintCreation', {
      method: 'POST',
      body: JSON.stringify({
        Record: {
          ContractAccount: accountID,
          ComplaintCategoryCode: `${selectedValue}`,
          ComplaintTitle: `${text.value}`,
          ComplaintDescription:`${textbox.value}`,
        }
      }),
    })
      .then((response) =>
        response.json())
      .then(async (responseData) => {
        console.log("responseData",responseData)
        if (responseData.Record[0].ComplaintNumber) {
          Alert.alert(
            'Complaint Number',
             responseData.Record[0].ComplaintNumber,
            [
              { text: 'OK', onPress: () => navigation.replace('Dashboard') },
            ]
          );
        } 
      })

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

  const onChangeSS = (value) => {
    setSelectedValue(value);
  };


  return (
    <ScrollView>
    <Background>
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/arrow_back.png')}
        />
      </TouchableOpacity>
      <Header>Complaint Registration</Header>
      <Paragraph>
        Ethiopian Electric Utility.
      </Paragraph>
      {Platform.OS == 'android' && (
      <Picker
        selectedValue={selectedValue}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Select Complaint" value="" />
        <Picker.Item label="No Supply" value="ZPO_SUP_NOS" />
      </Picker>
      )}
      {Platform.OS == 'ios' && (
          <View style={styles.picker}>
            <Dropdown
              label="Select Complaint"
              data={datas}
              value={selectedValue}
              onChange={onChangeSS}
            />
          </View>
        )}
      <TextInput
          label="Complaint Title"
          returnKeyType="next"
          value={text.value}
          maxLength={18}
          onChangeText={(text) => setText({ value: text, error: '' })}
          error={!!text.error}
          errorText={text.error}
          autoCapitalize="none"
          autoCompleteType="Text"
        />
        <TextInputBox
          label="Complaint Description"
          returnKeyType="next"
          multiline
          value={textbox.value}
          maxLength={100}
          onChangeText={(text) => setTextBox({ value: text, error: '' })}
          error={!!textbox.error}
          errorText={textbox.error}
          autoCapitalize="none"
          autoCompleteType="Text"
          
        />
      <Button mode="contained" onPress={OnHandleComplints}>
        Submit
      </Button>
    </Background>
    </ScrollView>
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  picker:{
    width: '100%',
    marginVertical: 5,
    height:45,
    backgroundColor: theme.colors.surface,
  },
  
})
