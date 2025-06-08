
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';
import InputForm from '../components/InputForm';
import ResultCards from '../components/ResultCards';
import HistoryModal from '../components/HistoryModal';
import LoadingSpinner from '../components/LoadingSpinner';
import { useGeminiAPI } from '../hooks/useGeminiAPI';
import { storage } from '../utils/storage';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState('input'); // 'input', 'loading', 'result'
  const [inputData, setInputData] = useState(null);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  
  const { generateContent, isLoading, error } = useGeminiAPI();

  const handleFormSubmit = async (formData) => {
    setInputData(formData);
    setCurrentScreen('loading');
    
    try {
      const content = await generateContent(formData);
      setGeneratedContent(content);
      setCurrentScreen('result');
      
      // Salvar automaticamente no histórico
      storage.saveLearning({
        inputData: formData,
        generatedContent: content
      });
    } catch (err) {
      console.error('Erro ao gerar conteúdo:', err);
      setCurrentScreen('input');
      alert('Erro ao gerar conteúdo. Tente novamente.');
    }
  };

  const handleGenerateNew = async () => {
    if (inputData) {
      setCurrentScreen('loading');
      try {
        const content = await generateContent(inputData);
        setGeneratedContent(content);
        setCurrentScreen('result');
        
        // Salvar nova versão
        storage.saveLearning({
          inputData,
          generatedContent: content
        });
      } catch (err) {
        console.error('Erro ao gerar novo conteúdo:', err);
        alert('Erro ao gerar novo conteúdo. Tente novamente.');
      }
    }
  };

  const handleBackToForm = () => {
    setCurrentScreen('input');
    setInputData(null);
    setGeneratedContent(null);
  };

  const handleLoadFromHistory = (learning) => {
    setInputData(learning.inputData);
    setGeneratedContent(learning.generatedContent);
    setCurrentScreen('result');
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        
        {/* Header com botão de histórico */}
        {currentScreen === 'input' && (
          <div className="flex justify-end mb-6">
            <Button
              variant="outline"
              onClick={() => setShowHistory(true)}
              className="space-x-2 glass-effect border-white/30"
            >
              <History className="w-4 h-4" />
              <span>Histórico</span>
            </Button>
          </div>
        )}

        {/* Telas principais */}
        {currentScreen === 'input' && (
          <InputForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        )}

        {currentScreen === 'loading' && (
          <div className="max-w-2xl mx-auto">
            <LoadingSpinner message="Gerando seu micro-learning personalizado..." />
          </div>
        )}

        {currentScreen === 'result' && inputData && generatedContent && (
          <ResultCards
            inputData={inputData}
            generatedContent={generatedContent}
            onGenerateNew={handleGenerateNew}
            onBack={handleBackToForm}
          />
        )}

        {/* Modal de histórico */}
        <HistoryModal
          isOpen={showHistory}
          onClose={() => setShowHistory(false)}
          onLoadLearning={handleLoadFromHistory}
        />

        {/* Footer */}
        <footer className="text-center mt-16 text-sm text-gray-500">
          <p>MicroLearn AI - Aprendizado personalizado powered by IA</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
