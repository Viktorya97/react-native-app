import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Register from './screens/Register';
import Dashboard from './screens/Dashboard';

const Stack = createNativeStackNavigator();

function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName='Login'>
              <Stack.Screen options={{ headerShown: false }} name='Login' component={Login} />
              <Stack.Screen name='Register' component={Register} />
              <Stack.Screen options={{ headerShown: false }} name='Dashboard' component={Dashboard} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
