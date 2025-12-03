import React from 'react';
import { QuizAnswers } from '../types';
import { User, Mail, Phone, Lock } from 'lucide-react';

interface ContactFormProps {
  data: QuizAnswers;
  onChange: (field: keyof QuizAnswers, value: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({ data, onChange, onSubmit, isSubmitting }) => {
  return (
    <div className="w-full max-w-xl mx-auto animate-fade-in-up">
      <h2 className="text-3xl font-bold text-white mb-2 text-center">
        Quase lá!
      </h2>
      <p className="text-gray-400 text-center mb-8">
        Para onde devemos enviar as opções exclusivas que encontramos para você?
      </p>

      <div className="space-y-4 bg-gray-900/50 p-6 md:p-8 rounded-3xl border border-gray-800 backdrop-blur-sm">
        
        {/* Name Input */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <User className="text-gray-500 group-focus-within:text-neon transition-colors" size={20} />
          </div>
          <input
            type="text"
            value={data.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Seu nome completo"
            className="w-full pl-12 pr-4 py-4 bg-gray-950 border border-gray-800 rounded-xl focus:border-neon focus:ring-1 focus:ring-neon text-white placeholder-gray-600 outline-none transition-all"
          />
        </div>

        {/* Email Input */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="text-gray-500 group-focus-within:text-neon transition-colors" size={20} />
          </div>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="Seu melhor e-mail"
            className="w-full pl-12 pr-4 py-4 bg-gray-950 border border-gray-800 rounded-xl focus:border-neon focus:ring-1 focus:ring-neon text-white placeholder-gray-600 outline-none transition-all"
          />
        </div>

        {/* Phone Input */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Phone className="text-gray-500 group-focus-within:text-neon transition-colors" size={20} />
          </div>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="WhatsApp / Celular"
            className="w-full pl-12 pr-4 py-4 bg-gray-950 border border-gray-800 rounded-xl focus:border-neon focus:ring-1 focus:ring-neon text-white placeholder-gray-600 outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 justify-center py-2">
            <Lock size={12} />
            <span>Seus dados estão seguros e não faremos spam.</span>
        </div>

        <button
          onClick={onSubmit}
          disabled={isSubmitting || !data.name || !data.email || !data.phone}
          className={`
            w-full py-4 rounded-xl font-bold text-lg uppercase tracking-wide transition-all
            ${isSubmitting 
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                : 'bg-neon text-black hover:shadow-neon hover:scale-[1.02] active:scale-[0.98]'
            }
          `}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processando...
            </span>
          ) : (
            "Ver Imóveis Compatíveis"
          )}
        </button>
      </div>
    </div>
  );
};