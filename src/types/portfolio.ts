export type CharacterState = 'center' | 'left' | 'right';

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  period: string;
  description: string[];
  skills: string[];
  badgeColor?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  boardOrUniversity: string;
  year: string;
  grade: string;
  details?: string;
}

export interface CertificationItem {
  title: string;
  code: string;
  description: string;
  category: 'Computer' | 'Hardware' | 'Accounting';
}

export interface PhotoSnapshot {
  id: string;
  timestamp: string;
  title: string;
  caption: string;
  butterflyCoord: { x: number; y: number };
  filter: string;
  angle: number;
}
