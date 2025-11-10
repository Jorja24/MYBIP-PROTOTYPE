
export interface Source {
  name: string;
}

export interface GuidedStep {
  title: string;
  steps: string[];
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  sources?: Source[];
  guidedStep?: GuidedStep;
}

export enum Language {
  ENGLISH = 'English',
  ZULU = 'Zulu',
  XHOSA = 'Xhosa',
  AFRIKAANS = 'Afrikaans',
}
