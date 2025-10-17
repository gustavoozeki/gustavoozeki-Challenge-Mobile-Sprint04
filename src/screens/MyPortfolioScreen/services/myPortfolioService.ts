// screens/MyPortfolioScreen/services/myPortfolioService.ts

import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../config/firebaseConfig';
import { Investment } from '../models/portfolio';

// A NOSSA ESTRUTURA AGORA É: users/{userId}/investments/{investmentId}

export class MyPortfolioService {

  /**
   * READ: Busca os investimentos de um utilizador específico.
   * @param userId O ID do utilizador logado.
   */
  static async getPortfolio(userId: string): Promise<Investment[]> {
    try {
      const collectionRef = collection(db, 'users', userId, 'investments');
      const snapshot = await getDocs(collectionRef);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Investment[];
    } catch (error) {
      console.error("Erro ao buscar carteira:", error);
      throw new Error("Não foi possível carregar a carteira.");
    }
  }

  /**
   * CREATE: Adiciona um novo investimento para um utilizador específico.
   * @param userId O ID do utilizador logado.
   * @param data Os dados do novo investimento.
   */
  static async addInvestment(userId: string, data: Omit<Investment, 'id'>): Promise<void> {
    try {
      const collectionRef = collection(db, 'users', userId, 'investments');
      await addDoc(collectionRef, data);
    } catch (error) {
      console.error("Erro ao adicionar investimento:", error);
      throw new Error("Não foi possível adicionar o investimento.");
    }
  }

  /**
   * UPDATE: Atualiza um investimento de um utilizador.
   * @param userId O ID do utilizador logado.
   * @param investmentId O ID do investimento a ser atualizado.
   * @param data Os novos dados do investimento.
   */
  static async updateInvestment(userId: string, investmentId: string, data: Partial<Omit<Investment, 'id'>>): Promise<void> {
    try {
      const docRef = doc(db, 'users', userId, 'investments', investmentId);
      await updateDoc(docRef, data);
    } catch (error) {
      console.error("Erro ao atualizar investimento:", error);
      throw new Error("Não foi possível atualizar o investimento.");
    }
  }

  /**
   * DELETE: Apaga um investimento de um utilizador.
   * @param userId O ID do utilizador logado.
   * @param investmentId O ID do investimento a ser apagado.
   */
  static async deleteInvestment(userId: string, investmentId: string): Promise<void> {
    try {
      const docRef = doc(db, 'users', userId, 'investments', investmentId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Erro ao apagar investimento:", error);
      throw new Error("Não foi possível apagar o investimento.");
    }
  }
}