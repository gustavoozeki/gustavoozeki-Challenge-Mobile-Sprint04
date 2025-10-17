import styled from 'styled-components/native';
import theme from '../../styles/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

export const ListContainer = styled.FlatList.attrs({
  contentContainerStyle: {
    padding: 20,
  },
})`` as React.ElementType;

export const HeaderContainer = styled.View``;

export const Title = styled.Text<{ responsiveWidth: number }>`
  font-size: ${({ responsiveWidth }) => (responsiveWidth > 400 ? '24px' : '20px')};
  font-weight: bold;
  text-align: center;
  color: ${theme.colors.text};
  margin-bottom: 10px;
`;

export const Subtitle = styled.Text<{ responsiveWidth: number }>`
  font-size: ${({ responsiveWidth }) => (responsiveWidth > 400 ? '18px' : '16px')};
  text-align: center;
  margin-bottom: 25px;
  color: ${theme.colors.text};
`;

export const Bold = styled.Text`
  font-weight: bold;
  color: ${theme.colors.primary};
`;

export const SectionTitle = styled.Text<{ responsiveWidth: number }>`
  font-size: ${({ responsiveWidth }) => (responsiveWidth > 400 ? '20px' : '18px')};
  font-weight: bold;
  margin-bottom: 15px;
  color: ${theme.colors.text};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.background};
`;

// Estilos do Card
export const PortfolioCardContainer = styled.TouchableOpacity<{ responsiveWidth: number }>`
  background-color: ${theme.colors.card};
  padding: ${({ responsiveWidth }) => (responsiveWidth > 400 ? '20px' : '15px')};
  border-radius: 10px;
  margin-bottom: 15px;
  border-width: 1px;
  border-color: ${theme.colors.border};
`;

export const PortfolioTitle = styled.Text<{ responsiveWidth: number }>`
  font-size: ${({ responsiveWidth }) => (responsiveWidth > 400 ? '18px' : '16px')};
  font-weight: bold;
  color: ${theme.colors.primary};
  margin-bottom: 10px;
`;

export const PortfolioItem = styled.Text<{ responsiveWidth: number }>`
  font-size: ${({ responsiveWidth }) => (responsiveWidth > 400 ? '16px' : '14px')};
  color: ${theme.colors.text};
  line-height: 22px;
`;