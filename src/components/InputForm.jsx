
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Clock, Users, Target, FileText, Sparkles, Zap, Brain, Rocket } from 'lucide-react';

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
    <div className="max-w-5xl mx-auto space-y-16">
      {/* Hero Section Premium */}
      <div className="text-center space-y-8 animate-fade-in-up">
        <div className="inline-flex items-center space-x-4 px-8 py-4 glass-card rounded-full shadow-premium animate-float">
          <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center shadow-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-800">MicroLearn AI</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
        
        <div className="space-y-6 max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-slate-900 leading-tight">
            Transforme <span className="gradient-primary bg-clip-text text-transparent">Desafios</span><br />
            em <span className="gradient-primary bg-clip-text text-transparent">Oportunidades</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Nossa IA avançada cria estratégias personalizadas para suas situações profissionais mais desafiadoras em questão de segundos
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          {[
            { number: "30s", label: "Preparação Mental", icon: Brain },
            { number: "2min", label: "Conteúdo Core", icon: Target },
            { number: "100%", label: "Personalizado", icon: Sparkles }
          ].map((stat, idx) => (
            <div 
              key={idx} 
              className="glass-card p-6 rounded-2xl hover-lift stagger-animation animate-fade-in-up"
              style={{ '--stagger': idx }}
            >
              <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-slate-900 mb-1">{stat.number}</div>
              <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Formulário Premium */}
      <Card className="glass-card shadow-premium border-premium overflow-hidden animate-scale-in">
        <div className="gradient-hero p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-3">Conte-nos sobre sua situação</h2>
              <p className="text-blue-100 text-lg">Nossa IA criará uma estratégia personalizada para você</p>
            </div>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
              <Rocket className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-10 space-y-10">
          
          {/* Situação */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <label className="text-2xl font-bold text-slate-900 block">
                  Descreva sua situação *
                </label>
                <p className="text-slate-600 text-lg">Seja específico sobre o contexto e desafios que você enfrenta</p>
              </div>
            </div>
            <Textarea
              placeholder="Ex: Preciso apresentar resultados abaixo do esperado para a diretoria e mostrar um plano de recuperação convincente que demonstre competência e liderança..."
              value={formData.situation}
              onChange={(e) => setFormData(prev => ({ ...prev, situation: e.target.value }))}
              className="min-h-[140px] resize-none border-premium bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg rounded-2xl p-6"
              disabled={isLoading}
            />
          </div>

          {/* Grid de seleções */}
          <div className="grid lg:grid-cols-2 gap-10">
            
            {/* Audiência */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <label className="text-2xl font-bold text-slate-900 block">
                    Para quem você vai falar? *
                  </label>
                  <p className="text-slate-600 text-lg">Adaptamos linguagem e abordagem</p>
                </div>
              </div>
              <Select 
                value={formData.audience} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, audience: value }))}
                disabled={isLoading}
              >
                <SelectTrigger className="h-16 border-premium bg-white/80 backdrop-blur-sm hover:border-blue-400 text-lg rounded-2xl">
                  <SelectValue placeholder="Escolha sua audiência..." />
                </SelectTrigger>
                <SelectContent className="bg-white border-premium rounded-2xl shadow-premium">
                  <SelectItem value="CEO">👔 CEO / Diretoria</SelectItem>
                  <SelectItem value="Equipe">👥 Equipe / Colegas</SelectItem>
                  <SelectItem value="Cliente">🤝 Cliente</SelectItem>
                  <SelectItem value="Fornecedor">🏪 Fornecedor</SelectItem>
                  <SelectItem value="Público">🎯 Público Geral</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tipo */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <label className="text-2xl font-bold text-slate-900 block">
                    Tipo de situação *
                  </label>
                  <p className="text-slate-600 text-lg">Define estratégias específicas</p>
                </div>
              </div>
              <Select 
                value={formData.situationType} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, situationType: value }))}
                disabled={isLoading}
              >
                <SelectTrigger className="h-16 border-premium bg-white/80 backdrop-blur-sm hover:border-blue-400 text-lg rounded-2xl">
                  <SelectValue placeholder="Tipo da situação..." />
                </SelectTrigger>
                <SelectContent className="bg-white border-premium rounded-2xl shadow-premium">
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
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <div>
                <label className="text-2xl font-bold text-slate-900 block">
                  Quando você precisa estar pronto?
                </label>
                <p className="text-slate-600 text-lg">Ajustamos a intensidade do conteúdo</p>
              </div>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl space-y-6">
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
                    className={`text-center transition-all duration-300 ${
                      formData.urgency[0] === idx 
                        ? 'text-blue-600 font-bold scale-110 transform' 
                        : 'text-slate-500'
                    }`}
                  >
                    <div className="text-lg">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Botão Submit Premium */}
          <div className="pt-6">
            <Button 
              type="submit" 
              className="w-full h-20 text-2xl font-bold gradient-primary hover:opacity-90 transition-all duration-300 disabled:opacity-50 shadow-premium rounded-2xl group"
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mr-4"></div>
                  Criando seu micro-learning...
                </>
              ) : (
                <>
                  <Sparkles className="w-8 h-8 mr-4 group-hover:rotate-12 transition-transform duration-300" />
                  Gerar Micro-Learning Personalizado
                  <Zap className="w-8 h-8 ml-4 group-hover:scale-110 transition-transform duration-300" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default InputForm;
