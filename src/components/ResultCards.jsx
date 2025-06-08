
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ThumbsUp, ThumbsDown, Share, RotateCcw, Copy, CheckCircle, Brain, BookOpen, Zap, Shield } from 'lucide-react';
import { storage } from '../utils/storage';

const ResultCards = ({ inputData, generatedContent, onGenerateNew, onBack }) => {
  const [feedback, setFeedback] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleFeedback = (type) => {
    setFeedback(type);
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
      alert('Texto formatado:\n\n' + formattedText);
    }
  };

  const cards = [
    {
      id: 'mindset',
      title: 'PREPARAÇÃO MENTAL',
      icon: Brain,
      duration: '30 segundos',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 text-lg">🎯 Foco Mental:</h4>
            <p className="text-gray-700 leading-relaxed">{generatedContent.mindset_prep.content}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
              💨 Técnica de Respiração:
            </h4>
            <p className="text-blue-700">{generatedContent.mindset_prep.breathing_technique}</p>
          </div>
        </div>
      )
    },
    {
      id: 'learning',
      title: 'CONHECIMENTO ESSENCIAL',
      icon: BookOpen,
      duration: '2-3 minutos',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      content: (
        <div className="space-y-5">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 text-lg">🔑 Conceitos-Chave:</h4>
            <ul className="space-y-2">
              {generatedContent.core_learning.key_concepts.map((concept, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{concept}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
            <h4 className="font-semibold text-green-800 mb-2">🎯 Estratégia Principal:</h4>
            <p className="text-green-700">{generatedContent.core_learning.main_strategy}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3 text-lg">⚠️ Evitar:</h4>
            <ul className="space-y-2">
              {generatedContent.core_learning.common_pitfalls.map((pitfall, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{pitfall}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'action',
      title: 'PLANO DE AÇÃO',
      icon: Zap,
      duration: 'Execute agora',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      content: (
        <div className="space-y-5">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 text-lg">🚀 Ações Imediatas:</h4>
            <div className="space-y-3">
              {generatedContent.action_toolkit.immediate_actions.map((action, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {idx + 1}
                  </div>
                  <span className="text-gray-700">{action}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
            <h4 className="font-semibold text-purple-800 mb-3">💬 Frases Poderosas:</h4>
            <div className="space-y-2">
              {generatedContent.action_toolkit.key_phrases.map((phrase, idx) => (
                <p key={idx} className="text-purple-700 italic font-medium">"{phrase}"</p>
              ))}
            </div>
          </div>

          <div className="border-t pt-3">
            <h4 className="font-semibold text-gray-900 mb-2">✅ Métricas de Sucesso:</h4>
            <p className="text-gray-700">{generatedContent.action_toolkit.success_metrics}</p>
          </div>
        </div>
      )
    },
    {
      id: 'contingency',
      title: 'PLANO B',
      icon: Shield,
      duration: 'Se necessário',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      content: (
        <div className="space-y-5">
          <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
            <h4 className="font-semibold text-orange-800 mb-3 flex items-center">
              🚨 Se as coisas não saírem como planejado:
            </h4>
            <p className="text-orange-700 leading-relaxed">{generatedContent.contingency_plan.if_goes_wrong}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3 text-lg">🔄 Frases de Recuperação:</h4>
            <div className="space-y-3">
              {generatedContent.contingency_plan.recovery_phrases.map((phrase, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                  <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    💬
                  </div>
                  <span className="text-gray-700 italic">"{phrase}"</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header com info da situação */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white rounded-full shadow-blue border border-blue-soft">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-lg font-semibold text-gray-700">Micro-Learning Personalizado Criado</span>
        </div>
        
        <Card className="glass-modern shadow-blue border-blue-soft p-6">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-sm text-gray-500 font-medium">Situação:</div>
              <p className="font-semibold text-gray-900">{inputData.situation.substring(0, 60)}...</p>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-500 font-medium">Audiência:</div>
              <p className="font-semibold text-blue-600">{inputData.audience}</p>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-500 font-medium">Urgência:</div>
              <p className="font-semibold text-orange-600">{inputData.urgency}</p>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-500 font-medium">Tipo:</div>
              <p className="font-semibold text-purple-600">{inputData.situationType}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Cards de conteúdo */}
      <div className="grid lg:grid-cols-2 gap-8">
        {cards.map((card) => (
          <Card key={card.id} className="glass-modern shadow-blue border-blue-soft overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className={`bg-gradient-to-r ${card.color} p-6 text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <card.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">{card.title}</h3>
                    <p className="text-white/80">{card.duration}</p>
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
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-600 font-medium">Este conteúdo foi útil?</span>
          <Button
            variant={feedback === 'positive' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFeedback('positive')}
            className="space-x-2"
          >
            <ThumbsUp className="w-4 h-4" />
            <span>Sim</span>
          </Button>
          
          <Button
            variant={feedback === 'negative' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFeedback('negative')}
            className="space-x-2"
          >
            <ThumbsDown className="w-4 h-4" />
            <span>Não</span>
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={handleShare}
            className="space-x-2 border-blue-soft hover:bg-blue-50"
          >
            {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copiado!' : 'Compartilhar'}</span>
          </Button>

          <Button
            variant="outline"
            onClick={onGenerateNew}
            className="space-x-2 border-blue-soft hover:bg-blue-50"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Novo Learning</span>
          </Button>

          <Button
            onClick={onBack}
            className="gradient-blue text-white hover:opacity-90"
          >
            ← Nova Situação
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultCards;
