import AsyncStorage from '@react-native-async-storage/async-storage';
import { Portfolio } from '../models/portfolio';

const ANSWERS_KEY = '@InvestApp:questionnaireAnswers';
const PORTFOLIO_KEY = '@InvestApp:selectedPortfolio';

export class PortfolioService {
  /**
   * Carrega as respostas do questionário, calcula e retorna o perfil de investidor.
   */
  static async getUserProfile(): Promise<string | null> {
    const answersData = await AsyncStorage.getItem(ANSWERS_KEY);
    if (!answersData) {
      return null;
    }
    
    const answers = JSON.parse(answersData) as Record<string, number>;
    const total = Object.values(answers).reduce((sum, val) => sum + (val + 1), 0);
    const average = total / Object.keys(answers).length;

    if (average <= 1.9) return 'Conservador';
    if (average <= 2.9) return 'Moderado';
    return 'Arrojado';
  }

  /**
   * Salva a carteira de investimentos escolhida pelo usuário.
   */
  static async saveSelectedPortfolio(portfolio: Portfolio): Promise<void> {
    await AsyncStorage.setItem(PORTFOLIO_KEY, JSON.stringify(portfolio));
  }
}