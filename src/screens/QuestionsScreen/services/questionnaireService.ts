import AsyncStorage from '@react-native-async-storage/async-storage';

const ANSWERS_KEY = '@InvestApp:questionnaireAnswers';

export class QuestionnaireService {
  /**
   * Salva as respostas do questionário no armazenamento persistente.
   */
  static async saveAnswers(answers: Record<string, number>): Promise<void> {
    try {
      await AsyncStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
    } catch (error) {
      console.error('Erro ao salvar respostas no AsyncStorage:', error);
      throw new Error('Não foi possível salvar as respostas.');
    }
  }
}