// screens/MyPortfolioScreen/components/AddInvestmentModal.tsx

import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import theme from '../../../styles/theme';
import { MyPortfolioService } from '../services/myPortfolioService';
import { Investment } from '../models/portfolio';

interface Props {
  visible: boolean;
  onClose: (shouldRefresh: boolean) => void;
  investmentToEdit: Investment | null;
  userId: string;
}

const AddInvestmentModal: React.FC<Props> = ({ visible, onClose, investmentToEdit, userId }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null); // Novo estado para erro de validação

  useEffect(() => {
    if (investmentToEdit) {
      setName(investmentToEdit.name); setType(investmentToEdit.type); setValue(String(investmentToEdit.value));
    } else {
      setName(''); setType(''); setValue('');
    }
    setValidationError(null); // Limpa o erro sempre que o modal abre
  }, [investmentToEdit, visible]);

  const handleSave = async () => {
    setValidationError(null); // Limpa o erro antigo

    // --- AQUI ESTÁ A LÓGICA DE VALIDAÇÃO CORRIGIDA ---
    if (!name.trim() || !type.trim() || !value.trim()) {
      setValidationError("Por favor, preencha todos os campos.");
      return; // Para a execução
    }
    if (isNaN(parseFloat(value))) {
      setValidationError("O campo 'Valor' deve ser um número.");
      return; // Para a execução
    }

    setLoading(true);
    try {
      const investmentData = { name, type, value: parseFloat(value) };
      if (investmentToEdit) {
        await MyPortfolioService.updateInvestment(userId, investmentToEdit.id, investmentData);
        Alert.alert("Sucesso", "Investimento atualizado!");
      } else {
        await MyPortfolioService.addInvestment(userId, investmentData);
        Alert.alert("Sucesso", "Investimento adicionado!");
      }
      onClose(true);
    } catch (error) {
      // Erro de servidor (Firebase)
      setValidationError("Não foi possível salvar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{investmentToEdit ? 'Editar' : 'Adicionar'} Investimento</Text>
          <TextInput placeholder="Nome do Ativo" style={styles.input} value={name} onChangeText={setName} />
          <TextInput placeholder="Tipo (ex: Renda Fixa)" style={styles.input} value={type} onChangeText={setType} />
          <TextInput placeholder="Valor" style={styles.input} value={value} onChangeText={setValue} keyboardType="numeric" />

          {/* Exibe a mensagem de erro de validação diretamente no formulário */}
          {validationError && <Text style={styles.errorText}>{validationError}</Text>}

          <View style={styles.buttonContainer}>
            <Button title="Cancelar" onPress={() => onClose(false)} color={theme.colors.error} />
            <Button title={loading ? "Salvando..." : "Salvar"} onPress={handleSave} disabled={loading} color={theme.colors.primary} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Adicione o estilo para o texto de erro
const styles = StyleSheet.create({
  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)' },
  modalView: { width: '90%', backgroundColor: '#2C2C2E', padding: 25, borderRadius: 15 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: theme.colors.text, marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#3E3E42', color: theme.colors.text, padding: 10, borderRadius: 5, marginBottom: 15 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
  errorText: { color: theme.colors.error, textAlign: 'center', marginBottom: 10 } // Estilo para a mensagem de erro
});

export default AddInvestmentModal;