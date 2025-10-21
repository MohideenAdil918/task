import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { User, Mail, Phone, Briefcase, Settings, LogOut, Bell, Shield } from 'lucide-react';
import { Separator } from './ui/separator';

export function ProfilePage() {
  const user = {
    name: 'Alex Thompson',
    email: 'alex.thompson@company.com',
    phone: '+1 (555) 123-4567',
    role: 'Project Manager',
    department: 'Engineering',
    projectsManaged: 12,
    tasksCompleted: 156,
    approvalsPending: 4,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-1">Manage your account settings</p>
      </div>

      {/* Profile Content */}
      <div className="p-4 space-y-4">
        {/* User Info Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="bg-blue-600 text-white text-2xl">
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-gray-900">{user.name}</h2>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Badge variant="secondary">{user.role}</Badge>
                  <Badge variant="outline">{user.department}</Badge>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-5 h-5" />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="w-5 h-5" />
                <span className="text-sm">{user.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Briefcase className="w-5 h-5" />
                <span className="text-sm">{user.department} Department</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-blue-600">{user.projectsManaged}</div>
                <p className="text-sm text-gray-600 mt-1">Projects</p>
              </div>
              <div className="text-center">
                <div className="text-green-600">{user.tasksCompleted}</div>
                <p className="text-sm text-gray-600 mt-1">Tasks Done</p>
              </div>
              <div className="text-center">
                <div className="text-orange-600">{user.approvalsPending}</div>
                <p className="text-sm text-gray-600 mt-1">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <User className="w-5 h-5 mr-3" />
              Edit Profile
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Bell className="w-5 h-5 mr-3" />
              Notifications
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Shield className="w-5 h-5 mr-3" />
              Privacy & Security
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="w-5 h-5 mr-3" />
              Preferences
            </Button>
          </CardContent>
        </Card>

        {/* Logout */}
        <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
