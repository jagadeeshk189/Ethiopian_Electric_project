import React, { useState,useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View,Alert,ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { accountValidator } from '../helpers/accountValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import AsyncStorage from '@react-native-async-storage/async-storage';
//import AsyncStorage from '@react-native-community/async-storage'


export default function LoginScreen({ navigation }) {
  const [number, setAccount] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })



  const onLoginPressed = () => {
    const emailError = accountValidator(number.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setAccount({ ...number, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    fetch('http://196.188.118.70:8080/Login', {
      method: 'POST',
      body: JSON.stringify({
        Record: {
          ContractAccount: `${number.value}`,
          Password: `${password.value}`,
        }
      }),
    })
    .then((response) =>
        response.json())
    .then(async(responseData) => {
      if(responseData.Record.Status == "Valid Login"){
       storeData(responseData.Record.ContractAccount)
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        })
      }else{
        Alert.alert(
          '\n',
           responseData.Record.Status,
           [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
           ]
        );
      }
    })
    
  }


  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('accountID', number.value);
    } catch (error) {
      console.error(error);
    }
  };
  
  /* useEffect(() => {
    if(number.value){
      AsyncStorage.setItem('accountID',number.value);  
    }
    
   // localStorage.setItem('accountID', JSON.stringify(number.value));
  }, [number.value]); */
  

  
  return (
    <ScrollView>
      <Background>
        <BackButton goBack={navigation.goBack} />
        <Logo />
        <Header>Login</Header>
        <TextInput
          label="Account No"
          style={styles.input}
          value={number.value}
          keyboardType={"phone-pad"}
          onChangeText={(text) => setAccount({ value: text, error: '' })}
          autoCapitalize={"none"}
          maxLength={12}
          error={!!number.error}
          errorText={number.error}
        />
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
       
        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ResetPasswordScreen')}
          >
            {false && <Text style={styles.forgot}>Forgot your password?</Text>}
          </TouchableOpacity>
        </View>
        <Button mode="contained" onPress={onLoginPressed}>
          Login
        </Button>
        <View style={styles.row}>
          <Text>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
            <Text style={styles.link}>Register</Text>
          </TouchableOpacity>
        </View>
      </Background>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  
})
