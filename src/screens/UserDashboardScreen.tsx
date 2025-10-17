import React from 'react';
import styled from 'styled-components/native';
// Importamos um componente especial do Drawer para a área de scroll
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Button } from 'react-native-elements';
import { useAuth } from '../context/AuthContext';
import theme from '../styles/theme';
import { ViewStyle } from 'react-native';

// O componente agora recebe 'props' diretamente do Drawer Navigator
const UserDashboardScreen = (props: any) => {
  const { signOut } = useAuth();

  return (
    <Container>
      {/* Este ScrollView é otimizado para o Drawer.
        Removemos o <Header /> e o <ScrollView> antigo.
      */}
      <DrawerContentScrollView {...props}>
        <Content>
          <Title>Meu Perfil</Title>

          <Button
            title="Questionário"
            // A navegação agora vem das props! É props.navigation
            onPress={() => props.navigation.navigate('Questions')}
            containerStyle={styles.button as ViewStyle}
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTitleStyle}
          />

          <Button
            title="Perfil de Investimentos"
            onPress={() => props.navigation.navigate('Profile')}
            containerStyle={styles.button as ViewStyle}
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTitleStyle}
          />

          <Button
            title="Minha Carteira"
            onPress={() => props.navigation.navigate('MyPortfolio')}
            containerStyle={styles.button as ViewStyle}
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTitleStyle}
          />

          <Button
            title="Sugestões"
            onPress={() => props.navigation.navigate('InvestmentSuggestions')}
            containerStyle={styles.button as ViewStyle}
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTitleStyle}
          />
        </Content>
      </DrawerContentScrollView>

      {/* O rodapé com o botão de Sair continua igual */}
      <FixedFooter>
        <Button
          title="Sair"
          onPress={signOut}
          buttonStyle={styles.logoutButton}
        />
      </FixedFooter>
    </Container>
  );
};

// Seus estilos continuam exatamente os mesmos
const styles = {
  button: {
    marginBottom: 20,
    width: '100%',
  },
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
  },
  buttonTitleStyle: {
    color: theme.colors.btntext,
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: theme.colors.error,
    paddingVertical: 12,
    borderRadius: 30,
  },
};

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const Content = styled.View`
  width: 100%;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 20px;
  text-align: center;
`;

const FixedFooter = styled.View`
  padding: 20px;
  background-color: ${theme.colors.background};
`;

export default UserDashboardScreen;