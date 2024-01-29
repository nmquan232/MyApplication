


import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import BottomTabNavigation from './navigation/BottomTabNavigation';
import { Cart, ProductDetails, NewRivals, LoginPage, Orders, Favourites, Register, Checkout } from './screens/index';

import { ContextProvider } from './store/index';


const Stack = createNativeStackNavigator()
// SplashScreen.preventAutoHideAsync()
export default function App() {
  const [fontsLoaded] = useFonts({
    'regular': require("./assets/fonts/Poppins-Regular.ttf"),
    'light': require('./assets/fonts/Poppins-Light.ttf'),
    'bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'extraBold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
    'semiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'medium': require('./assets/fonts/Poppins-Medium.ttf'),

  })
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ContextProvider>

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen
            name='Bottom navigation'
            component={BottomTabNavigation}
          />
          <Stack.Screen
            name='Cart'
            component={Cart}
          />
          <Stack.Screen
            name='ProductDetails'
            component={ProductDetails}
          />
          <Stack.Screen
            name='ProductList'
            component={NewRivals}
          />
          <Stack.Screen
            name='Login'
            component={LoginPage}
          />
          <Stack.Screen
            name='Register'
            component={Register}
          />
          <Stack.Screen
            name='Orders'
            component={Orders}
          />
          <Stack.Screen
            name='Favourites'
            component={Favourites}
          />
          <Stack.Screen
            name='Checkout'
            component={Checkout}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}

