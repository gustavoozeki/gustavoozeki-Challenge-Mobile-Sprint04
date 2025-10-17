import React from 'react';
import { useWindowDimensions } from 'react-native';
import Header from '../../components/Header';
import QuestionItem from '../../components/QuestionItem'; // Componente global existente
import { useQuestions } from './hooks/useQuestions';
import {
  Container,
  ContentWrapper,
  List,
  Title,
  FooterContainer,
  SubmitButton,
} from './styles';

const QuestionsScreen: React.FC = () => {
  const { questions, answers, handleSelectOption, handleSubmit } = useQuestions();
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;

  const renderFooter = () => (
    <FooterContainer>
      <SubmitButton title="Enviar Respostas" onPress={handleSubmit} />
    </FooterContainer>
  );

  return (
    <Container>
      <Header />
      <ContentWrapper isLargeScreen={isLargeScreen}>
        <List
          data={questions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <QuestionItem
              id={item.id}
              text={item.text}
              options={item.options}
              selectedOptionIndex={answers[item.id]}
              onSelect={handleSelectOption}
            />
          )}
          ListHeaderComponent={<Title>Questionário de Perfil</Title>}
          ListFooterComponent={renderFooter}
        />
      </ContentWrapper>
    </Container>
  );
};

export default QuestionsScreen;