// screens/MyPortfolioScreen/index.tsx

import React, { useState } from 'react';
import { useWindowDimensions, ActivityIndicator, FlatList, Button, View, Alert, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import { useMyPortfolio } from './hooks/useMyPortfolio';
import theme from '../../styles/theme';
import { Investment } from './models/portfolio';
import AddInvestmentModal from './components/AddInvestmentModal';
import {
  Container, Content, Title, LoadingContainer, ErrorContainer, ErrorText,
  ItemContainer, ItemName, ItemType, ItemValue, NoDataText
} from './styles';
import { useAuth } from '../../context/AuthContext';

// --- COMPONENTE DO ITEM SEM O BOTÃO EXCLUIR ---
const InvestmentItem = ({ item, onEdit }: { item: Investment, onEdit: () => void }) => (
  <ItemContainer>
    <View style={{ flex: 1 }}>
      <ItemName>{item.name}</ItemName>
      <ItemType>{item.type}</ItemType>
      <ItemValue>R$ {item.value.toFixed(2).replace('.', ',')}</ItemValue>
    </View>
    <View style={styles.buttonsWrapper}>
      <TouchableOpacity onPress={onEdit} style={styles.button}>
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>
      {/* O botão Excluir foi removido daqui */}
    </View>
  </ItemContainer>
);

const MyPortfolioScreen: React.FC = () => {
  const { user } = useAuth();
  const { loading, error, portfolio, reloadPortfolio } = useMyPortfolio(user?.id);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(null);

  const handleAddNew = () => {
    setEditingInvestment(null);
    setModalVisible(true);
  };

  const handleEdit = (item: Investment) => {
    setEditingInvestment(item);
    setModalVisible(true);
  };

  // --- A FUNÇÃO handleDelete FOI COMPLETAMENTE REMOVIDA ---

  const handleModalClose = (shouldRefresh: boolean) => {
    setModalVisible(false);
    if (shouldRefresh) {
      reloadPortfolio();
    }
  };

  if (!user) {
    return <LoadingContainer />;
  }

  if (loading) {
    return (<LoadingContainer><ActivityIndicator size="large" color={theme.colors.primary} /></LoadingContainer>);
  }

  if (error) {
    return (<ErrorContainer><ErrorText>{error}</ErrorText><Button title="Tentar Novamente" onPress={reloadPortfolio} color={theme.colors.primary} /></ErrorContainer>);
  }

  return (
    <Container>
      <Header />
      <Content>
        <Title>Minha Carteira</Title>
        <FlatList
          data={portfolio}
          renderItem={({ item }) => (
            <InvestmentItem 
              item={item} 
              onEdit={() => handleEdit(item)}
              // A chamada para onDelete foi removida daqui
            />
          )}
          keyExtractor={item => item.id}
          ListEmptyComponent={<NoDataText>Sua carteira está vazia. Adicione um novo investimento.</NoDataText>}
        />
        <View style={{ margin: 20 }}>
          <Button
            title="Adicionar Investimento"
            onPress={handleAddNew}
            color={theme.colors.primary}
          />
        </View>
      </Content>
      <AddInvestmentModal 
        visible={modalVisible} 
        onClose={handleModalClose} 
        investmentToEdit={editingInvestment}
        userId={user.id}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
    buttonsWrapper: {
        flexDirection: 'row',
    },
    button: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 5,
        marginLeft: 8,
    },
    buttonText: {
        color: theme.colors.btntext,
        fontWeight: 'bold',
    },
});

export default MyPortfolioScreen;