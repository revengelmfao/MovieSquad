import { Request, Response } from 'express';

// Temporary mock data
const mockQuestions = [
  {
    question: 'What is JavaScript?',
    answers: [
      { text: 'A programming language', isCorrect: true },
      { text: 'A markup language', isCorrect: false },
      { text: 'A database', isCorrect: false },
      { text: 'An operating system', isCorrect: false }
    ]
  },
  {
    question: 'What does HTML stand for?',
    answers: [
      { text: 'Hyper Text Markup Language', isCorrect: true },
      { text: 'High Tech Machine Learning', isCorrect: false },
      { text: 'Home Tool Management Language', isCorrect: false },
      { text: 'Hyperlink Text Management Language', isCorrect: false }
    ]
  }
];

export const getRandomQuestions = (_req: Request, res: Response) => {
  try {
    // For now, just return the mock data
    res.json(mockQuestions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
