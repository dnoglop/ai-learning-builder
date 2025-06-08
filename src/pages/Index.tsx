
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { History, Sparkles, Zap, Brain, Target } from 'lucide-react';
import InputForm from '../components/InputForm';
import ResultCards from '../components/ResultCards';
import HistoryModal from '../components/HistoryModal';
import LoadingSpinner from '../components/LoadingSpinner';
import { useGeminiAPI } from '../hooks/useGeminiAPI';
import { storage } from '../utils/storage';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState('input');
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
    <div className="min-h-screen">
      {/* Header Premium */}
      <header className="glass-header border-b border-white/20 sticky top-0 z-50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">MicroLearn AI</h1>
                <p className="text-blue-100 text-sm">Powered by Advanced AI</p>
              </div>
            </div>
            
            {currentScreen === 'input' && (
              <Button
                variant="outline"
                onClick={() => setShowHistory(true)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <History className="w-4 h-4 mr-2" />
                Histórico
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {currentScreen === 'input' && (
          <div className="animate-fade-in-up">
            <InputForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>
        )}

        {currentScreen === 'loading' && (
          <div className="max-w-3xl mx-auto animate-scale-in">
            <LoadingSpinner message="Criando seu micro-learning personalizado..." />
          </div>
        )}

        {currentScreen === 'result' && inputData && generatedContent && (
          <div className="animate-fade-in-up">
            <ResultCards
              inputData={inputData}
              generatedContent={generatedContent}
              onGenerateNew={handleGenerateNew}
              onBack={handleBackToForm}
            />
          </div>
        )}

        <HistoryModal
          isOpen={showHistory}
          onClose={() => setShowHistory(false)}
          onLoadLearning={handleLoadFromHistory}
        />
      </main>

      {/* Footer Premium */}
      <footer className="mt-20 py-16 border-t border-slate-200/50">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center space-x-8">
              <div className="flex items-center space-x-3 text-slate-600">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-slate-900">Rápido</div>
                  <div className="text-sm">Resultados em segundos</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-slate-600">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-slate-900">Personalizado</div>
                  <div className="text-sm">Para sua situação específica</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-slate-600">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-slate-900">Inteligente</div>
                  <div className="text-sm">Powered by AI</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-2 text-slate-500">
              <Brain className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium">MicroLearn AI - Transformando desafios em oportunidades de crescimento</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
