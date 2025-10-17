import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { questions as questionsData } from '../models/question';
import { QuestionnaireService } from '../services/questionnaireService';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';

type QuestionsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Questions'>;

export const useQuestions = () => {
  const navigation = useNavigation<QuestionsNavigationProp>();
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmit = async () => {
    // Validação para garantir que todas as perguntas foram respondidas
    if (Object.keys(answers).length !== questionsData.length) {
      Alert.alert('Atenção', 'Por favor, responda todas as perguntas antes de enviar.');
      return;
    }

    try {
      await QuestionnaireService.saveAnswers(answers);
      Alert.alert('Sucesso', 'Respostas salvas com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('InvestmentSuggestions') } // Navega para a tela de sugestões
      ]);
    } catch (err) {
      Alert.alert('Erro', (err as Error).message);
    }
  };

  return {
    questions: questionsData,
    answers,
    handleSelectOption,
    handleSubmit,
  };
};