import React from 'react';
import { Question, Option } from '../types';

interface QuizStepProps {
  question: Question;
  selectedValues: string | string[];
  onSelect: (value: string) => void;
}

export const QuizStep: React.FC<QuizStepProps> = ({ question, selectedValues, onSelect }) => {
  
  const isSelected = (id: string) => {
    if (Array.isArray(selectedValues)) {
      return selectedValues.includes(id);
    }
    return selectedValues === id;
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in-up">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center tracking-tight">
        {question.title}
      </h2>
      
      {question.subtitle && (
        <p className="text-gray-400 text-center mb-8 text-lg">
          {question.subtitle}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {question.options?.map((option) => {
          const active = isSelected(option.id);
          const Icon = option.icon;

          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={`
                relative group flex items-center p-6 rounded-2xl border transition-all duration-300
                ${active 
                  ? 'border-neon bg-neon-dim shadow-neon text-white' 
                  : 'border-gray-800 bg-gray-900/50 hover:border-gray-600 hover:bg-gray-800 text-gray-300'
                }
              `}
            >
              {active && (
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-neon shadow-[0_0_8px_#39FF14]"></div>
              )}
              
              <div className={`mr-4 ${active ? 'text-neon' : 'text-gray-500 group-hover:text-white'}`}>
                {Icon && <Icon size={24} />}
              </div>
              
              <span className="text-lg font-medium text-left">
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};