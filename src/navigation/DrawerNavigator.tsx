import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { RootStackParamList } from '../types/navigation'; // Reutilize seus tipos

// Importe as telas que farão parte da sua navegação principal
import MyPortfolioScreen from '../screens/MyPortfolioScreen';
import InvestmentSuggestionsScreen from '../screens/InvestmentSuggestionsScreen';
import QuestionsScreen from '../screens/QuestionsScreen';
import ProfileScreen from '../screens/ProfileScreen'

// Importe seu componente de menu customizado
import CustomDrawerContent from '../screens/UserDashboardScreen'; // Vamos renomear depois

const Drawer = createDrawerNavigator<RootStackParamList>();

export default function DrawerNavigator() {
  return (
    // A mágica acontece aqui, no drawerContent
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: '#333' }, // Estilo do header
        headerTintColor: '#fff', // Cor do texto do header
      }}
    >
      {/* Defina aqui as telas que o usuário verá */}
      {/* A primeira tela é a que abrirá por padrão */}
      <Drawer.Screen 
        name="MyPortfolio" 
        component={MyPortfolioScreen}
        options={{ title: 'Minha Carteira' }} 
      />
      <Drawer.Screen 
        name="InvestmentSuggestions" 
        component={InvestmentSuggestionsScreen} 
        options={{ title: 'Sugestões de Investimento' }} 
      />
      <Drawer.Screen 
        name="Questions" 
        component={QuestionsScreen}
        options={{ title: 'Questionário' }} 
      />
      <Drawer.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Profile' }} 
      />
    </Drawer.Navigator>
  );
}