import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import type { LocalQuestion, QuestionType, AnswerOption } from '../hooks/useLocalQuizzes';

interface QuizCreatorProps {
  onSave: (title: string, questions: LocalQuestion[], description?: string) => { quiz?: any; error?: string };
  onCancel?: () => void;
}

export const QuizCreator: React.FC<QuizCreatorProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<LocalQuestion[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const addQuestion = () => {
    const newQuestion: LocalQuestion = {
      id: uuidv4(),
      text: '',
      type: 'mcq',
      timeLimit: 30,
      options: [
        { id: uuidv4(), text: '', isCorrect: true },
        { id: uuidv4(), text: '', isCorrect: false }
      ]
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (index: number, updates: Partial<LocalQuestion>) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], ...updates };
    setQuestions(updated);
  };

  const deleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestionType = (index: number, type: QuestionType) => {
    const updated = [...questions];
    const question = updated[index];
    
    if (type === 'mcq') {
      question.options = [
        { id: uuidv4(), text: '', isCorrect: true },
        { id: uuidv4(), text: '', isCorrect: false }
      ];
      question.correctAnswer = undefined;
    } else if (type === 'true-false') {
      question.options = [
        { id: uuidv4(), text: 'Sant', isCorrect: true },
        { id: uuidv4(), text: 'Falskt', isCorrect: false }
      ];
      question.correctAnswer = undefined;
    } else if (type === 'short-text') {
      question.options = undefined;
      question.correctAnswer = '';
    }
    
    question.type = type;
    setQuestions(updated);
  };

  const updateOption = (questionIndex: number, optionIndex: number, updates: Partial<AnswerOption>) => {
    const updated = [...questions];
    const question = updated[questionIndex];
    if (question.options) {
      question.options[optionIndex] = { ...question.options[optionIndex], ...updates };
      setQuestions(updated);
    }
  };

  const addOption = (questionIndex: number) => {
    const updated = [...questions];
    const question = updated[questionIndex];
    if (question.options) {
      question.options.push({ id: uuidv4(), text: '', isCorrect: false });
      setQuestions(updated);
    }
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const updated = [...questions];
    const question = updated[questionIndex];
    if (question.options && question.options.length > 2) {
      question.options.splice(optionIndex, 1);
      setQuestions(updated);
    }
  };

  const setCorrectOption = (questionIndex: number, optionIndex: number) => {
    const updated = [...questions];
    const question = updated[questionIndex];
    if (question.options) {
      question.options.forEach((opt, i) => {
        opt.isCorrect = i === optionIndex;
      });
      setQuestions(updated);
    }
  };

  const validateForm = () => {
    const errors: string[] = [];
    if (!title.trim()) errors.push('Titel krävs');
    if (title.length > 120) errors.push('Titel får max vara 120 tecken');
    if (!questions.length) errors.push('Minst en fråga krävs');
    
    questions.forEach((question, index) => {
      if (!question.text.trim()) {
        errors.push(`Fråga ${index + 1}: Text krävs`);
      }
      
      if (question.type === 'mcq') {
        if (!question.options || question.options.length < 2) {
          errors.push(`Fråga ${index + 1}: MCQ måste ha minst 2 svarsalternativ`);
        } else if (!question.options.some(opt => opt.isCorrect)) {
          errors.push(`Fråga ${index + 1}: MCQ måste ha ett korrekt svar`);
        } else if (question.options.some(opt => !opt.text.trim())) {
          errors.push(`Fråga ${index + 1}: Alla svarsalternativ måste ha text`);
        }
      }
      
      if (question.type === 'true-false') {
        if (!question.options || !question.options.some(opt => opt.isCorrect)) {
          errors.push(`Fråga ${index + 1}: Sant/falskt måste ha ett korrekt svar`);
        }
      }
      
      if (question.type === 'short-text') {
        if (!question.correctAnswer?.trim()) {
          errors.push(`Fråga ${index + 1}: Kort text måste ha ett korrekt svar`);
        }
      }
      
      if (question.timeLimit && (question.timeLimit < 5 || question.timeLimit > 300)) {
        errors.push(`Fråga ${index + 1}: Tidsgräns måste vara mellan 5-300 sekunder`);
      }
    });
    
    return errors;
  };

  const handleSave = () => {
    const validationErrors = validateForm();
    setErrors(validationErrors);
    
    if (validationErrors.length > 0) return;
    
    setSaving(true);
    const result = onSave(title, questions, description);
    if (result.error) {
      setErrors([result.error]);
    } else {
      // Reset form after successful save
      setTitle('');
      setDescription('');
      setQuestions([]);
      setShowPreview(false);
    }
    setSaving(false);
  };

  if (showPreview) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Card title="Förhandsvisning av quiz">
          <div style={{ marginBottom: '1rem' }}>
            <h2>{title}</h2>
            {description && <p style={{ color: 'var(--fg)', opacity: 0.8 }}>{description}</p>}
          </div>
          
          {questions.map((question, index) => (
            <div key={question.id} style={{ marginBottom: '1rem' }}>
              <Card>
                <div>
                  <h3>Fråga {index + 1}</h3>
                  <p><strong>{question.text}</strong></p>
                  
                  {question.timeLimit && (
                    <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                      Tidsgräns: {question.timeLimit} sekunder
                    </p>
                  )}
                  
                  {question.type === 'mcq' && question.options && (
                    <div>
                      <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Flerval:</p>
                      <ul>
                        {question.options.map((option, optIndex) => (
                          <li key={option.id} style={{ 
                            color: option.isCorrect ? 'var(--primary)' : 'inherit',
                            fontWeight: option.isCorrect ? 'bold' : 'normal'
                          }}>
                            {option.text} {option.isCorrect && '(Korrekt)'}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {question.type === 'true-false' && question.options && (
                    <div>
                      <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Sant/Falskt:</p>
                      <ul>
                        {question.options.map((option, optIndex) => (
                          <li key={option.id} style={{ 
                            color: option.isCorrect ? 'var(--primary)' : 'inherit',
                            fontWeight: option.isCorrect ? 'bold' : 'normal'
                          }}>
                            {option.text} {option.isCorrect && '(Korrekt)'}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {question.type === 'short-text' && (
                    <div>
                      <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Kort text svar:</p>
                      <p style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                        {question.correctAnswer}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          ))}
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <Button 
              variant="primary" 
              onClick={handleSave}
              loading={saving}
            >
              {saving ? 'Sparar...' : 'Spara quiz'}
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => setShowPreview(false)}
            >
              Redigera
            </Button>
            {onCancel && (
              <Button variant="ghost" onClick={onCancel}>
                Avbryt
              </Button>
            )}
          </div>
          
          {errors.length > 0 && (
            <ul style={{ color: 'red', marginTop: '1rem' }}>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Card title="Skapa nytt quiz">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Basic Quiz Info */}
          <div>
            <label htmlFor="quiz-title" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Titel *
            </label>
            <input
              id="quiz-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="T.ex. Glosor vecka 40"
              maxLength={120}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
              aria-required="true"
            />
          </div>
          
          <div>
            <label htmlFor="quiz-description" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Beskrivning (valfri)
            </label>
            <textarea
              id="quiz-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Beskriv vad quizet handlar om..."
              rows={2}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                fontSize: '1rem',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Questions */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3>Frågor ({questions.length})</h3>
              <Button variant="secondary" onClick={addQuestion}>
                + Lägg till fråga
              </Button>
            </div>
            
            {questions.map((question, questionIndex) => (
              <div key={question.id} style={{ marginBottom: '1rem' }}>
                <Card>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4>Fråga {questionIndex + 1}</h4>
                      <Button 
                        variant="danger" 
                        onClick={() => deleteQuestion(questionIndex)}
                        style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}
                      >
                        Ta bort
                      </Button>
                    </div>
                  
                  <div>
                    <label htmlFor={`question-text-${question.id}`} style={{ display: 'block', marginBottom: '0.5rem' }}>
                      Frågetext *
                    </label>
                    <input
                      id={`question-text-${question.id}`}
                      type="text"
                      value={question.text}
                      onChange={(e) => updateQuestion(questionIndex, { text: e.target.value })}
                      placeholder="Skriv din fråga här..."
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '1px solid var(--border)',
                        borderRadius: '4px'
                      }}
                      aria-required="true"
                    />
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div>
                      <label htmlFor={`question-type-${question.id}`} style={{ display: 'block', marginBottom: '0.5rem' }}>
                        Frågetyp
                      </label>
                      <select
                        id={`question-type-${question.id}`}
                        value={question.type}
                        onChange={(e) => updateQuestionType(questionIndex, e.target.value as QuestionType)}
                        style={{
                          padding: '0.5rem',
                          border: '1px solid var(--border)',
                          borderRadius: '4px'
                        }}
                      >
                        <option value="mcq">Flerval (MCQ)</option>
                        <option value="true-false">Sant/Falskt</option>
                        <option value="short-text">Kort text</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor={`time-limit-${question.id}`} style={{ display: 'block', marginBottom: '0.5rem' }}>
                        Tidsgräns (sek)
                      </label>
                      <input
                        id={`time-limit-${question.id}`}
                        type="number"
                        min={5}
                        max={300}
                        value={question.timeLimit || ''}
                        onChange={(e) => updateQuestion(questionIndex, { 
                          timeLimit: e.target.value ? parseInt(e.target.value) : undefined 
                        })}
                        placeholder="30"
                        style={{
                          width: '80px',
                          padding: '0.5rem',
                          border: '1px solid var(--border)',
                          borderRadius: '4px'
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* MCQ Options */}
                  {question.type === 'mcq' && question.options && (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <label style={{ fontWeight: 'bold' }}>Svarsalternativ</label>
                        <Button 
                          variant="ghost"
                          onClick={() => addOption(questionIndex)}
                          style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}
                        >
                          + Alternativ
                        </Button>
                      </div>
                      {question.options.map((option, optionIndex) => (
                        <div key={option.id} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                          <input
                            type="radio"
                            name={`correct-${question.id}`}
                            checked={option.isCorrect}
                            onChange={() => setCorrectOption(questionIndex, optionIndex)}
                            title="Korrekt svar"
                          />
                          <input
                            type="text"
                            value={option.text}
                            onChange={(e) => updateOption(questionIndex, optionIndex, { text: e.target.value })}
                            placeholder={`Alternativ ${optionIndex + 1}`}
                            style={{
                              flex: 1,
                              padding: '0.5rem',
                              border: '1px solid var(--border)',
                              borderRadius: '4px'
                            }}
                          />
                          {question.options && question.options.length > 2 && (
                            <Button 
                              variant="danger"
                              onClick={() => removeOption(questionIndex, optionIndex)}
                              style={{ fontSize: '0.7rem', padding: '0.25rem' }}
                            >
                              ×
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* True/False Options */}
                  {question.type === 'true-false' && question.options && (
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        Korrekt svar
                      </label>
                      {question.options.map((option, optionIndex) => (
                        <div key={option.id} style={{ marginBottom: '0.5rem' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                              type="radio"
                              name={`correct-${question.id}`}
                              checked={option.isCorrect}
                              onChange={() => setCorrectOption(questionIndex, optionIndex)}
                            />
                            {option.text}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Short Text Answer */}
                  {question.type === 'short-text' && (
                    <div>
                      <label htmlFor={`correct-answer-${question.id}`} style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        Korrekt svar *
                      </label>
                      <input
                        id={`correct-answer-${question.id}`}
                        type="text"
                        value={question.correctAnswer || ''}
                        onChange={(e) => updateQuestion(questionIndex, { correctAnswer: e.target.value })}
                        placeholder="Skriv det korrekta svaret..."
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          border: '1px solid var(--border)',
                          borderRadius: '4px'
                        }}
                        aria-required="true"
                      />
                    </div>
                  )}
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Button 
              variant="secondary" 
              onClick={() => setShowPreview(true)}
              disabled={questions.length === 0 || !title.trim()}
            >
              Förhandsgranska
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSave}
              loading={saving}
              disabled={questions.length === 0 || !title.trim()}
            >
              {saving ? 'Sparar...' : 'Spara quiz'}
            </Button>
            {onCancel && (
              <Button variant="ghost" onClick={onCancel}>
                Avbryt
              </Button>
            )}
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <ul style={{ color: 'red', margin: 0, paddingLeft: '1.2rem' }} aria-live="assertive">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
        </div>
      </Card>
    </div>
  );
};