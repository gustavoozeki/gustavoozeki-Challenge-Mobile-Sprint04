import styled from 'styled-components/native';
import theme from '../../styles/theme';
import { Button } from 'react-native-elements';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

export const ContentWrapper = styled.View<{ isLargeScreen: boolean }>`
  flex: 1;
  width: ${({ isLargeScreen }) => (isLargeScreen ? '70%' : '100%')};
  align-self: center;
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: {
    paddingBottom: 20, // O botão de submit ficará no ListFooterComponent
  },
})`` as React.ElementType;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: ${theme.colors.text};
  margin: 20px 0;
`;

export const FooterContainer = styled.View`
  padding: 20px;
  align-items: center;
`;

export const SubmitButton = styled(Button).attrs({
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  containerStyle: {
    width: '80%',
    maxWidth: 300,
  }
})``;

/* NOTA: Os estilos abaixo (QuestionContainer, QuestionText, etc.) não são usados
  diretamente na QuestionsScreen, mas sim dentro do componente `QuestionItem`.
  O ideal é que o componente `QuestionItem.tsx` importe estes estilos deste
  arquivo para manter a consistência.
*/

export const QuestionContainer = styled.View`
  margin-bottom: 25px;
  padding: 0 20px;
`;

export const QuestionText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: ${theme.colors.text};
  line-height: 24px;
`;

export const OptionButton = styled.TouchableOpacity<{ selected: boolean }>`
  background-color: ${({ selected }) => (selected ? theme.colors.primary : theme.colors.card)};
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  border-width: 1px;
  border-color: ${({ selected }) => (selected ? theme.colors.primary : theme.colors.border)};
`;

export const OptionText = styled.Text<{ selected: boolean }>`
  color: ${({ selected }) => (selected ? theme.colors.white : theme.colors.text)};
  font-size: 16px;
  font-weight: 500;
`;