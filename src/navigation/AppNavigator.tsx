import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../types/navigation';

// Screens de Login
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

// Importe o NAVEGADOR DRAWER INTEIRO que você criou no passo anterior
import DrawerNavigator from './DrawerNavigator';


const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!user ? (
          // A lógica de usuário deslogado continua a mesma
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          // --- AQUI ESTÁ A GRANDE MUDANÇA ---
          // Em vez de uma lista de telas, agora mostramos o DrawerNavigator.
          // Ele gerencia todas as telas do usuário logado.
          <Stack.Screen 
            name="AppDrawer" 
            component={DrawerNavigator}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};