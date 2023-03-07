import React, { useState,useEffect } from 'react'
import Background from '../components/Background'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import { TouchableOpacity, Image, StyleSheet,Alert,ScrollView,View, Platform} from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { passwordValidator } from '../helpers/passwordValidator'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {textValidator} from '../helpers/textValidator'
import {Picker} from '@react-native-picker/picker';
import { theme } from '../core/theme'

export default function ChangePassword({ navigation }) {

const [password, setPassword] = useState({ value: '', error: '' })
const [accountID, setAccountID] = useState('');
const [selectedValue, setSelectedValue] = useState("favorite color");
const [text, setText] = useState({ value: '', error: '' });




const OnChangePassword =()=>{
    const passwordError = passwordValidator(password.value)
    const textError = textValidator(text.value)
    if (passwordError) {
        setPassword({ ...password, error: passwordError })
        setText({...text,error: textError})
        return
    }
    fetch('http://196.188.118.70:8080/PasswordReset', {
      method: 'POST',
      body: JSON.stringify({
        Record: {
          ContractAccount:accountID,
          SecretAnswer:`${text.value}`,
          Password: `${password.value}`,
        }
      }),
    })
    .then((response) =>
        response.json())
    .then(async(responseData) => {
        if(responseData.Record.ValidationStatus == 'Password Successfully Updated'){
            Alert.alert(
              'Hi',
               responseData.Record.ValidationStatus,
               [
                {text: 'OK', onPress: () => navigation.replace('Dashboard')},
               ]
            );
          }else{
            Alert.alert(
                'Hi',
                 responseData.Record.ValidationStatus,
                 [
                  {text: 'OK', onPress: () => console.log('Ok button clicked')},
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

  return (
      <Background>
          <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.container}>
              <Image
                  style={styles.image}
                  source={require('../assets/arrow_back.png')}
              />
          </TouchableOpacity>
          <Header>View Change Password</Header>
          <Paragraph>
              Ethiopian Electric Utility.
          </Paragraph>
          <TextInput
              label="New Password"
              style={styles.input}
              returnKeyType="done"
              value={password.value}
              onChangeText={(text) => setPassword({ value: text, error: '' })}
              error={!!password.error}
              errorText={password.error}
              secureTextEntry
          />
        {Platform.OS == 'android' && (
            <Picker
              selectedValue={selectedValue}
              placeholder="Security Questions"
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
              <Picker.Item label="What is your favorite color" value="favorite color" />
              <Picker.Item label="What is your mother maiden name" value="mother maiden name" />
            </Picker>
        )}
        {Platform.OS == 'ios' && (
          <View>
            <Picker
              selectedValue={selectedValue}
              placeholder="Security Questions"
              style={styles.pickerios}
              onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
              <Picker.Item label="What is your favorite color" value="favorite color" />
              <Picker.Item label="What is your mother maiden name" value="mother maiden name" />
            </Picker>
          </View>
        )}
        <TextInput
          label="Answer"
          returnKeyType="next"
          value={text.value}
          onChangeText={(text) => setText({ value: text, error: '' })}
          error={!!text.error}
          errorText={text.error}
          autoCapitalize="none"
          autoCompleteType="text"
          textContentType="textAddress"
          keyboardType="text-address"
        />
          <Button mode="contained" onPress={OnChangePassword}>
              Submit
          </Button>
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
