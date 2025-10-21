import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Plus, Calendar, Users } from 'lucide-react';
import { Badge } from './ui/badge';

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

interface ProjectListPageProps {
  onCreateProject: () => void;
  onSelectProject: (project: Project) => void;
}

export function ProjectListPage({ onCreateProject, onSelectProject }: ProjectListPageProps) {
  const [projects] = useState<Project[]>([
    {
      id: '1',
      name: 'Website Redesign',
      supervisor: 'Sarah Johnson',
      progress: 65,
      dueDate: '2025-11-15',
      status: 'active',
      taskCount: 12,
      completedTasks: 8,
    },
    {
      id: '2',
      name: 'Mobile App Development',
      supervisor: 'Michael Chen',
      progress: 40,
      dueDate: '2025-12-01',
      status: 'active',
      taskCount: 20,
      completedTasks: 8,
    },
    {
      id: '3',
      name: 'Marketing Campaign',
      supervisor: 'Emily Davis',
      progress: 90,
      dueDate: '2025-10-25',
      status: 'active',
      taskCount: 8,
      completedTasks: 7,
    },
    {
      id: '4',
      name: 'Database Migration',
      supervisor: 'John Smith',
      progress: 25,
      dueDate: '2025-11-30',
      status: 'pending',
      taskCount: 15,
      completedTasks: 4,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'completed':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-gray-900">My Projects</h1>
        <p className="text-gray-600 mt-1">Manage and track your projects</p>
      </div>

      {/* Projects List */}
      <div className="p-4 space-y-4">
        {projects.map((project) => (
          <Card 
            key={project.id} 
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onSelectProject(project)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="mb-2">{project.name}</CardTitle>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{project.supervisor}</span>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className={`${getStatusColor(project.status)} text-white`}
                >
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                {/* Task Info */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Due: {project.dueDate}</span>
                  </div>
                  <span className="text-gray-600">
                    {project.completedTasks}/{project.taskCount} tasks
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Floating Action Button */}
      <Button
        onClick={onCreateProject}
        size="lg"
        className="fixed bottom-20 right-6 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
}