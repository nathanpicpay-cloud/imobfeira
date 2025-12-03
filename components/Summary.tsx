import React from 'react';
import { QuizAnswers } from '../types';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface SummaryProps {
  data: QuizAnswers;
  onReset: () => void;
}

export const Summary: React.FC<SummaryProps> = ({ data, onReset }) => {
  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in-up text-center">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-neon-dim rounded-full flex items-center justify-center border border-neon shadow-neon">
            <CheckCircle size={40} className="text-neon" />
        </div>
      </div>
      
      <h2 className="text-4xl font-bold text-white mb-4">
        Perfil Recebido!
      </h2>
      <p className="text-xl text-gray-300 mb-8 max-w-lg mx-auto">
        Olá <span className="text-neon font-semibold">{data.name.split(' ')[0]}</span>, analisamos suas preferências.
        Um de nossos especialistas em <span className="text-white font-medium">{data.neighborhoods.join(', ') || 'Feira de Santana'}</span> já está selecionando os imóveis que combinam com você.
      </p>

      <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 mb-8 text-left max-w-lg mx-auto backdrop-blur-md">
        <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4 font-semibold border-b border-gray-800 pb-2">Resumo da busca</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
                <p className="text-gray-500">Transação</p>
                <p className="text-white font-medium capitalize">{data.transactionType === 'buy' ? 'Compra' : data.transactionType === 'rent' ? 'Aluguel' : 'Investimento'}</p>
            </div>
            <div>
                <p className="text-gray-500">Tipo</p>
                <p className="text-white font-medium capitalize">{data.propertyType === 'condo' ? 'Condomínio' : 'Padrão'}</p>
            </div>
            <div>
                <p className="text-gray-500">Dormitórios</p>
                <p className="text-white font-medium">{data.bedrooms}</p>
            </div>
            <div>
                <p className="text-gray-500">Prazo</p>
                <p className="text-white font-medium capitalize">{data.timeline === 'immediate' ? 'Imediato' : 'Curto Prazo'}</p>
            </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
            Voltar ao Site
        </button>
        <button 
            onClick={onReset}
            className="px-8 py-3 border border-neon text-neon rounded-lg hover:bg-neon hover:text-black transition-all flex items-center justify-center gap-2 group"
        >
            Nova Simulação <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
        </button>
      </div>
    </div>
  );
};