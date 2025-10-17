import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { EvaluationService } from '../services/evaluationService';
import { Answers, questions as questionsData } from '../models/evaluation';

export const useProfileEvaluation = () => {
  const [answers, setAnswers] = useState<Answers>({});
  const [profile, setProfile] = useState('');
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const loadAndEvaluate = async () => {
        try {
          setLoading(true);
          const loadedAnswers = await EvaluationService.loadAnswers();
          if (loadedAnswers) {
            setAnswers(loadedAnswers);
            const calculatedProfile = EvaluationService.evaluateProfile(loadedAnswers, questionsData);
            setProfile(calculatedProfile);
          } else {
            setProfile('Questionário não respondido');
          }
        } catch (err) {
          console.error('Erro ao carregar ou avaliar perfil:', err);
          setProfile('Erro ao carregar perfil');
        } finally {
          setLoading(false);
        }
      };

      loadAndEvaluate();
    }, [])
  );

  return {
    loading,
    profile,
    answers,
    questions: questionsData,
  };
};