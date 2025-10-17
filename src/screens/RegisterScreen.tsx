// screens/RegisterScreen.tsx

import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Input, Button } from 'react-native-elements';
import { useAuth } from '../context/AuthContext';
import theme from '../styles/theme';
import { useWindowDimensions, ViewStyle, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>;
};

const RegisterScreen: React.FC = () => {
  const { register, authLoading, authError } = useAuth();
  const navigation = useNavigation<RegisterScreenProps['navigation']>();
  const { width } = useWindowDimensions();
  const isWideScreen = width > 500;
  const maxWidth = isWideScreen ? 400 : '100%';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    await register({ name, email, password })
        .then(() => {
            // Feedback de sucesso
            Alert.alert(
                "Sucesso!",
                "A sua conta foi criada. Por favor, faça o login.",
                [{ text: "OK", onPress: () => navigation.navigate('Login') }]
            );
        })
        .catch(err => {
            console.log("Falha no registo (erro apanhado na tela para depuração)");
        });
  };

  return (
    <Container>
      <FormContainer style={{ maxWidth }}>
        <Title>Cadastro</Title>

        <Input
          placeholder="Nome completo"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          containerStyle={styles.input}
          inputStyle={{ color: '#ffffff' }}
          disabled={authLoading}
        />
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          containerStyle={styles.input}
          inputStyle={{ color: '#ffffff' }}
          disabled={authLoading}
        />
        <Input
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          containerStyle={styles.input}
          inputStyle={{ color: '#ffffff' }}
          disabled={authLoading}
        />

        {authError ? <ErrorText>{authError}</ErrorText> : null}

        <Button
          title="Cadastrar"
          onPress={handleRegister}
          loading={authLoading}
          disabled={authLoading}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonTitleStyle}
        />
        <Button
          title="Voltar"
          onPress={() => navigation.navigate('Login')}
          disabled={authLoading}
          containerStyle={styles.registerButton as ViewStyle}
          buttonStyle={styles.registerButtonStyle}
          titleStyle={styles.buttonTitleStyle}
        />
      </FormContainer>
    </Container>
  );
};

export default RegisterScreen;

// Estilos
const Container = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.background};
`;
const FormContainer = styled.View`
  width: 100%;
`;
const Title = styled.Text`
  font-size: 50px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 100px;
  color: ${theme.colors.title};
`;
const ErrorText = styled.Text`
  color: ${theme.colors.error};
  text-align: center;
  margin-bottom: 10px;
`;
const styles = {
  input: { marginBottom: 15 },
  button: { marginTop: 10, width: '100%' },
  buttonStyle: { backgroundColor: theme.colors.primary, paddingVertical: 12 },
  buttonTitleStyle: { color: '#000000', fontWeight: 'bold', fontSize: 23 },
  registerButton: { marginTop: 10, width: '100%' },
  registerButtonStyle: { backgroundColor: theme.colors.primary, paddingVertical: 12 },
};