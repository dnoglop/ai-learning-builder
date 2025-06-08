
import React from 'react';
import { Sparkles, Brain, BookOpen, Zap } from 'lucide-react';

const LoadingSpinner = ({ message = "Criando seu micro-learning personalizado..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-8">
      {/* Spinner principal */}
      <div className="relative">
        <div className="w-20 h-20 rounded-full border-4 border-blue-100"></div>
        <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-blue-500 animate-pulse" />
        </div>
      </div>
      
      {/* Texto de carregamento */}
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold text-gray-900">{message}</h3>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
        </div>
      </div>
      
      {/* Etapas de processamento */}
      <div className="bg-white rounded-2xl p-6 shadow-blue border border-blue-soft max-w-md">
        <h4 className="font-semibold text-gray-900 mb-4 text-center">Nossa IA está trabalhando:</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm">
            <Brain className="w-4 h-4 text-blue-500" />
            <span className="text-gray-700">Analisando sua situação específica</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <BookOpen className="w-4 h-4 text-green-500" />
            <span className="text-gray-700">Selecionando estratégias adequadas</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <Zap className="w-4 h-4 text-purple-500" />
            <span className="text-gray-700">Personalizando o conteúdo</span>
          </div>
        </div>
      </div>
      
      {/* Dica */}
      <div className="text-center text-gray-600 max-w-lg">
        <p className="text-sm leading-relaxed">
          ✨ Estamos criando um guia prático e acionável baseado nas melhores práticas para sua situação específica
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
