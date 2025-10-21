import { useState } from 'react';
import { ProjectListPage } from './components/ProjectListPage';
import { SearchPage } from './components/SearchPage';
import { ApprovalsPage } from './components/ApprovalsPage';
import { ReportPage } from './components/ReportPage';
import { ProfilePage } from './components/ProfilePage';
import { CreateProjectPage } from './components/CreateProjectPage';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { DailyProgressPage } from './components/DailyProgressPage';
import { Home, Search, CheckSquare, FileText, User } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  supervisor: string;
  progress: number;
  dueDate: string;
  status: 'active' | 'pending' | 'completed';
  taskCount: number;
  completedTasks: number;
}

interface SubTask {
  id: string;
  name: string;
  completed: boolean;
  assignee?: string;
  dueDate?: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState('projects');
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedTask, setSelectedTask] = useState<{ task: SubTask; projectName: string } | null>(null);

  const renderActiveTab = () => {
    if (selectedTask) {
      return (
        <DailyProgressPage
          task={selectedTask.task}
          projectName={selectedTask.projectName}
          onBack={() => setSelectedTask(null)}
        />
      );
    }

    if (selectedProject) {
      return (
        <ProjectDetailPage
          project={selectedProject}
          onBack={() => setSelectedProject(null)}
          onSelectTask={(task) => setSelectedTask({ task, projectName: selectedProject.name })}
        />
      );
    }

    if (showCreateProject) {
      return <CreateProjectPage onBack={() => setShowCreateProject(false)} />;
    }

    switch (activeTab) {
      case 'projects':
        return <ProjectListPage onCreateProject={() => setShowCreateProject(true)} onSelectProject={setSelectedProject} />;
      case 'search':
        return <SearchPage />;
      case 'approvals':
        return <ApprovalsPage />;
      case 'reports':
        return <ReportPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <ProjectListPage onCreateProject={() => setShowCreateProject(true)} onSelectProject={setSelectedProject} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Main Content Area */}
      <div className="flex-1 overflow-auto pb-16">
        {renderActiveTab()}
      </div>

      {/* Bottom Tab Navigation */}
      {!showCreateProject && !selectedProject && !selectedTask && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
          <div className="flex justify-around items-center h-16 max-w-2xl mx-auto">
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                activeTab === 'projects' ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <Home className="w-6 h-6 mb-1" />
              <span className="text-xs">Projects</span>
            </button>

            <button
              onClick={() => setActiveTab('search')}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                activeTab === 'search' ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <Search className="w-6 h-6 mb-1" />
              <span className="text-xs">Search</span>
            </button>

            <button
              onClick={() => setActiveTab('approvals')}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                activeTab === 'approvals' ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <CheckSquare className="w-6 h-6 mb-1" />
              <span className="text-xs">Approvals</span>
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                activeTab === 'reports' ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <FileText className="w-6 h-6 mb-1" />
              <span className="text-xs">Reports</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                activeTab === 'profile' ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <User className="w-6 h-6 mb-1" />
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}