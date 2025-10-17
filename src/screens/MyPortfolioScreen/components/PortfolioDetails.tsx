import React from 'react';
import { Portfolio } from '../models/portfolio';
import {
  PortfolioTitle,
  PortfolioItem,
  NoDataText,
} from '../styles';

interface PortfolioDetailsProps {
  portfolio: Portfolio | null;
}

export const PortfolioDetails: React.FC<PortfolioDetailsProps> = ({ portfolio }) => {
  if (!portfolio) {
    return <NoDataText>Nenhuma carteira selecionada.</NoDataText>;
  }

  return (
    <>
      <PortfolioTitle>{portfolio.nome}</PortfolioTitle>
      {portfolio.ativos.map((ativo, index) => (
        <PortfolioItem key={index}>• {ativo}</PortfolioItem>
      ))}
    </>
  );
};