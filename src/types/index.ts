export interface User {
  id: string;
  email: string;
  name: string;
  address?: string;
  profession?: string;
  phone?: string;
  photo_url?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  emailNotifications: boolean;
  smsNotifications: boolean;
  reminderDays: number;
}

export interface Appointment {
  id: string;
  user_id: string;
  date: string;
  time_slot: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  created_at: string;
}

export interface Document {
  id: string;
  userId: string;
  year: number;
  category: string;
  name: string;
  uploadDate: Date;
  status: 'pending' | 'verified' | 'rejected';
  labels: string[];
  aiVerified: boolean;
  verificationNotes?: string;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  message_text: string;
  is_bot: boolean;
  timestamp: string;
}

export interface Invoice {
  id: string;
  user_id: string;
  amount: number;
  status: 'paid' | 'unpaid';
  date_issued: string;
}

export interface TaxReturn {
  id: string;
  user_id: string;
  year: number;
  amount_recovered: number;
}

export interface FinancialSummary {
  owed: number;
  paid: number;
  recoveredByYear: Array<{
    year: number;
    amount: number;
  }>;
}

export interface Todo {
  id: string;
  userId: string;
  title: string;
  description: string;
  dueDate: Date;
  status: 'pending' | 'completed';
  priority: 'low' | 'medium' | 'high';
  category: string;
}

export interface FeedbackMessage {
  id: string;
  userId: string;
  section: string;
  message: string;
  timestamp: Date;
  status: 'pending' | 'resolved';
  response?: string;
}

export interface UserProgress {
  userId: string;
  currentStep: number;
  totalSteps: number;
  lastUpdated: Date;
  completedSteps: string[];
}

export interface HelpInteraction {
  id: string;
  userId: string;
  componentId: string;
  action: 'hover' | 'click' | 'focus';
  timestamp: Date;
  helpful: boolean;
}

export interface Automation {
  id: string;
  userId: string;
  type: 'reminder' | 'notification';
  triggerDate: Date;
  status: 'pending' | 'sent' | 'failed';
  message: string;
  channel: 'email' | 'sms';
} 