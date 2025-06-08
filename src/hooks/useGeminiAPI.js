
import { useState } from 'react';

export const useGeminiAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generatePrompt = (input) => `
CONTEXTO: ${input.situation}
AUDIÊNCIA: ${input.audience}
URGÊNCIA: ${input.urgency}
TIPO: ${input.situationType}

Gere um micro-learning estruturado em JSON:
{
  "mindset_prep": {
    "content": "Preparação mental específica para esta situação",
    "breathing_technique": "Técnica de respiração aplicável"
  },
  "core_learning": {
    "key_concepts": ["conceito1", "conceito2", "conceito3"],
    "main_strategy": "Estratégia principal para esta situação",
    "common_pitfalls": ["erro comum 1", "erro comum 2"]
  },
  "action_toolkit": {
    "immediate_actions": ["ação 1", "ação 2", "ação 3"],
    "key_phrases": ["frase poderosa 1", "frase poderosa 2"],
    "success_metrics": "Como saber se deu certo"
  },
  "contingency_plan": {
    "if_goes_wrong": "O que fazer se der errado",
    "recovery_phrases": ["frase de recuperação 1", "frase de recuperação 2"]
  }
}

Seja específico, prático e acionável. Use linguagem direta adaptada para a audiência.`;

  // Simulação da API do Gemini com dados realistas
  const generateMockResponse = (input) => {
    const responses = {
      CEO: {
        mindset_prep: {
          content: "Respire fundo e lembre-se: CEOs valorizam transparência e soluções. Vá direto ao ponto, assuma responsabilidade e apresente um plano de ação claro.",
          breathing_technique: "4-7-8: Inspire por 4s, segure por 7s, expire por 8s. Repita 3 vezes antes de entrar."
        },
        core_learning: {
          key_concepts: [
            "Transparência gera confiança",
            "Problemas são oportunidades de melhoria",
            "Dados vencem opiniões"
          ],
          main_strategy: "Estruture a apresentação em: Situação atual > Impacto > Plano de ação > Métricas de acompanhamento",
          common_pitfalls: [
            "Esconder informações importantes",
            "Não trazer soluções, apenas problemas"
          ]
        },
        action_toolkit: {
          immediate_actions: [
            "Prepare 3 slides: problema, solução, próximos passos",
            "Liste 2 cenários: realista e conservador",
            "Tenha dados de backup prontos"
          ],
          key_phrases: [
            "Identificamos uma oportunidade de melhoria...",
            "Meu plano para resolver isso é..."
          ],
          success_metrics: "CEO faz perguntas construtivas e aprova próximos passos"
        },
        contingency_plan: {
          if_goes_wrong: "Se o CEO reagir mal, reconheça a preocupação e volte ao plano de ação",
          recovery_phrases: [
            "Entendo sua preocupação, vamos focar na solução...",
            "Você está certo, preciso ser mais específico sobre..."
          ]
        }
      },
      Cliente: {
        mindset_prep: {
          content: "Clientes querem se sentir ouvidos e valorizados. Sua postura deve transmitir confiança e empoderamento, focando no valor que você entrega.",
          breathing_technique: "Respiração profunda com sorriso: inspire lentamente pensando em algo positivo, expire mantendo expressão amigável."
        },
        core_learning: {
          key_concepts: [
            "Cliente é o protagonista da sua própria história",
            "Escute antes de vender",
            "Benefícios vencem características"
          ],
          main_strategy: "Use a técnica SPIN: Situação > Problema > Implicação > Necessidade de solução",
          common_pitfalls: [
            "Falar mais do produto que dos benefícios",
            "Não entender a real dor do cliente"
          ]
        },
        action_toolkit: {
          immediate_actions: [
            "Faça 3 perguntas abertas sobre os desafios atuais",
            "Conecte cada feature a um benefício específico",
            "Prepare 2 estudos de caso similares"
          ],
          key_phrases: [
            "Como isso impacta o seu dia a dia?",
            "Imagina se você pudesse..."
          ],
          success_metrics: "Cliente faz perguntas sobre implementação e próximos passos"
        },
        contingency_plan: {
          if_goes_wrong: "Se cliente hesitar, volte às necessidades e reformule a proposta de valor",
          recovery_phrases: [
            "Deixe-me entender melhor o que é mais importante para você...",
            "Talvez eu não tenha sido claro sobre..."
          ]
        }
      }
    };

    return responses[input.audience] || responses.CEO;
  };

  const generateContent = async (inputData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulação de delay da API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Em produção, aqui seria a chamada real para a API
      // const response = await fetch(GEMINI_URL, { ... });
      
      const mockData = generateMockResponse(inputData);
      console.log('Generated content:', mockData);
      
      setIsLoading(false);
      return mockData;
    } catch (err) {
      setError('Erro ao gerar conteúdo. Tente novamente.');
      setIsLoading(false);
      throw err;
    }
  };

  return { generateContent, isLoading, error };
};
