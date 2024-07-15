// src/App.tsx
import React, { useState, useEffect } from 'react';
import { questions } from './questions';

interface Answer {
  [key: number]: boolean | null;
}

const App: React.FC = () => {
  const [answers, setAnswers] = useState<Answer>({});
  const [score, setScore] = useState<number | null>(null);
  const [averageScore, setAverageScore] = useState<number>(0);

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem('scores') || '[]');
    const avgScore = storedScores.length > 0
      ? storedScores.reduce((acc: number, curr: number) => acc + curr, 0) / storedScores.length
      : 0;
    setAverageScore(avgScore);
  }, []);

  const handleAnswer = (questionId: number, answer: boolean) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const calculateScore = () => {
    const yesCount = Object.values(answers).filter(ans => ans).length;
    const newScore = (yesCount / questions.length) * 100;
    setScore(newScore);
    const storedScores = JSON.parse(localStorage.getItem('scores') || '[]');
    localStorage.setItem('scores', JSON.stringify([...storedScores, newScore]));
    const updatedAvgScore = [...storedScores, newScore].reduce((acc: number, curr: number) => acc + curr, 0) / (storedScores.length + 1);
    setAverageScore(updatedAvgScore);
  };

  const renderQuestions = () => {
    return questions.map(question => (
      <div key={question.id} className='question-list-details'>
        <h2>{question.text}</h2>
        <button onClick={() => handleAnswer(question.id, true)} className='yes-btn'>Yes</button>
        <button onClick={() => handleAnswer(question.id, false)} className='no-btn'>No</button>
      </div>
    ));
  };

  return (
    <div className='quiz-wrapper'>
      <h1>TODO</h1>
      <h2><strong>Score:</strong> {score !== null ? score.toFixed(2) : 'Not calculated yet'}</h2>
      <h2><strong>Average Score:</strong> {averageScore.toFixed(2)}</h2>
      <div>
          {renderQuestions()}
          <button onClick={calculateScore} className='submit-btn'>Submit</button>
        </div>
    </div>
  );
};

export default App;
