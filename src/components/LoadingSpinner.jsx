
import React from 'react';

const LoadingSpinner = ({ message = "Gerando seu micro-learning..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6">
      {/* Spinner animado */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-purple-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
      
      {/* Texto de carregamento */}
      <div className="text-center space-y-2">
        <p className="text-lg font-medium text-gray-700">{message}</p>
        <div className="flex items-center justify-center space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
        </div>
      </div>
      
      {/* Dicas durante o carregamento */}
      <div className="text-center text-sm text-gray-500 max-w-md">
        <p>✨ Nossa IA está analisando sua situação e criando conteúdo personalizado para você...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
