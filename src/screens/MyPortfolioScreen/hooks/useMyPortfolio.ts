// screens/MyPortfolioScreen/hooks/useMyPortfolio.ts

import { useState, useEffect, useCallback } from 'react';
import { MyPortfolioService } from '../services/myPortfolioService';
import { Investment } from '../models/portfolio';

export const useMyPortfolio = (userId?: string | null) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [portfolio, setPortfolio] = useState<Investment[]>([]);

  const reloadPortfolio = useCallback(async () => {
    if (!userId) {
      setPortfolio([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await MyPortfolioService.getPortfolio(userId);
      setPortfolio(data);
      setLoading(false); // Sucesso: para de carregar
    } catch (err) {
      // --- AQUI ESTÁ A MUDANÇA IMPORTANTE ---
      // Imprimimos o erro no terminal para depuração e garantimos que os estados são atualizados.
      console.error("ERRO NO HOOK:", err);
      setError('Não foi possível carregar sua carteira. Verifique sua conexão.');
      setLoading(false); // Erro: também para de carregar
    }
  }, [userId]);

  useEffect(() => {
    reloadPortfolio();
  }, [reloadPortfolio]);

  // A sua função setPortfolio foi removida para garantir a consistência dos dados
  return { loading, error, portfolio, reloadPortfolio };
};