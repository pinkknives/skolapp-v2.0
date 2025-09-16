import { useState } from 'react';

export interface AIGeneratedQuestion {
  id: string;
  text: string;
  correctAnswer: string;
  options: string[];
  source?: string;
}

export interface AIQuizDraft {
  id: string;
  title: string;
  topic: string;
  questions: AIGeneratedQuestion[];
  isAIDraft: true;
  generatedAt: string;
  sources: string[];
}

interface GenerateQuizOptions {
  topic: string;
  questionCount?: number;
}

interface AIQuizError {
  message: string;
  code: 'NETWORK_ERROR' | 'INVALID_INPUT' | 'API_ERROR' | 'QUOTA_EXCEEDED';
}

interface UseAIQuizGenerationResult {
  generateQuiz: (options: GenerateQuizOptions) => Promise<AIQuizDraft>;
  loading: boolean;
  error: AIQuizError | null;
}

// Mock AI service - in production this would call OpenAI or similar
async function mockAIService(topic: string, count: number = 5): Promise<{
  questions: AIGeneratedQuestion[];
  sources: string[];
}> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock questions based on topic
  const baseQuestions = [
    {
      template: "Vad hände under {topic}?",
      correctAnswer: "Detta är ett AI-genererat exempel svar om {topic}",
      options: [
        "Detta är ett AI-genererat exempel svar om {topic}",
        "Detta är ett felaktigt alternativ A",
        "Detta är ett felaktigt alternativ B", 
        "Detta är ett felaktigt alternativ C"
      ]
    },
    {
      template: "När ägde {topic} rum?",
      correctAnswer: "Detta är tidpunkt för {topic}",
      options: [
        "Detta är tidpunkt för {topic}",
        "Felaktigt datum A",
        "Felaktigt datum B",
        "Felaktigt datum C"
      ]
    },
    {
      template: "Vilka var huvudpersonerna inom {topic}?",
      correctAnswer: "Viktiga personer inom {topic}",
      options: [
        "Viktiga personer inom {topic}",
        "Irrelevanta personer A",
        "Irrelevanta personer B", 
        "Irrelevanta personer C"
      ]
    },
    {
      template: "Vilka konsekvenser hade {topic}?",
      correctAnswer: "Långsiktiga effekter av {topic}",
      options: [
        "Långsiktiga effekter av {topic}",
        "Felaktiga konsekvenser A",
        "Felaktiga konsekvenser B",
        "Felaktiga konsekvenser C"
      ]
    },
    {
      template: "Var ägde {topic} rum?",
      correctAnswer: "Platser relevanta för {topic}",
      options: [
        "Platser relevanta för {topic}",
        "Irrelevant plats A",
        "Irrelevant plats B",
        "Irrelevant plats C"
      ]
    }
  ];

  const questions: AIGeneratedQuestion[] = [];
  for (let i = 0; i < Math.min(count, baseQuestions.length); i++) {
    const template = baseQuestions[i];
    questions.push({
      id: `ai-q-${Date.now()}-${i}`,
      text: template.template.replace(/\{topic\}/g, topic),
      correctAnswer: template.correctAnswer.replace(/\{topic\}/g, topic),
      options: template.options.map(opt => opt.replace(/\{topic\}/g, topic)),
      source: 'AI-genererat från säkra kunskapsbaser'
    });
  }

  return {
    questions,
    sources: [
      'Skolverket kunskapsbank',
      'Nationalencyklopedin (begränsad)',
      'Svenska läroplaner',
      'AI-baserad syntes'
    ]
  };
}

export function useAIQuizGeneration(): UseAIQuizGenerationResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AIQuizError | null>(null);

  const generateQuiz = async (options: GenerateQuizOptions): Promise<AIQuizDraft> => {
    setLoading(true);
    setError(null);

    try {
      // Validate input
      if (!options.topic.trim()) {
        throw { 
          message: 'Ämne/tema krävs för att generera quiz',
          code: 'INVALID_INPUT' as const
        };
      }

      if (options.topic.length < 3) {
        throw {
          message: 'Ämne/tema måste vara minst 3 tecken långt',
          code: 'INVALID_INPUT' as const
        };
      }

      const questionCount = options.questionCount || 5;
      const result = await mockAIService(options.topic, questionCount);

      const draft: AIQuizDraft = {
        id: `ai-draft-${Date.now()}`,
        title: `AI-utkast: ${options.topic}`,
        topic: options.topic,
        questions: result.questions,
        isAIDraft: true,
        generatedAt: new Date().toISOString(),
        sources: result.sources
      };

      return draft;
    } catch (err: any) {
      const aiError: AIQuizError = err.code ? err : {
        message: 'Kunde inte generera quiz. Försök igen senare.',
        code: 'API_ERROR' as const
      };
      
      setError(aiError);
      throw aiError;
    } finally {
      setLoading(false);
    }
  };

  return {
    generateQuiz,
    loading,
    error
  };
}