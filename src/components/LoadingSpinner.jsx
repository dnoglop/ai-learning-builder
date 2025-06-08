
import React from 'react';
import { Sparkles, Brain, BookOpen, Zap, Target, Rocket } from 'lucide-react';

const LoadingSpinner = ({ message = "Criando seu micro-learning personalizado..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-12">
      {/* Spinner Premium com múltiplas camadas */}
      <div className="relative">
        {/* Círculo externo */}
        <div className="w-32 h-32 rounded-full border-4 border-blue-100/50"></div>
        
        {/* Círculo do meio animado */}
        <div className="absolute inset-2 w-28 h-28 rounded-full border-4 border-blue-300/50 animate-spin [animation-duration:3s]"></div>
        
        {/* Círculo interno animado */}
        <div className="absolute inset-4 w-24 h-24 rounded-full border-4 border-blue-500 border-t-transparent animate-spin [animation-duration:1.5s]"></div>
        
        {/* Ícone central */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-premium animate-pulse">
            <Brain className="w-8 h-8 text-white" />
          </div>
        </div>
        
        {/* Partículas flutuantes */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-500 rounded-full animate-ping"
              style={{
                top: `${20 + Math.sin(i * 60) * 30}%`,
                left: `${20 + Math.cos(i * 60) * 30}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Texto de carregamento premium */}
      <div className="text-center space-y-6 max-w-2xl">
        <h3 className="text-4xl font-bold text-slate-900">{message}</h3>
        <div className="flex items-center justify-center space-x-3">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i}
              className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <p className="text-slate-600 text-lg leading-relaxed">
          Nossa IA está analisando sua situação e criando estratégias personalizadas para o seu sucesso
        </p>
      </div>
      
      {/* Processo IA - Cards de etapas */}
      <div className="glass-card rounded-3xl p-8 shadow-premium border-premium max-w-2xl w-full">
        <h4 className="font-bold text-slate-900 mb-8 text-center text-2xl">Nossa IA está trabalhando:</h4>
        <div className="space-y-6">
          {[
            { icon: Brain, text: "Analisando contexto e nuances da situação", color: "blue", delay: "0s" },
            { icon: Target, text: "Identificando estratégias adequadas para sua audiência", color: "green", delay: "0.5s" },
            { icon: BookOpen, text: "Selecionando conhecimentos essenciais", color: "purple", delay: "1s" },
            { icon: Rocket, text: "Personalizando plano de ação", color: "orange", delay: "1.5s" }
          ].map((step, idx) => (
            <div 
              key={idx} 
              className="flex items-center space-x-4 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-slate-200/50 animate-fade-in-up"
              style={{ animationDelay: step.delay }}
            >
              <div className={`w-12 h-12 rounded-2xl bg-${step.color}-50 flex items-center justify-center`}>
                <step.icon className={`w-6 h-6 text-${step.color}-600`} />
              </div>
              <span className="text-slate-700 font-medium text-lg">{step.text}</span>
              <div className="ml-auto">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Dica premium */}
      <div className="text-center max-w-xl bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-3xl border border-blue-200/50">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 text-blue-500 mr-3" />
          <span className="text-2xl">✨</span>
        </div>
        <p className="text-slate-700 text-lg leading-relaxed font-medium">
          Estamos criando um guia prático e acionável baseado nas melhores práticas para sua situação específica
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
