import React from 'react';
import { useWindowDimensions, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import { useInvestmentSuggestions } from './hooks/useInvestmentSuggestions';
import { PortfolioCardItem } from './components/PortfolioCardItem';
import {
  Container,
  ListContainer,
  HeaderContainer,
  Title,
  Subtitle,
  Bold,
  SectionTitle,
  LoadingContainer,
} from './styles';
import theme from '../../styles/theme';

const InvestmentSuggestionsScreen: React.FC = () => {
  const { loading, profile, availablePortfolios, handleSelectPortfolio } = useInvestmentSuggestions();
  const { width } = useWindowDimensions();

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </LoadingContainer>
    );
  }

  const renderListHeader = () => (
    <HeaderContainer>
      <Title responsiveWidth={width}>Sugestões de Investimento</Title>
      {profile && (
        <Subtitle responsiveWidth={width}>
          Seu perfil: <Bold>{profile}</Bold>
        </Subtitle>
      )}
      <SectionTitle responsiveWidth={width}>Escolha uma carteira para salvar:</SectionTitle>
    </HeaderContainer>
  );

  return (
    <Container>
      <Header />
      <ListContainer
        data={availablePortfolios}
        keyExtractor={(item) => item.nome}
        renderItem={({ item }) => (
          <PortfolioCardItem
            portfolio={item}
            onPress={() => handleSelectPortfolio(item)}
            responsiveWidth={width}
          />
        )}
        ListHeaderComponent={renderListHeader}
      />
    </Container>
  );
};

export default InvestmentSuggestionsScreen;