import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  ViewCurrentBill,
  ViewBillHistory,
  UploadCurrentBill,
  PayCurrentBill,
  ViewPaymentHistory,
  Complains,
  ServiceRequest,
  ChangePassword,
} from './src/screens'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
          <Stack.Screen name="ViewCurrentBill" component={ViewCurrentBill} />
          <Stack.Screen name="ViewBillHistory" component={ViewBillHistory} />
          <Stack.Screen name="UploadCurrentBill" component={UploadCurrentBill} />
          <Stack.Screen name="PayCurrentBill" component={PayCurrentBill} />
          <Stack.Screen name="ViewPaymentHistory" component={ViewPaymentHistory} />
          <Stack.Screen name="Complains" component={Complains} />
          <Stack.Screen name="ServiceRequest" component={ServiceRequest} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
