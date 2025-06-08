
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ThumbsUp, ThumbsDown, Share, RotateCcw, Copy, CheckCircle } from 'lucide-react';
import { storage } from '../utils/storage';

const ResultCards = ({ inputData, generatedContent, onGenerateNew, onBack }) => {
  const [feedback, setFeedback] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleFeedback = (type) => {
    setFeedback(type);
    // Salvar feedback no storage
    const saved = storage.saveLearning({
      inputData,
      generatedContent,
      feedback: type
    });
    console.log('Learning saved with feedback:', saved);
  };

  const handleShare = async () => {
    const formattedText = storage.formatForSharing(inputData, generatedContent);
    
    try {
      await navigator.clipboard.writeText(formattedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
      // Fallback para dispositivos que não suportam clipboard API
      alert('Texto formatado:\n\n' + formattedText);
    }
  };

  const cards = [
    {
      id: 'mindset',
      title: 'MINDSET PREP',
      icon: '🧠',
      duration: '30 segundos',
      color: 'from-purple-500 to-purple-600',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Preparação Mental:</h4>
            <p className="text-gray-700 leading-relaxed">{generatedContent.mindset_prep.content}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
            <h4 className="font-medium text-purple-800 mb-1">💨 Técnica de Respiração:</h4>
            <p className="text-purple-700 text-sm">{generatedContent.mindset_prep.breathing_technique}</p>
          </div>
        </div>
      )
    },
    {
      id: 'learning',
      title: 'CORE LEARNING',
      icon: '📚',
      duration: '2-3 minutos',
      color: 'from-blue-500 to-blue-600',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Conceitos-Chave:</h4>
            <ul className="space-y-1">
              {generatedContent.core_learning.key_concepts.map((concept, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span className="text-gray-700 text-sm">{concept}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-1">🎯 Estratégia Principal:</h4>
            <p className="text-blue-700 text-sm">{generatedContent.core_learning.main_strategy}</p>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-2">⚠️ Evitar:</h4>
            <ul className="space-y-1">
              {generatedContent.core_learning.common_pitfalls.map((pitfall, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span className="text-gray-700 text-sm">{pitfall}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'action',
      title: 'ACTION TOOLKIT',
      icon: '⚡',
      duration: 'Execute agora',
      color: 'from-green-500 to-green-600',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">🚀 Ações Imediatas:</h4>
            <ul className="space-y-2">
              {generatedContent.action_toolkit.immediate_actions.map((action, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1 font-bold">{idx + 1}.</span>
                  <span className="text-gray-700 text-sm">{action}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">💬 Frases Poderosas:</h4>
            {generatedContent.action_toolkit.key_phrases.map((phrase, idx) => (
              <p key={idx} className="text-green-700 text-sm italic mb-1">"{phrase}"</p>
            ))}
          </div>

          <div className="border-t pt-3">
            <h4 className="font-medium text-gray-800 mb-1">✅ Sucesso:</h4>
            <p className="text-gray-700 text-sm">{generatedContent.action_toolkit.success_metrics}</p>
          </div>
        </div>
      )
    },
    {
      id: 'contingency',
      title: 'PLANO B',
      icon: '🛡️',
      duration: 'Se precisar',
      color: 'from-orange-500 to-orange-600',
      content: (
        <div className="space-y-4">
          <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
            <h4 className="font-medium text-orange-800 mb-2">🚨 Se der errado:</h4>
            <p className="text-orange-700 text-sm">{generatedContent.contingency_plan.if_goes_wrong}</p>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-2">🔄 Frases de Recuperação:</h4>
            <ul className="space-y-2">
              {generatedContent.contingency_plan.recovery_phrases.map((phrase, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-orange-500 mt-1">💬</span>
                  <span className="text-gray-700 text-sm italic">"{phrase}"</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header com info da situação */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/30 backdrop-blur rounded-full border border-white/20">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-gray-700">Micro-Learning Gerado</span>
        </div>
        
        <div className="bg-white/40 backdrop-blur rounded-2xl p-6 border border-white/20">
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Situação:</span>
              <p className="font-medium truncate">{inputData.situation.substring(0, 50)}...</p>
            </div>
            <div>
              <span className="text-gray-500">Audiência:</span>
              <p className="font-medium">{inputData.audience}</p>
            </div>
            <div>
              <span className="text-gray-500">Urgência:</span>
              <p className="font-medium">{inputData.urgency}</p>
            </div>
            <div>
              <span className="text-gray-500">Tipo:</span>
              <p className="font-medium">{inputData.situationType}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cards de conteúdo */}
      <div className="grid lg:grid-cols-2 gap-6">
        {cards.map((card) => (
          <Card key={card.id} className="glass-effect border-white/20 overflow-hidden">
            <div className={`bg-gradient-to-r ${card.color} p-4 text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{card.icon}</span>
                  <div>
                    <h3 className="font-bold text-lg">{card.title}</h3>
                    <p className="text-white/80 text-sm">{card.duration}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              {card.content}
            </div>
          </Card>
        ))}
      </div>

      {/* Ações */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="flex items-center space-x-2">
          <Button
            variant={feedback === 'positive' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFeedback('positive')}
            className="space-x-1"
          >
            <ThumbsUp className="w-4 h-4" />
            <span>Útil</span>
          </Button>
          
          <Button
            variant={feedback === 'negative' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFeedback('negative')}
            className="space-x-1"
          >
            <ThumbsDown className="w-4 h-4" />
            <span>Não útil</span>
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={handleShare}
            className="space-x-1"
          >
            {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copiado!' : 'Compartilhar'}</span>
          </Button>

          <Button
            variant="outline"
            onClick={onGenerateNew}
            className="space-x-1"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Gerar Novo</span>
          </Button>

          <Button
            variant="outline"
            onClick={onBack}
          >
            ← Voltar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultCards;
