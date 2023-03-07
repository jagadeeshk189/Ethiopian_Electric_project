import React, { useState,useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity,Alert,Platform,ScrollView} from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { mobileValidator } from '../helpers/mobileValidator'
import {nameValidator} from '../helpers/nameValidator'
import {textValidator} from '../helpers/textValidator'
import {Picker} from '@react-native-picker/picker';
import {
  Dropdown,
  GroupDropdown,
  MultiselectDropdown,
} from 'sharingan-rn-modal-dropdown';

export const datas = [
  {
    value: 'favorite color',
    label: 'What is your favorite colors',
  },
  {
    value: 'mother maiden name',
    label: 'What is your mother maiden name',
    
  },
];


export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [number, setMobileNumber] = useState({ value: '', error: '' });
  const [data, setData] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedValue, setSelectedValue] = useState("");
  const [text, setText] = useState({ value: '', error: '' });
  const [valueSS, setValueSS] = useState('');
  
  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const numberError = mobileValidator(number.value)
    const textError = textValidator(text.value)
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setMobileNumber({...number, error: numberError})
      setText({...text,error: textError})
      return
    }

    fetch('http://196.188.118.70:8080/NewRegistrationPost', {
      method: 'POST',
      body: JSON.stringify({
        Record: {
          ContractAccount: `${name.value}`,
          MobileNo: `${number.value}`,
          EmailID: `${email.value}`,
          Password: `${password.value}`,
          SecretQuestion: `${selectedValue}`,
          SecretAnswer: `${text.value}`,
        }
      }),
    })
    .then((response) =>
        response.json())
    .then(responseData => {
      if(responseData.Record.Status == 'Already Registered. Please Login'){
        storeData(responseData.Record.ContractAccount)
        Alert.alert(
          '',
           responseData.Record.Status,
           [
            {text: 'OK', onPress: () => navigation.replace('LoginScreen')},
           ]
        );
      } else {
        console.log("success")
        Alert.alert(
          '',
          "Successfully Registered, Please Login",
          [
            { text: 'OK', onPress: () => navigation.replace('LoginScreen') },
          ]
        );
        /*  navigation.reset({
           index: 0,
           routes: [{ name: 'Dashboard' }],
         }) */
      }
      }).catch((error)=>{
        console.error("having an error",error)
      })
  }

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('accountID', value.toString());
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeSS = (value) => {
    setValueSS(value);
  };

  const validAccount = ()=>{
    setIsDisabled(!isDisabled)
    console.log('Yes button clicked')
  }

  const inValidAccount = ()=>{
    setIsDisabled(isDisabled)
    console.log('No button clicked')
  }


  const onVerifyAccountId = () => {
    fetch('http://196.188.118.70:8080/CAValidationPost', {
      method: 'POST',
      body: JSON.stringify({
        Record: {
          ContractAccount: `${name.value}`,
        }
      }),
    })
      .then((response) =>
        response.json())
      .then(responseData => {
        if (responseData.Record.Status == "VALID CA") {
          Alert.alert(
            'Please confirm your Account Details',
            `Name: ${responseData.Record.Name ? responseData.Record.Name : ''}\nMobile No: ${responseData.Record.MobileNo ? responseData.Record.MobileNo :''}\nAddress: ${responseData.Record.Address ? responseData.Record.Address:''}\nEmail: ${responseData.Record.EmailId ? responseData.Record.EmailId: ''}`,   
            [
              {text: 'Yes', onPress: () => validAccount()},
              {text: 'No', onPress: () => inValidAccount(), style: 'cancel'},
            ],
            {
              cancelable: true 
            }
          );
        }else{
          Alert.alert(
            '',
             "Invalid Account No",
             [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
             ]
          );
        }
      })
  };



  return (
    <ScrollView>
      <Background>
        <BackButton goBack={navigation.goBack} />
        <Logo />
        <Header>Account Verify</Header>
        <TextInput
          label="Account No"
          returnKeyType="next"
          keyboardType={"phone-pad"}
          disabled={!isDisabled}
          value={name.value}
          maxLength={12}
          onChangeText={(text) => setName({ value: text, error: '' })}
          error={!!name.error}
          errorText={name.error}
        />

        <Button
          mode="contained"
          disabled={!isDisabled}
          onPress={onVerifyAccountId}
          style={{ marginTop: 24 }}
        >
          {isDisabled ? "Verify Account No" : "Verified"}
        </Button>
        <Header>Account Create</Header>
        <TextInput
          label="Mobile No"
          style={styles.input}
          value={number.value}
          disabled={isDisabled}
          keyboardType={"phone-pad"}
          onChangeText={(text) => setMobileNumber(text)}
          autoCapitalize={"none"}
          maxLength={10}
          error={!!number.error}
          errorText={number.error}
        />

        <TextInput
          label="Email"
          returnKeyType="next"
          disabled={isDisabled}
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />

        <TextInput
          label="Password"
          returnKeyType="done"
          disabled={isDisabled}
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        
        {Platform.OS == 'android' && (
          <Picker
            selectedValue={selectedValue}
            placeholder="Please Security Questions"
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="What is your favorite colors" value="favorite color" />
            <Picker.Item label="What is your mother maiden name" value="mother maiden name" />
          </Picker>
        )}
        {Platform.OS == 'ios' && (
          <View style={styles.picker}>
            <Dropdown
              label="Security Questions"
              data={datas}
              value={valueSS}
              onChange={onChangeSS}
            />
          </View>
        )}
        {/* <View>
          <Picker
            selectedValue={selectedValue}
            placeholder="Security Questions"
            style={styles.pickerios}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="What is your favorite color" value="favorite color" />
            <Picker.Item label="What is your mother maiden name" value="mother maiden name" />
          </Picker>
        </View> */}
      
        <TextInput
          label="Answer"
          returnKeyType="next"
          disabled={isDisabled}
          value={text.value}
          onChangeText={(text) => setText({ value: text, error: '' })}
          error={!!text.error}
          errorText={text.error}
          autoCapitalize="none"
          autoCompleteType="text"
          textContentType="textAddress"
          keyboardType="text-address"
        />
        <Button
          mode="contained"
          disabled={isDisabled}
          onPress={onSignUpPressed}
          style={{ marginTop: 24 }}

        >
          Register
        </Button>
        <View style={styles.row}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </Background>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  picker:{
    width: '100%',
    marginVertical: 5,
    height:45,
    backgroundColor: theme.colors.surface,
  },
  pickerios:{
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30
  },
  
})
