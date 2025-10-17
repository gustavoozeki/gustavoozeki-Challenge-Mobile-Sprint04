import AsyncStorage from '@react-native-async-storage/async-storage';
import { Answers, Question } from '../models/evaluation';

const ANSWERS_KEY = '@InvestApp:questionnaireAnswers';

export class EvaluationService {
  /**
   * Carrega as respostas do questionário do armazenamento.
   */
  static async loadAnswers(): Promise<Answers | null> {
    const data = await AsyncStorage.getItem(ANSWERS_KEY);
    return data ? (JSON.parse(data) as Answers) : null;
  }

  /**
   * Calcula o perfil do investidor com base nas respostas.
   * É uma função pura, o que a torna fácil de testar.
   */
  static evaluateProfile(answers: Answers, questions: Question[]): string {
    if (Object.keys(answers).length === 0) {
      return 'Indefinido';
    }
    
    const total = Object.values(answers).reduce((sum, val) => sum + (val + 1), 0);
    const average = total / questions.length;

    if (average <= 1.9) return 'Conservador';
    if (average <= 2.9) return 'Moderado';
    return 'Arrojado';
  }
}