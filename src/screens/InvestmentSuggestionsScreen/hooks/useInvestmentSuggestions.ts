import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { PortfolioService } from '../services/portfolioService';
import { Portfolio, portfoliosData } from '../models/portfolio';

export const useInvestmentSuggestions = () => {
  const [profile, setProfile] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userProfile = await PortfolioService.getUserProfile();
        setProfile(userProfile);
      } catch (err) {
        console.error('Erro ao carregar perfil:', err);
        Alert.alert('Erro', 'Não foi possível identificar seu perfil de investidor.');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSelectPortfolio = async (portfolio: Portfolio) => {
    try {
      await PortfolioService.saveSelectedPortfolio(portfolio);
      Alert.alert('Sucesso', `Carteira "${portfolio.nome}" salva com sucesso!`, [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error('Erro ao salvar carteira:', error);
      Alert.alert('Erro', 'Não foi possível salvar a carteira.');
    }
  };

  const availablePortfolios = profile ? portfoliosData[profile] || [] : [];

  return {
    loading,
    profile,
    availablePortfolios,
    handleSelectPortfolio,
  };
};