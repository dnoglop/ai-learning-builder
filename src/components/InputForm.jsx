
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Clock, Users, Target, FileText } from 'lucide-react';

const InputForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    situation: '',
    audience: '',
    urgency: [2], // Index do slider
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
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/30 backdrop-blur rounded-full border border-white/20">
          <span className="text-2xl">🧠</span>
          <span className="text-sm font-medium text-gray-700">MicroLearn AI</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Micro-Learning Personalizado
        </h1>
        <p className="text-lg text-gray-600 max-w-lg mx-auto">
          Descreva sua situação e receba conteúdo de aprendizado sob medida em segundos
        </p>
      </div>

      {/* Formulário */}
      <Card className="glass-effect border-white/20 p-8 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Situação */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-purple-600" />
              <label className="text-sm font-medium text-gray-700">
                Situação que você vai enfrentar *
              </label>
            </div>
            <Textarea
              placeholder="Ex: Preciso apresentar resultados ruins para o CEO amanhã..."
              value={formData.situation}
              onChange={(e) => setFormData(prev => ({ ...prev, situation: e.target.value }))}
              className="min-h-[100px] resize-none border-white/30 bg-white/50 focus:bg-white/70 transition-all"
              disabled={isLoading}
            />
          </div>

          {/* Grid de seleções */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Audiência */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <label className="text-sm font-medium text-gray-700">
                  Audiência *
                </label>
              </div>
              <Select 
                value={formData.audience} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, audience: value }))}
                disabled={isLoading}
              >
                <SelectTrigger className="border-white/30 bg-white/50 hover:bg-white/70">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent className="bg-white border-white/30">
                  <SelectItem value="CEO">👔 CEO / Diretoria</SelectItem>
                  <SelectItem value="Equipe">👥 Equipe / Colegas</SelectItem>
                  <SelectItem value="Cliente">🤝 Cliente</SelectItem>
                  <SelectItem value="Fornecedor">🏪 Fornecedor</SelectItem>
                  <SelectItem value="Público">🎯 Público Geral</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tipo */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-green-600" />
                <label className="text-sm font-medium text-gray-700">
                  Tipo de Situação *
                </label>
              </div>
              <Select 
                value={formData.situationType} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, situationType: value }))}
                disabled={isLoading}
              >
                <SelectTrigger className="border-white/30 bg-white/50 hover:bg-white/70">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent className="bg-white border-white/30">
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
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <label className="text-sm font-medium text-gray-700">
                Urgência
              </label>
            </div>
            <div className="space-y-3">
              <Slider
                value={formData.urgency}
                onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}
                max={3}
                step={1}
                className="w-full"
                disabled={isLoading}
              />
              <div className="flex justify-between text-xs text-gray-500">
                {urgencyLabels.map((label, idx) => (
                  <span 
                    key={idx} 
                    className={`transition-colors ${
                      formData.urgency[0] === idx ? 'text-purple-600 font-medium' : ''
                    }`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Botão Submit */}
          <Button 
            type="submit" 
            className="w-full h-14 text-lg font-medium gradient-primary hover:opacity-90 transition-all disabled:opacity-50"
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Gerando...
              </>
            ) : (
              <>
                <span className="mr-2">✨</span>
                Gerar Micro-Learning
              </>
            )}
          </Button>
        </form>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="space-y-1">
          <div className="text-2xl font-bold text-purple-600">30s</div>
          <div className="text-xs text-gray-500">Mindset Prep</div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-blue-600">2-3min</div>
          <div className="text-xs text-gray-500">Core Learning</div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-green-600">100%</div>
          <div className="text-xs text-gray-500">Personalizado</div>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
