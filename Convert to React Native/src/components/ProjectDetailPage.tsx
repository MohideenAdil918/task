import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Checkbox } from './ui/checkbox';
import { ArrowLeft, Plus, Calendar as CalendarIcon, Edit2, Check, X, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from './ui/badge';

interface SubTask {
  id: string;
  name: string;
  completed: boolean;
  assignee?: string;
  dueDate?: string;
}

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

interface ProjectDetailPageProps {
  project: Project;
  onBack: () => void;
  onSelectTask: (task: SubTask) => void;
}

export function ProjectDetailPage({ project: initialProject, onBack, onSelectTask }: ProjectDetailPageProps) {
  const [project, setProject] = useState(initialProject);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [editedName, setEditedName] = useState(project.name);
  const [editedSupervisor, setEditedSupervisor] = useState(project.supervisor);
  const [editedDueDate, setEditedDueDate] = useState<Date | undefined>(
    project.dueDate ? new Date(project.dueDate) : undefined
  );

  const [subTasks, setSubTasks] = useState<SubTask[]>([
    {
      id: '1',
      name: 'Create wireframes',
      completed: true,
      assignee: 'John Doe',
      dueDate: '2025-10-22',
    },
    {
      id: '2',
      name: 'Design mockups',
      completed: true,
      assignee: 'Jane Smith',
      dueDate: '2025-10-25',
    },
    {
      id: '3',
      name: 'Frontend development',
      completed: false,
      assignee: 'Bob Johnson',
      dueDate: '2025-11-01',
    },
    {
      id: '4',
      name: 'Backend integration',
      completed: false,
      assignee: 'Alice Brown',
      dueDate: '2025-11-08',
    },
  ]);

  const [newSubTask, setNewSubTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedTaskName, setEditedTaskName] = useState('');

  const supervisors = [
    'Sarah Johnson',
    'Michael Chen',
    'Emily Davis',
    'John Smith',
    'Amanda Wilson',
    'David Brown',
  ];

  const teamMembers = [
    'John Doe',
    'Jane Smith',
    'Bob Johnson',
    'Alice Brown',
    'Charlie Wilson',
    'Diana Martinez',
  ];

  const handleSaveProject = () => {
    setProject({
      ...project,
      name: editedName,
      supervisor: editedSupervisor,
      dueDate: editedDueDate ? format(editedDueDate, 'yyyy-MM-dd') : project.dueDate,
    });
    setIsEditingProject(false);
  };

  const handleCancelEdit = () => {
    setEditedName(project.name);
    setEditedSupervisor(project.supervisor);
    setEditedDueDate(project.dueDate ? new Date(project.dueDate) : undefined);
    setIsEditingProject(false);
  };

  const addSubTask = () => {
    if (newSubTask.trim()) {
      setSubTasks([
        ...subTasks,
        {
          id: Date.now().toString(),
          name: newSubTask.trim(),
          completed: false,
        },
      ]);
      setNewSubTask('');
    }
  };

  const toggleSubTask = (id: string) => {
    setSubTasks(
      subTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteSubTask = (id: string) => {
    setSubTasks(subTasks.filter((task) => task.id !== id));
  };

  const startEditingTask = (task: SubTask) => {
    setEditingTaskId(task.id);
    setEditedTaskName(task.name);
  };

  const saveTaskEdit = (id: string) => {
    if (editedTaskName.trim()) {
      setSubTasks(
        subTasks.map((task) =>
          task.id === id ? { ...task, name: editedTaskName.trim() } : task
        )
      );
    }
    setEditingTaskId(null);
    setEditedTaskName('');
  };

  const cancelTaskEdit = () => {
    setEditingTaskId(null);
    setEditedTaskName('');
  };

  const updateTaskAssignee = (id: string, assignee: string) => {
    setSubTasks(
      subTasks.map((task) =>
        task.id === id ? { ...task, assignee } : task
      )
    );
  };

  const updateTaskDueDate = (id: string, dueDate: Date | undefined) => {
    setSubTasks(
      subTasks.map((task) =>
        task.id === id
          ? { ...task, dueDate: dueDate ? format(dueDate, 'yyyy-MM-dd') : undefined }
          : task
      )
    );
  };

  const completedCount = subTasks.filter((t) => t.completed).length;
  const progressPercent = subTasks.length > 0 ? Math.round((completedCount / subTasks.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-gray-900">Project Details</h1>
            <p className="text-gray-600 mt-1">Manage tasks and project settings</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Project Info Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle>Project Information</CardTitle>
            {!isEditingProject && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditingProject(true)}
              >
                <Edit2 className="w-4 h-4 mr-1" />
                Edit
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditingProject ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="edit-project-name">Project Name</Label>
                  <Input
                    id="edit-project-name"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-supervisor">Supervisor</Label>
                  <Select value={editedSupervisor} onValueChange={setEditedSupervisor}>
                    <SelectTrigger id="edit-supervisor">
                      <SelectValue />
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

                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {editedDueDate ? format(editedDueDate, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={editedDueDate}
                        onSelect={setEditedDueDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" onClick={handleCancelEdit} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleSaveProject} className="flex-1">
                    Save Changes
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Project Name</p>
                  <p>{project.name}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Supervisor</p>
                  <p>{project.supervisor}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Due Date</p>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-gray-500" />
                    <p>{project.dueDate}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <Badge variant="secondary">{project.status}</Badge>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Progress Card */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Completion</span>
                <span className="text-sm">
                  {completedCount}/{subTasks.length} tasks ({progressPercent}%)
                </span>
              </div>
              <Progress value={progressPercent} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Sub Tasks Card */}
        <Card>
          <CardHeader>
            <CardTitle>Sub Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add Sub Task */}
            <div className="flex gap-2">
              <Input
                placeholder="Enter new sub task name"
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
            <div className="space-y-3">
              {subTasks.map((task) => (
                <Card 
                  key={task.id} 
                  className="bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => onSelectTask(task)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Task Name with Checkbox */}
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={(e) => {
                            e.stopPropagation();
                            toggleSubTask(task.id);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="mt-1"
                        />
                        {editingTaskId === task.id ? (
                          <div className="flex-1 flex gap-2" onClick={(e) => e.stopPropagation()}>
                            <Input
                              value={editedTaskName}
                              onChange={(e) => setEditedTaskName(e.target.value)}
                              className="flex-1"
                            />
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                saveTaskEdit(task.id);
                              }}
                            >
                              <Check className="w-4 h-4 text-green-600" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                cancelTaskEdit();
                              }}
                            >
                              <X className="w-4 h-4 text-red-600" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex-1 flex items-start justify-between">
                            <span
                              className={`flex-1 ${
                                task.completed ? 'line-through text-gray-500' : ''
                              }`}
                            >
                              {task.name}
                            </span>
                            <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  startEditingTask(task);
                                }}
                              >
                                <Edit2 className="w-3 h-3" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteSubTask(task.id);
                                }}
                              >
                                <Trash2 className="w-3 h-3 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Task Details */}
                      <div className="ml-9 space-y-2" onClick={(e) => e.stopPropagation()}>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <Label className="text-xs text-gray-500">Assignee</Label>
                            <Select
                              value={task.assignee || ''}
                              onValueChange={(value) => updateTaskAssignee(task.id, value)}
                            >
                              <SelectTrigger className="h-8 text-sm">
                                <SelectValue placeholder="Assign to..." />
                              </SelectTrigger>
                              <SelectContent>
                                {teamMembers.map((member) => (
                                  <SelectItem key={member} value={member}>
                                    {member}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-1">
                            <Label className="text-xs text-gray-500">Due Date</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="h-8 w-full justify-start text-left text-sm"
                                >
                                  <CalendarIcon className="mr-1 h-3 w-3" />
                                  {task.dueDate ? (
                                    format(new Date(task.dueDate), 'MMM dd')
                                  ) : (
                                    <span className="text-gray-400">Set date</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={task.dueDate ? new Date(task.dueDate) : undefined}
                                  onSelect={(date) => updateTaskDueDate(task.id, date)}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {subTasks.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No sub tasks yet. Add one above to get started!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}