export interface Project {
  id: string;
  name: string;
  supervisor: string;
  progress: number;
  dueDate: string;
  status: 'active' | 'pending' | 'completed';
  taskCount: number;
  completedTasks: number;
}

export interface SubTask {
  id: string;
  name: string;
  completed: boolean;
  assignee?: string;
  dueDate?: string;
}

export interface ProgressEntry {
  id: string;
  type: 'comment' | 'audio' | 'video' | 'image';
  content: string;
  fileName?: string;
  fileUrl?: string;
  author: string;
  timestamp: string;
  duration?: number;
}

export interface Approval {
  id: string;
  type: 'task' | 'project' | 'report';
  title: string;
  description: string;
  requestedBy: string;
  requestedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  projectName: string;
}

export interface SearchResult {
  id: string;
  type: 'project' | 'task';
  name: string;
  parent?: string;
  status?: string;
  supervisor?: string;
}

export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
};

export type ProjectsStackParamList = {
  ProjectList: undefined;
  ProjectDetail: { project: Project };
  DailyProgress: { task: SubTask; projectName: string };
  CreateProject: undefined;
};

export type SearchStackParamList = {
  SearchList: undefined;
  ProjectDetail: { project: Project };
  DailyProgress: { task: SubTask; projectName: string };
};

export type TabParamList = {
  ProjectsTab: undefined;
  SearchTab: undefined;
  Approvals: undefined;
  Reports: undefined;
  Profile: undefined;
};
