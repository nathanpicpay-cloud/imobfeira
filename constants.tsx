import { Home, Building2, Store, Key, DollarSign, MapPin, Calendar, CheckCircle2, ShieldCheck, Sun, Trees } from 'lucide-react';
import { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    title: "Qual o seu objetivo?",
    key: "transactionType",
    type: "single",
    options: [
      { id: "buy", label: "Comprar Imóvel", icon: Key },
      { id: "rent", label: "Alugar Imóvel", icon: Calendar },
      { id: "invest", label: "Investimento", icon: DollarSign },
    ]
  },
  {
    id: 2,
    title: "Que tipo de imóvel você busca?",
    key: "propertyType",
    type: "single",
    options: [
      { id: "house", label: "Casa", icon: Home },
      { id: "apartment", label: "Apartamento", icon: Building2 },
      { id: "condo", label: "Casa em Condomínio", icon: ShieldCheck },
      { id: "commercial", label: "Comercial / Sala", icon: Store },
    ]
  },
  {
    id: 3,
    title: "Quantos quartos são essenciais?",
    key: "bedrooms",
    type: "single",
    options: [
      { id: "1", label: "1 Quarto / Studio", icon: undefined },
      { id: "2", label: "2 Quartos", icon: undefined },
      { id: "3", label: "3 Quartos", icon: undefined },
      { id: "4+", label: "4 ou mais Quartos", icon: undefined },
    ]
  },
  {
    id: 4,
    title: "Qual sua faixa de valor/renda?",
    subtitle: "Isso nos ajuda a selecionar as melhores oportunidades.",
    key: "budget",
    type: "single",
    options: [
      { id: "b1", label: "Até R$ 250.000 (Venda) / R$ 1.500 (Aluguel)", icon: undefined },
      { id: "b2", label: "R$ 250k - R$ 500k (Venda) / R$ 1.5k - 3k (Aluguel)", icon: undefined },
      { id: "b3", label: "R$ 500k - R$ 1M (Venda) / R$ 3k - 6k (Aluguel)", icon: undefined },
      { id: "b4", label: "Acima de R$ 1 Milhão / Luxo", icon: undefined },
    ]
  },
  {
    id: 5,
    title: "Regiões de preferência em Feira?",
    subtitle: "Selecione quantas quiser.",
    key: "neighborhoods",
    type: "multiple",
    options: [
      { id: "sim", label: "Bairro SIM", icon: MapPin },
      { id: "santa_monica", label: "Santa Mônica", icon: MapPin },
      { id: "papagaio", label: "Papagaio", icon: MapPin },
      { id: "capuchinhos", label: "Capuchinhos", icon: MapPin },
      { id: "centro", label: "Centro / Kalilândia", icon: MapPin },
      { id: "tomba", label: "Tomba / 35 BI", icon: MapPin },
      { id: "other", label: "Estou aberto a sugestões", icon: MapPin },
    ]
  },
  {
    id: 6,
    title: "O que não pode faltar?",
    key: "features",
    type: "multiple",
    options: [
      { id: "pool", label: "Piscina / Lazer", icon: Sun },
      { id: "security", label: "Portaria 24h", icon: ShieldCheck },
      { id: "gym", label: "Academia", icon: CheckCircle2 },
      { id: "green", label: "Área Verde / Pet Friendly", icon: Trees },
    ]
  },
  {
    id: 7,
    title: "Quando pretende fechar negócio?",
    key: "timeline",
    type: "single",
    options: [
      { id: "immediate", label: "Imediatamente", icon: undefined },
      { id: "3months", label: "Nos próximos 3 meses", icon: undefined },
      { id: "6months", label: "Ainda este ano", icon: undefined },
      { id: "research", label: "Apenas pesquisando", icon: undefined },
    ]
  }
];