import React from 'react';
import { Answers, Question } from '../models/evaluation';
import {
  ProfileBox,
  ProfileText,
  Subtitle,
  QuestionBlock,
  QuestionText,
  AnswerText,
} from '../styles';

interface EvaluationDetailsProps {
  profile: string;
  questions: Question[];
  answers: Answers;
}

export const EvaluationDetails: React.FC<EvaluationDetailsProps> = ({ profile, questions, answers }) => {
  return (
    <>
      <ProfileBox>
        <ProfileText>{profile}</ProfileText>
      </ProfileBox>

      <Subtitle>Suas Respostas:</Subtitle>
      
      {questions.map((q) => (
        <QuestionBlock key={q.id}>
          <QuestionText>{q.text}</QuestionText>
          <AnswerText>
            {answers[q.id] !== undefined
              ? `R: ${q.options[answers[q.id]]}`
              : 'Não respondido'}
          </AnswerText>
        </QuestionBlock>
      ))}
    </>
  );
};