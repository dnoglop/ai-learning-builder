
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Eye, Calendar, Users, Target, Clock } from 'lucide-react';
import { storage } from '../utils/storage';

const HistoryModal = ({ isOpen, onClose, onLoadLearning }) => {
  const [learnings, setLearnings] = useState([]);
  const [selectedLearning, setSelectedLearning] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const saved = storage.getLearnings();
      setLearnings(saved);
    }
  }, [isOpen]);

  const handleDelete = (learningId) => {
    if (confirm('Tem certeza que deseja deletar este micro-learning?')) {
      storage.deleteLearning(learningId);
      setLearnings(prev => prev.filter(l => l.id !== learningId));
    }
  };

  const handleView = (learning) => {
    setSelectedLearning(learning);
  };

  const handleLoad = (learning) => {
    onLoadLearning(learning);
    onClose();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAudienceIcon = (audience) => {
    const icons = {
      CEO: '👔',
      Equipe: '👥',
      Cliente: '🤝',
      Fornecedor: '🏪',
      Público: '🎯'
    };
    return icons[audience] || '👤';
  };

  if (selectedLearning) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Detalhes do Micro-Learning</DialogTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedLearning(null)}
              >
                ← Voltar à lista
              </Button>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Info da situação */}
            <Card className="p-4 bg-gray-50">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    Situação:
                  </span>
                  <p className="font-medium mt-1">{selectedLearning.inputData.situation}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <Badge variant="outline">{getAudienceIcon(selectedLearning.inputData.audience)} {selectedLearning.inputData.audience}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <Badge variant="outline">{selectedLearning.inputData.urgency}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-gray-500" />
                    <Badge variant="outline">{selectedLearning.inputData.situationType}</Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Conteúdo gerado - versão resumida */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4">
                <h4 className="font-medium mb-2 text-purple-700">🧠 Mindset Prep</h4>
                <p className="text-sm text-gray-600 mb-2">{selectedLearning.generatedContent.mindset_prep.content}</p>
                <div className="text-xs text-purple-600 bg-purple-50 p-2 rounded">
                  {selectedLearning.generatedContent.mindset_prep.breathing_technique}
                </div>
              </Card>

              <Card className="p-4">
                <h4 className="font-medium mb-2 text-blue-700">📚 Core Learning</h4>
                <ul className="text-sm space-y-1">
                  {selectedLearning.generatedContent.core_learning.key_concepts.map((concept, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-blue-500">•</span>
                      <span className="text-gray-600">{concept}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-4">
                <h4 className="font-medium mb-2 text-green-700">⚡ Action Toolkit</h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Ações:</p>
                    <ul className="text-sm space-y-1">
                      {selectedLearning.generatedContent.action_toolkit.immediate_actions.slice(0, 2).map((action, idx) => (
                        <li key={idx} className="text-gray-600">{idx + 1}. {action}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h4 className="font-medium mb-2 text-orange-700">🛡️ Plano B</h4>
                <p className="text-sm text-gray-600">{selectedLearning.generatedContent.contingency_plan.if_goes_wrong}</p>
              </Card>
            </div>

            {/* Ações */}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setSelectedLearning(null)}>
                Fechar
              </Button>
              <Button onClick={() => handleLoad(selectedLearning)}>
                Usar Este Learning
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Histórico de Micro-Learnings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {learnings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Nenhum micro-learning salvo ainda.</p>
              <p className="text-sm">Gere seu primeiro conteúdo para começar!</p>
            </div>
          ) : (
            learnings.map((learning) => (
              <Card key={learning.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(learning.createdAt)}</span>
                      {learning.feedback && (
                        <Badge variant={learning.feedback === 'positive' ? 'default' : 'destructive'} className="text-xs">
                          {learning.feedback === 'positive' ? '👍 Útil' : '👎 Não útil'}
                        </Badge>
                      )}
                    </div>
                    
                    <p className="font-medium text-gray-800 line-clamp-2">
                      {learning.inputData.situation}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">
                        {getAudienceIcon(learning.inputData.audience)} {learning.inputData.audience}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {learning.inputData.urgency}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {learning.inputData.situationType}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleView(learning)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(learning.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HistoryModal;
