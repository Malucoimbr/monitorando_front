
export type UserRole = 'STUDENT' | 'professor' | 'monitor';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
}

export interface Class {
  id: string;
  name: string;
  code: string;
  description?: string;
  professorId: string;
  semester: string;
  schedule?: string[];
}

export interface Monitor {
  id: string;
  userId: string;
  classId: string;
  specialties?: string[];
  availability?: string[];
  rating?: number;
}

export interface Feedback {
  id: string;
  studentId: string;
  monitorId: string;
  classId: string;
  rating: number;
  comment?: string;
  date: string;
}

export interface Appointment {
  id: string;
  studentId: string;
  monitorId: string;
  classId: string;
  title: string;
  description?: string;
  date: string;
  status: 'scheduled' | 'completed' | 'canceled';
}

export interface Question {
  id: string;
  studentId: string;
  classId: string;
  monitorId?: string;
  title: string;
  description: string;
  date: string;
  isPublic: boolean;
  status: 'pending' | 'answered' | 'closed';
  answerId?: string;
}

export interface SidebarItem {
  title: string;
  icon: React.ElementType;
  path: string;
  role: UserRole[];
  badge?: number | string;
}

export interface DataCard {
  title: string;
  value: string | number;
  icon: React.ElementType;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  color?: string;
}

export interface Activity {
  id: string;
  title: string;
  description?: string;
  date: string;
  type: 'appointment' | 'question' | 'feedback' | 'class';
  status?: string;
  userId?: string;
  userName?: string;
  userAvatar?: string;
}
