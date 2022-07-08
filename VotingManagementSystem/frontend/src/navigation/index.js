import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/login';
import { useEffect, useState } from 'react';
import Home from '../screens/others';
import AddCandidate from '../screens/others/createCandidate';
import Register from '../screens/auth/register';

// const Tabs = createBottomTabNavigator()

export default function Navigator() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

        async function getAuthToken() {
            const token = await SecureStore.getItemAsync('token')
            if (token) {
                setIsLoggedIn(true)
            }
        }
        getAuthToken()
    }, [])

    if (!isLoggedIn) return <AuthNavigation />
    return <AppNavigation />
}

export function AuthNavigation() {
  const Stack = createNativeStackNavigator();
  return (
      <Stack.Navigator
          initialRouteName="Login"
          >
          <Stack.Screen 
              name="Login"
              component={Login}
              options={{headerShown: false}}
          />

          <Stack.Screen 
              name="Register"
              component={Register}
              options={{headerShown: false}}
          />

          <Stack.Screen
            name="App"
            options={{headerShown: false}}
            component={AppNavigation}
          />

      </Stack.Navigator>
  )
}


export function AppNavigation() {
  const Stack = createNativeStackNavigator();
  return (
      <Stack.Navigator
          initialRouteName="Home"
          >
          <Stack.Screen 
              name="Home"
              component={Home}
              options={{headerShown: false}}
          />

          <Stack.Screen 
              name="AddCandidate"
              component={AddCandidate}
              options={{headerShown: false}}
          />

      </Stack.Navigator>
  )
}