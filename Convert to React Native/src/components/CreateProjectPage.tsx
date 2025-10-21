import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Plus, X } from 'lucide-react';

interface SubTask {
  id: string;
  name: string;
}

interface CreateProjectPageProps {
  onBack: () => void;
}

export function CreateProjectPage({ onBack }: CreateProjectPageProps) {
  const [projectName, setProjectName] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [subTasks, setSubTasks] = useState<SubTask[]>([]);
  const [newSubTask, setNewSubTask] = useState('');

  const supervisors = [
    'Sarah Johnson',
    'Michael Chen',
    'Emily Davis',
    'John Smith',
    'Amanda Wilson',
    'David Brown',
  ];

  const addSubTask = () => {
    if (newSubTask.trim()) {
      setSubTasks([
        ...subTasks,
        { id: Date.now().toString(), name: newSubTask.trim() },
      ]);
      setNewSubTask('');
    }
  };

  const removeSubTask = (id: string) => {
    setSubTasks(subTasks.filter((task) => task.id !== id));
  };

  const handleSubmit = () => {
    if (projectName && supervisor) {
      // Handle project creation logic here
      console.log('Creating project:', { projectName, supervisor, subTasks });
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-gray-900">Create New Project</h1>
            <p className="text-gray-600 mt-1">Fill in the project details</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-4 space-y-4">
        {/* Project Name */}
        <Card>
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                placeholder="Enter project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supervisor">Assign Supervisor</Label>
              <Select value={supervisor} onValueChange={setSupervisor}>
                <SelectTrigger id="supervisor">
                  <SelectValue placeholder="Select supervisor" />
                </SelectTrigger>
                <SelectContent>
                  {supervisors.map((sup) => (
                    <SelectItem key={sup} value={sup}>
                      {sup}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Sub Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Sub Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add Sub Task Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Enter sub task name"
                value={newSubTask}
                onChange={(e) => setNewSubTask(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addSubTask();
                  }
                }}
              />
              <Button onClick={addSubTask} size="icon">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Sub Tasks List */}
            {subTasks.length > 0 && (
              <div className="space-y-2">
                <Label>Tasks ({subTasks.length})</Label>
                <div className="space-y-2">
                  {subTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                    >
                      <span>{task.name}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSubTask(task.id)}
                        className="h-8 w-8"
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1"
            disabled={!projectName || !supervisor}
          >
            Create Project
          </Button>
        </div>
      </div>
    </div>
  );
}
