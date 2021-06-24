export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answer?: string;
}

export interface QuestionResp {
  response_code: number;
  results: Question[];
}

export interface Test {
  questions: Question[];
  startDate: Date;
  endDate?: Date;
}
