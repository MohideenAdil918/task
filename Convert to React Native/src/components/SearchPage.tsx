import { useState } from 'react';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Search, Folder, CheckSquare } from 'lucide-react';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface SearchResult {
  id: string;
  type: 'project' | 'task';
  name: string;
  parent?: string;
  status?: string;
  supervisor?: string;
}

export function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results] = useState<SearchResult[]>([
    {
      id: '1',
      type: 'project',
      name: 'Website Redesign',
      supervisor: 'Sarah Johnson',
      status: 'active',
    },
    {
      id: '2',
      type: 'task',
      name: 'Design homepage mockup',
      parent: 'Website Redesign',
      status: 'completed',
    },
    {
      id: '3',
      type: 'project',
      name: 'Mobile App Development',
      supervisor: 'Michael Chen',
      status: 'active',
    },
    {
      id: '4',
      type: 'task',
      name: 'Setup development environment',
      parent: 'Mobile App Development',
      status: 'active',
    },
    {
      id: '5',
      type: 'task',
      name: 'Create color palette',
      parent: 'Website Redesign',
      status: 'active',
    },
    {
      id: '6',
      type: 'project',
      name: 'Marketing Campaign',
      supervisor: 'Emily Davis',
      status: 'active',
    },
  ]);

  const filteredResults = results.filter(
    (result) =>
      result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (result.parent && result.parent.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const projects = filteredResults.filter((r) => r.type === 'project');
  const tasks = filteredResults.filter((r) => r.type === 'task');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-gray-900">Search</h1>
        <p className="text-gray-600 mt-1">Find projects and tasks</p>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search projects or tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Results */}
      <div className="px-4 pb-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All ({filteredResults.length})</TabsTrigger>
            <TabsTrigger value="projects">Projects ({projects.length})</TabsTrigger>
            <TabsTrigger value="tasks">Tasks ({tasks.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3 mt-4">
            {filteredResults.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                {searchQuery ? 'No results found' : 'Start typing to search'}
              </div>
            ) : (
              filteredResults.map((result) => (
                <Card key={result.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {result.type === 'project' ? (
                          <Folder className="w-5 h-5 text-blue-600" />
                        ) : (
                          <CheckSquare className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span>{result.name}</span>
                          {result.status && (
                            <Badge variant="secondary" className="text-xs">
                              {result.status}
                            </Badge>
                          )}
                        </div>
                        {result.type === 'task' && result.parent && (
                          <p className="text-sm text-gray-500">in {result.parent}</p>
                        )}
                        {result.type === 'project' && result.supervisor && (
                          <p className="text-sm text-gray-500">{result.supervisor}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="projects" className="space-y-3 mt-4">
            {projects.length === 0 ? (
              <div className="text-center py-12 text-gray-500">No projects found</div>
            ) : (
              projects.map((result) => (
                <Card key={result.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Folder className="w-5 h-5 text-blue-600 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span>{result.name}</span>
                          {result.status && (
                            <Badge variant="secondary" className="text-xs">
                              {result.status}
                            </Badge>
                          )}
                        </div>
                        {result.supervisor && (
                          <p className="text-sm text-gray-500">{result.supervisor}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="tasks" className="space-y-3 mt-4">
            {tasks.length === 0 ? (
              <div className="text-center py-12 text-gray-500">No tasks found</div>
            ) : (
              tasks.map((result) => (
                <Card key={result.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <CheckSquare className="w-5 h-5 text-green-600 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span>{result.name}</span>
                          {result.status && (
                            <Badge variant="secondary" className="text-xs">
                              {result.status}
                            </Badge>
                          )}
                        </div>
                        {result.parent && (
                          <p className="text-sm text-gray-500">in {result.parent}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
