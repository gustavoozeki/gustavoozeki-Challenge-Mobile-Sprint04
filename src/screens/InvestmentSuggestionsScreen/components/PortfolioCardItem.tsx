import React from 'react';
import { Portfolio } from '../models/portfolio';
import {
  PortfolioCardContainer,
  PortfolioTitle,
  PortfolioItem,
} from '../styles';

interface PortfolioCardItemProps {
  portfolio: Portfolio;
  onPress: () => void;
  responsiveWidth: number;
}

export const PortfolioCardItem: React.FC<PortfolioCardItemProps> = ({ portfolio, onPress, responsiveWidth }) => (
  <PortfolioCardContainer onPress={onPress} responsiveWidth={responsiveWidth}>
    <PortfolioTitle responsiveWidth={responsiveWidth}>{portfolio.nome}</PortfolioTitle>
    {portfolio.ativos.map((ativo, i) => (
      <PortfolioItem key={i} responsiveWidth={responsiveWidth}>• {ativo}</PortfolioItem>
    ))}
  </PortfolioCardContainer>
);