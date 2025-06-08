
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Clock, Users, Target, FileText, Sparkles } from 'lucide-react';

const InputForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    situation: '',
    audience: '',
    urgency: [2],
    situationType: ''
  });

  const urgencyOptions = ['1 hora', 'Hoje', 'Esta semana', 'Próximo mês'];
  const urgencyLabels = ['🔥 Urgente', '⚡ Hoje', '📅 Semana', '🗓️ Mês'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.situation || !formData.audience || !formData.situationType) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const submitData = {
      ...formData,
      urgency: urgencyOptions[formData.urgency[0]]
    };
    
    onSubmit(submitData);
  };

  const isFormValid = formData.situation && formData.audience && formData.situationType;

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Hero Header */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white rounded-full shadow-blue border border-blue-soft">
          <div className="w-8 h-8 rounded-full gradient-blue flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-blue-700">MicroLearn AI</span>
        </div>
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Aprenda <span className="text-blue-600">Inteligente</span><br />
            Execute com <span className="text-blue-600">Confiança</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Transforme situações desafiadoras em oportunidades de crescimento com conteúdo personalizado em segundos
          </p>
        </div>
      </div>

      {/* Formulário Principal */}
      <Card className="glass-modern shadow-blue border-blue-soft overflow-hidden">
        <div className="gradient-blue p-6">
          <h2 className="text-2xl font-bold text-white mb-2">Conte-nos sobre sua situação</h2>
          <p className="text-blue-100">Personalizaremos o conteúdo especificamente para você</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          {/* Situação */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <label className="text-lg font-semibold text-gray-900">
                  Descreva sua situação *
                </label>
                <p className="text-sm text-gray-600">Seja específico sobre o contexto e desafios</p>
              </div>
            </div>
            <Textarea
              placeholder="Ex: Preciso apresentar resultados abaixo do esperado para a diretoria e mostrar um plano de recuperação convincente..."
              value={formData.situation}
              onChange={(e) => setFormData(prev => ({ ...prev, situation: e.target.value }))}
              className="min-h-[120px] resize-none border-blue-soft bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
              disabled={isLoading}
            />
          </div>

          {/* Grid de seleções */}
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Audiência */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <label className="text-lg font-semibold text-gray-900">
                    Para quem você vai falar? *
                  </label>
                  <p className="text-sm text-gray-600">Adapta linguagem e abordagem</p>
                </div>
              </div>
              <Select 
                value={formData.audience} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, audience: value }))}
                disabled={isLoading}
              >
                <SelectTrigger className="h-12 border-blue-soft bg-white hover:border-blue-400 text-base">
                  <SelectValue placeholder="Escolha sua audiência..." />
                </SelectTrigger>
                <SelectContent className="bg-white border-blue-soft">
                  <SelectItem value="CEO">👔 CEO / Diretoria</SelectItem>
                  <SelectItem value="Equipe">👥 Equipe / Colegas</SelectItem>
                  <SelectItem value="Cliente">🤝 Cliente</SelectItem>
                  <SelectItem value="Fornecedor">🏪 Fornecedor</SelectItem>
                  <SelectItem value="Público">🎯 Público Geral</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tipo */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <label className="text-lg font-semibold text-gray-900">
                    Tipo de situação *
                  </label>
                  <p className="text-sm text-gray-600">Define estratégias específicas</p>
                </div>
              </div>
              <Select 
                value={formData.situationType} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, situationType: value }))}
                disabled={isLoading}
              >
                <SelectTrigger className="h-12 border-blue-soft bg-white hover:border-blue-400 text-base">
                  <SelectValue placeholder="Tipo da situação..." />
                </SelectTrigger>
                <SelectContent className="bg-white border-blue-soft">
                  <SelectItem value="Apresentação">📊 Apresentação</SelectItem>
                  <SelectItem value="Negociação">💼 Negociação</SelectItem>
                  <SelectItem value="Feedback">💬 Feedback</SelectItem>
                  <SelectItem value="Conflito">⚔️ Resolução de Conflito</SelectItem>
                  <SelectItem value="Decisão">⚖️ Tomada de Decisão</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Urgência */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <label className="text-lg font-semibold text-gray-900">
                  Quando você precisa estar pronto?
                </label>
                <p className="text-sm text-gray-600">Ajusta intensidade do conteúdo</p>
              </div>
            </div>
            <div className="space-y-4">
              <Slider
                value={formData.urgency}
                onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}
                max={3}
                step={1}
                className="w-full"
                disabled={isLoading}
              />
              <div className="flex justify-between">
                {urgencyLabels.map((label, idx) => (
                  <div 
                    key={idx} 
                    className={`text-center transition-all duration-200 ${
                      formData.urgency[0] === idx 
                        ? 'text-blue-600 font-semibold scale-110' 
                        : 'text-gray-500'
                    }`}
                  >
                    <div className="text-sm">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Botão Submit */}
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full h-16 text-xl font-semibold gradient-blue hover:opacity-90 transition-all duration-200 disabled:opacity-50 shadow-blue"
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Criando seu micro-learning...
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6 mr-3" />
                  Gerar Micro-Learning Personalizado
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>

      {/* Stats modernos */}
      <div className="grid grid-cols-3 gap-6">
        <div className="text-center p-6 bg-white rounded-2xl shadow-blue border border-blue-soft">
          <div className="text-3xl font-bold text-blue-600 mb-2">30s</div>
          <div className="text-sm text-gray-600 font-medium">Preparação Mental</div>
        </div>
        <div className="text-center p-6 bg-white rounded-2xl shadow-blue border border-blue-soft">
          <div className="text-3xl font-bold text-blue-600 mb-2">2-3min</div>
          <div className="text-sm text-gray-600 font-medium">Aprendizado Core</div>
        </div>
        <div className="text-center p-6 bg-white rounded-2xl shadow-blue border border-blue-soft">
          <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
          <div className="text-sm text-gray-600 font-medium">Personalizado</div>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
