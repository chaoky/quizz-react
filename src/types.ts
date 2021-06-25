export type Question = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  all_answers: string[];
  answer?: string;
};

export type QuestionResp = {
  response_code: number;
  results: Question[];
};

export type Test = {
  questions: Question[];
  startDate: Date;
  endDate?: Date;
};
