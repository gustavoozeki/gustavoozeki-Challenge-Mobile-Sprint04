import styled from 'styled-components/native';
import theme from '../../styles/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

export const ScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 20,
    alignItems: 'center',
    paddingBottom: 40,
  },
})``;

export const Content = styled.View<{ maxWidth: number | string }>`
  width: 100%;
  max-width: ${({ maxWidth }) => typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth};
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: ${theme.colors.text};
  margin-bottom: 20px;
`;

export const Subtitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-top: 10px;
  margin-bottom: 15px;
`;

export const ProfileBox = styled.View`
  background-color: ${theme.colors.card};
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 20px;
  align-items: center;
  border-width: 1px;
  border-color: ${theme.colors.primary};
`;

export const ProfileText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const QuestionBlock = styled.View`
  margin-bottom: 20px;
  background-color: ${theme.colors.card};
  padding: 15px;
  border-radius: 8px;
`;

export const QuestionText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${theme.colors.text};
  opacity: 0.8;
  margin-bottom: 8px;
`;

export const AnswerText = styled.Text`
  font-size: 16px;
  color: ${theme.colors.text};
  font-weight: bold;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.background};
`;