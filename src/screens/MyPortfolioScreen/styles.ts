// screens/MyPortfolioScreen/styles.ts

import styled from 'styled-components/native';
import theme from '../../styles/theme';

export const Container = styled.View` flex: 1; background-color: ${theme.colors.background}; `;
export const Content = styled.View` flex: 1; width: 100%; max-width: 500px; align-self: center; `;
export const Title = styled.Text` font-size: 24px; font-weight: bold; text-align: center; color: ${theme.colors.text}; margin: 20px 0; `;
export const LoadingContainer = styled.View` flex: 1; justify-content: center; align-items: center; background-color: ${theme.colors.background}; `;
export const ErrorContainer = styled(LoadingContainer)``;
export const ErrorText = styled.Text` font-size: 16px; color: ${theme.colors.error}; text-align: center; margin-bottom: 20px; padding: 0 20px; `;

export const ItemContainer = styled.View`
  background-color: ${theme.colors.card};
  padding: 15px;
  border-radius: 8px;
  margin: 0 10px 10px 10px;
  flex-direction: row;
  align-items: center;
`;

// NOVO: Um container para o texto que pode expandir
export const ItemContent = styled.View`
  flex: 1; /* Isto força-o a ocupar o espaço disponível, mas sem sobrepor os outros */
`;

// NOVO: Um container para os botões com largura fixa
export const ItemActions = styled.View`
  flex-direction: row;
  justify-content: flex-end; /* Alinha os botões à direita */
`;

export const ItemName = styled.Text` font-size: 18px; font-weight: bold; color: ${theme.colors.text}; `;
export const ItemType = styled.Text` font-size: 14px; color: #8A8A8E; margin-top: 2px; `;
export const ItemValue = styled.Text` font-size: 18px; font-weight: bold; color: ${theme.colors.primary}; margin-top: 5px; `;
export const NoDataText = styled.Text` font-size: 16px; color: ${theme.colors.text}; text-align: center; margin-top: 20px; `;