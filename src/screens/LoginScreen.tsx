// screens/LoginScreen.tsx (Versão corrigida, com logo e feedbacks visuais)

import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Input, Button } from 'react-native-elements';
import { useAuth } from '../context/AuthContext';
import theme from '../styles/theme';
import { useWindowDimensions, Image } from 'react-native'; // Importe Image aqui
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const LoginScreen: React.FC = () => {
  // Os estados de loading e erro agora vêm do contexto!
  const { signIn, authLoading, authError } = useAuth();
  const navigation = useNavigation<LoginScreenProps['navigation']>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { width } = useWindowDimensions();

  const maxWidth = width > 500 ? 400 : '100%';

  const handleLogin = async () => {
    // Apenas chamamos a função signIn. O contexto trata o try/catch e os estados.
    await signIn({ email, password }).catch(err => {
      console.log("Falha no login (erro apanhado na tela para depuração)");
    });
  };

  return (
    <Container>
      <Content style={{ maxWidth, alignSelf: 'center' }}>
        {/* O SEU LOGOTIPO FOI REINTRODUZIDO AQUI */}
        <Logo source={{ uri: 'https://i.ibb.co/35WnDSzk/Invest-Cycle-Logo-Design.png' }} />
        
        <Title fontSize={width > 500 ? 48 : 38}>Login</Title>

        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          inputStyle={{ color: '#ffffff', fontSize: 16 }}
          containerStyle={{ marginBottom: 15 }}
          disabled={authLoading} // Desativa o campo durante o loading
        />

        <Input
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          inputStyle={{ color: '#ffffff', fontSize: 16 }}
          containerStyle={{ marginBottom: 15 }}
          disabled={authLoading} // Desativa o campo durante o loading
        />

        {/* Exibe o erro que vem do contexto */}
        {authError ? <ErrorText>{authError}</ErrorText> : null}

        <Button
          title="Entrar"
          onPress={handleLogin}
          loading={authLoading} // Usa o estado de loading do contexto
          disabled={authLoading}
          containerStyle={{ marginTop: 10, width: '100%' }}
          buttonStyle={{ backgroundColor: theme.colors.primary, paddingVertical: 12 }}
          titleStyle={{ color: theme.colors.btntext, fontWeight: 'bold', fontSize: 20 }}
        />

        <Button
          title="Cadastrar"
          onPress={() => navigation.navigate('Register')}
          disabled={authLoading} // Desativa o botão durante o loading
          containerStyle={{ marginTop: 10, width: '100%' }}
          buttonStyle={{ backgroundColor: theme.colors.primary, paddingVertical: 12 }}
          titleStyle={{ color: theme.colors.btntext, fontWeight: 'bold', fontSize: 20 }}
        />
      </Content>
    </Container>
  );
};

// --- STYLED COMPONENTS (com o Logo incluído) ---

const Container = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: center;
  background-color: ${theme.colors.background};
`;

const Logo = styled.Image`
  width: 150px;
  height: 150px;
  align-self: center;
  margin-bottom: 20px;
  resize-mode: contain;
`;

const Title = styled.Text<{ fontSize: number }>`
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px; /* Reduzi a margem para acomodar o logo */
  color: ${theme.colors.title};
`;

const Content = styled.View`
  width: 100%;
`;

const ErrorText = styled.Text`
  color: ${theme.colors.error};
  text-align: center;
  margin-bottom: 10px;
`;

export default LoginScreen;