
export const storage = {
  // Salvar micro-learning gerado
  saveLearning: (data) => {
    try {
      const saved = JSON.parse(localStorage.getItem('microLearnings') || '[]');
      const newLearning = {
        id: Date.now(),
        ...data,
        createdAt: new Date().toISOString()
      };
      saved.unshift(newLearning); // Adiciona no início
      localStorage.setItem('microLearnings', JSON.stringify(saved));
      return newLearning;
    } catch (error) {
      console.error('Erro ao salvar learning:', error);
      return null;
    }
  },

  // Recuperar histórico
  getLearnings: () => {
    try {
      return JSON.parse(localStorage.getItem('microLearnings') || '[]');
    } catch (error) {
      console.error('Erro ao recuperar learnings:', error);
      return [];
    }
  },

  // Deletar learning específico
  deleteLearning: (id) => {
    try {
      const saved = JSON.parse(localStorage.getItem('microLearnings') || '[]');
      const filtered = saved.filter(learning => learning.id !== id);
      localStorage.setItem('microLearnings', JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Erro ao deletar learning:', error);
      return false;
    }
  },

  // Salvar feedback
  saveFeedback: (learningId, feedback) => {
    try {
      const saved = JSON.parse(localStorage.getItem('microLearnings') || '[]');
      const updated = saved.map(learning => 
        learning.id === learningId 
          ? { ...learning, feedback }
          : learning
      );
      localStorage.setItem('microLearnings', JSON.stringify(updated));
      return true;
    } catch (error) {
      console.error('Erro ao salvar feedback:', error);
      return false;
    }
  },

  // Formatar texto para compartilhamento
  formatForSharing: (inputData, generatedContent) => {
    return `🧠 MICRO-LEARNING PERSONALIZADO

📋 SITUAÇÃO: ${inputData.situation}
👥 AUDIÊNCIA: ${inputData.audience}
⏰ URGÊNCIA: ${inputData.urgency}
🎯 TIPO: ${inputData.situationType}

🧠 MINDSET PREP (30s)
${generatedContent.mindset_prep.content}

💨 RESPIRAÇÃO: ${generatedContent.mindset_prep.breathing_technique}

📚 CORE LEARNING (2-3min)
CONCEITOS-CHAVE:
${generatedContent.core_learning.key_concepts.map(concept => `• ${concept}`).join('\n')}

ESTRATÉGIA: ${generatedContent.core_learning.main_strategy}

EVITAR:
${generatedContent.core_learning.common_pitfalls.map(pitfall => `• ${pitfall}`).join('\n')}

⚡ ACTION TOOLKIT
AÇÕES IMEDIATAS:
${generatedContent.action_toolkit.immediate_actions.map(action => `• ${action}`).join('\n')}

FRASES PODEROSAS:
${generatedContent.action_toolkit.key_phrases.map(phrase => `• "${phrase}"`).join('\n')}

SUCESSO: ${generatedContent.action_toolkit.success_metrics}

🛡️ PLANO B
SE DER ERRADO: ${generatedContent.contingency_plan.if_goes_wrong}

RECUPERAÇÃO:
${generatedContent.contingency_plan.recovery_phrases.map(phrase => `• "${phrase}"`).join('\n')}

---
Gerado por MicroLearn AI`;
  }
};
