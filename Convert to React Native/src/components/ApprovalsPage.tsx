import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Check, X, Clock, Calendar, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface Approval {
  id: string;
  type: 'task' | 'project' | 'report';
  title: string;
  description: string;
  requestedBy: string;
  requestedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  projectName: string;
}

export function ApprovalsPage() {
  const [approvals, setApprovals] = useState<Approval[]>([
    {
      id: '1',
      type: 'task',
      title: 'Complete UI Design',
      description: 'Finalize the user interface design for the dashboard',
      requestedBy: 'Sarah Johnson',
      requestedDate: '2025-10-18',
      status: 'pending',
      projectName: 'Website Redesign',
    },
    {
      id: '2',
      type: 'project',
      title: 'Budget Increase Request',
      description: 'Request to increase project budget by 15%',
      requestedBy: 'Michael Chen',
      requestedDate: '2025-10-19',
      status: 'pending',
      projectName: 'Mobile App Development',
    },
    {
      id: '3',
      type: 'report',
      title: 'Q3 Performance Report',
      description: 'Quarterly performance analysis and metrics',
      requestedBy: 'Emily Davis',
      requestedDate: '2025-10-17',
      status: 'approved',
      projectName: 'Marketing Campaign',
    },
    {
      id: '4',
      type: 'task',
      title: 'Database Schema Changes',
      description: 'Approval needed for database structure modifications',
      requestedBy: 'John Smith',
      requestedDate: '2025-10-16',
      status: 'pending',
      projectName: 'Database Migration',
    },
  ]);

  const handleApprove = (id: string) => {
    setApprovals(
      approvals.map((approval) =>
        approval.id === id ? { ...approval, status: 'approved' as const } : approval
      )
    );
  };

  const handleReject = (id: string) => {
    setApprovals(
      approvals.map((approval) =>
        approval.id === id ? { ...approval, status: 'rejected' as const } : approval
      )
    );
  };

  const pending = approvals.filter((a) => a.status === 'pending');
  const approved = approvals.filter((a) => a.status === 'approved');
  const rejected = approvals.filter((a) => a.status === 'rejected');

  const getTypeIcon = (type: string) => {
    const iconClass = 'w-4 h-4';
    switch (type) {
      case 'task':
        return <Check className={iconClass} />;
      case 'project':
        return <Clock className={iconClass} />;
      case 'report':
        return <Calendar className={iconClass} />;
      default:
        return null;
    }
  };

  const ApprovalCard = ({ approval }: { approval: Approval }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="mb-2">{approval.title}</CardTitle>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {getTypeIcon(approval.type)}
                <span className="ml-1">{approval.type}</span>
              </Badge>
              {approval.status === 'approved' && (
                <Badge className="bg-green-500 text-white text-xs">Approved</Badge>
              )}
              {approval.status === 'rejected' && (
                <Badge className="bg-red-500 text-white text-xs">Rejected</Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-gray-600">{approval.description}</p>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <User className="w-4 h-4" />
            <span>Requested by: {approval.requestedBy}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{approval.requestedDate}</span>
          </div>
          <p className="text-gray-500">Project: {approval.projectName}</p>
        </div>

        {approval.status === 'pending' && (
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleReject(approval.id)}
              className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
            >
              <X className="w-4 h-4 mr-1" />
              Reject
            </Button>
            <Button
              size="sm"
              onClick={() => handleApprove(approval.id)}
              className="flex-1 bg-green-500 hover:bg-green-600"
            >
              <Check className="w-4 h-4 mr-1" />
              Approve
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-gray-900">Approvals</h1>
        <p className="text-gray-600 mt-1">Review and manage approval requests</p>
      </div>

      {/* Content */}
      <div className="p-4">
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">
              Pending ({pending.length})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved ({approved.length})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected ({rejected.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4 mt-4">
            {pending.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No pending approvals
              </div>
            ) : (
              pending.map((approval) => (
                <ApprovalCard key={approval.id} approval={approval} />
              ))
            )}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4 mt-4">
            {approved.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No approved items
              </div>
            ) : (
              approved.map((approval) => (
                <ApprovalCard key={approval.id} approval={approval} />
              ))
            )}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4 mt-4">
            {rejected.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No rejected items
              </div>
            ) : (
              rejected.map((approval) => (
                <ApprovalCard key={approval.id} approval={approval} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
