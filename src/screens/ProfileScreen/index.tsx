import React from 'react';
import { useWindowDimensions, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import { useProfileEvaluation } from './hooks/useProfileEvaluation';
import { EvaluationDetails } from './components/EvaluationDetails';
import {
  Container,
  ScrollView,
  Content,
  Title,
  LoadingContainer,
} from './styles';
import theme from '../../styles/theme';

const ProfileEvaluationScreen: React.FC = () => {
  const { loading, profile, answers, questions } = useProfileEvaluation();
  const { width } = useWindowDimensions();
  const maxWidth = width > 500 ? 450 : '100%';

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <Header />
      <ScrollView>
        <Content maxWidth={maxWidth}>
          <Title>Seu Perfil de Investidor</Title>
          <EvaluationDetails
            profile={profile}
            answers={answers}
            questions={questions}
          />
        </Content>
      </ScrollView>
    </Container>
  );
};

export default ProfileEvaluationScreen;