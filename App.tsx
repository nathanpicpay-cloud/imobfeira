import React, { useState } from 'react';
import { QUESTIONS } from './constants';
import { INITIAL_ANSWERS, QuizAnswers } from './types';
import { QuizStep } from './components/QuizStep';
import { ContactForm } from './components/ContactForm';
import { Summary } from './components/Summary';
import { submitLead } from './services/leadService';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function App() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(INITIAL_ANSWERS);
  const [isStarted, setIsStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Total steps: Questions + Contact Form
  const totalSteps = QUESTIONS.length + 1;
  const currentProgress = ((currentStepIndex + 1) / totalSteps) * 100;

  const handleStart = () => setIsStarted(true);

  const handleAnswer = (value: string) => {
    const currentQuestion = QUESTIONS[currentStepIndex];
    
    setAnswers(prev => {
      if (currentQuestion.type === 'multiple') {
        const currentList = prev[currentQuestion.key] as string[];
        const newList = currentList.includes(value)
          ? currentList.filter(item => item !== value)
          : [...currentList, value];
        return { ...prev, [currentQuestion.key]: newList };
      } else {
        return { ...prev, [currentQuestion.key]: value };
      }
    });

    // Auto-advance for single choice questions to improve flow
    if (currentQuestion.type === 'single') {
        setTimeout(() => handleNext(), 250);
    }
  };

  const handleContactChange = (field: keyof QuizAnswers, value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStepIndex < QUESTIONS.length) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    } else {
        setIsStarted(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await submitLead(answers);
      if (response.success) {
        setIsCompleted(true);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Submission error", error);
      alert("Erro ao enviar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setAnswers(INITIAL_ANSWERS);
    setIsCompleted(false);
    setIsStarted(false);
    setCurrentStepIndex(0);
  };

  // --- RENDER: Landing Page ---
  if (!isStarted) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-neon-glow rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-500 rounded-full blur-[100px] opacity-10 pointer-events-none"></div>

        <div className="max-w-4xl w-full text-center relative z-10 animate-fade-in">
          <span className="inline-block py-1 px-3 rounded-full bg-neon-dim border border-neon/30 text-neon text-xs font-bold tracking-wider mb-6 uppercase">
            Feira de Santana - BA
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Encontre o Imóvel <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-emerald-400">
              Perfeito para Você
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Responda a 7 perguntas rápidas e receba uma curadoria exclusiva de imóveis nos melhores bairros da cidade.
          </p>
          <button
            onClick={handleStart}
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-neon text-slate-950 font-bold text-lg rounded-full transition-all hover:shadow-neon-hover hover:scale-105"
          >
            Começar Consultoria Gratuita
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="mt-16 flex justify-center gap-12 text-gray-500 text-sm font-medium">
            <div className="flex flex-col items-center">
                <span className="text-white text-xl font-bold">500+</span>
                <span>Imóveis Avaliados</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-white text-xl font-bold">98%</span>
                <span>Clientes Satisfeitos</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-white text-xl font-bold">24h</span>
                <span>Atendimento Rápido</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER: Success Page ---
  if (isCompleted) {
    return (
        <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
            <Summary data={answers} onReset={handleReset} />
        </div>
    )
  }

  // --- RENDER: Quiz Flow ---
  const currentQuestion = QUESTIONS[currentStepIndex];
  const isContactStep = currentStepIndex === QUESTIONS.length;

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col relative">
      {/* Progress Header */}
      <div className="w-full h-2 bg-gray-900 fixed top-0 left-0 z-50">
        <div 
          className="h-full bg-neon shadow-[0_0_10px_#39FF14] transition-all duration-500 ease-out"
          style={{ width: `${currentProgress}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-4 pt-12 md:p-8">
        
        {/* Navigation Controls */}
        <div className="w-full max-w-4xl mb-8 flex justify-between items-center text-gray-500 text-sm uppercase tracking-widest font-semibold">
           <button onClick={handleBack} className="flex items-center gap-2 hover:text-white transition-colors">
             <ChevronLeft size={16} /> Voltar
           </button>
           <span>
             {isContactStep ? 'Finalizar' : `Passo ${currentStepIndex + 1} de ${QUESTIONS.length}`}
           </span>
        </div>

        {/* Content Area */}
        <div className="w-full flex justify-center min-h-[400px]">
            {isContactStep ? (
                <ContactForm 
                    data={answers}
                    onChange={handleContactChange}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                />
            ) : (
                <QuizStep 
                    question={currentQuestion}
                    selectedValues={answers[currentQuestion.key] as string | string[]}
                    onSelect={handleAnswer}
                />
            )}
        </div>

        {/* Next Button for Multiple Choice Steps only */}
        {!isContactStep && currentQuestion.type === 'multiple' && (
             <div className="mt-12">
                 <button 
                    onClick={handleNext}
                    className="px-8 py-3 rounded-full bg-gray-800 text-white font-medium hover:bg-gray-700 transition-all flex items-center gap-2"
                 >
                    Continuar <ChevronRight size={16} />
                 </button>
             </div>
        )}
      </div>
    </div>
  );
}