import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { ArrowLeft, Send, Paperclip, Mic, Video, Image as ImageIcon, Play, Pause, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';

interface SubTask {
  id: string;
  name: string;
  completed: boolean;
  assignee?: string;
  dueDate?: string;
}

interface ProgressEntry {
  id: string;
  type: 'comment' | 'audio' | 'video' | 'image';
  content: string;
  fileName?: string;
  fileUrl?: string;
  author: string;
  timestamp: string;
  duration?: number;
}

interface DailyProgressPageProps {
  task: SubTask;
  projectName: string;
  onBack: () => void;
}

export function DailyProgressPage({ task, projectName, onBack }: DailyProgressPageProps) {
  const [comment, setComment] = useState('');
  const [progressEntries, setProgressEntries] = useState<ProgressEntry[]>([
    {
      id: '1',
      type: 'comment',
      content: 'Started working on the initial mockups. Made good progress with the color scheme.',
      author: 'John Doe',
      timestamp: '2025-10-18 10:30 AM',
    },
    {
      id: '2',
      type: 'audio',
      content: 'Audio update on design decisions',
      fileName: 'design-update.mp3',
      fileUrl: '#',
      author: 'Jane Smith',
      timestamp: '2025-10-18 02:15 PM',
      duration: 45,
    },
    {
      id: '3',
      type: 'comment',
      content: 'Reviewed the feedback from the team. Will incorporate changes tomorrow.',
      author: 'John Doe',
      timestamp: '2025-10-19 09:00 AM',
    },
  ]);

  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendComment = () => {
    if (comment.trim()) {
      const newEntry: ProgressEntry = {
        id: Date.now().toString(),
        type: 'comment',
        content: comment.trim(),
        author: 'You',
        timestamp: new Date().toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
      };
      setProgressEntries([...progressEntries, newEntry]);
      setComment('');
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        const newEntry: ProgressEntry = {
          id: Date.now().toString(),
          type: 'audio',
          content: 'Voice note',
          fileName: `voice-note-${Date.now()}.webm`,
          fileUrl: audioUrl,
          author: 'You',
          timestamp: new Date().toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          }),
          duration: recordingTime,
        };
        
        setProgressEntries([...progressEntries, newEntry]);
        setRecordingTime(0);
        
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      let type: 'audio' | 'video' | 'image' = 'image';
      
      if (file.type.startsWith('audio/')) {
        type = 'audio';
      } else if (file.type.startsWith('video/')) {
        type = 'video';
      } else if (file.type.startsWith('image/')) {
        type = 'image';
      }

      const newEntry: ProgressEntry = {
        id: Date.now().toString(),
        type,
        content: `Uploaded ${type}`,
        fileName: file.name,
        fileUrl,
        author: 'You',
        timestamp: new Date().toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
      };

      setProgressEntries([...progressEntries, newEntry]);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const deleteEntry = (id: string) => {
    setProgressEntries(progressEntries.filter(entry => entry.id !== id));
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderProgressEntry = (entry: ProgressEntry) => {
    return (
      <div key={entry.id} className="flex gap-3 group">
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarFallback className="bg-blue-600 text-white text-xs">
            {entry.author.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm">{entry.author}</span>
            <span className="text-xs text-gray-500">{entry.timestamp}</span>
          </div>
          
          {entry.type === 'comment' && (
            <div className="bg-gray-100 rounded-lg p-3">
              <p className="text-sm">{entry.content}</p>
            </div>
          )}
          
          {entry.type === 'audio' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Mic className="w-4 h-4 text-blue-600" />
                <span className="text-sm">{entry.content}</span>
              </div>
              {entry.fileUrl && (
                <div className="flex items-center gap-2">
                  <audio controls className="w-full h-8" src={entry.fileUrl} />
                </div>
              )}
              {entry.duration && (
                <span className="text-xs text-gray-500 mt-1 block">
                  Duration: {formatDuration(entry.duration)}
                </span>
              )}
            </div>
          )}
          
          {entry.type === 'video' && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Video className="w-4 h-4 text-purple-600" />
                <span className="text-sm">{entry.fileName}</span>
              </div>
              {entry.fileUrl && (
                <video controls className="w-full rounded-lg max-h-64" src={entry.fileUrl} />
              )}
            </div>
          )}
          
          {entry.type === 'image' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <ImageIcon className="w-4 h-4 text-green-600" />
                <span className="text-sm">{entry.fileName}</span>
              </div>
              {entry.fileUrl && (
                <img src={entry.fileUrl} alt={entry.fileName} className="w-full rounded-lg max-h-64 object-cover" />
              )}
            </div>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
          onClick={() => deleteEntry(entry.id)}
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-gray-900">Daily Progress</h1>
            <p className="text-gray-600 mt-1 text-sm">{task.name}</p>
            <p className="text-gray-500 text-xs mt-0.5">{projectName}</p>
          </div>
        </div>
      </div>

      {/* Task Info Banner */}
      <div className="bg-blue-50 border-b border-blue-100 px-6 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {task.assignee && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Assigned to:</span>
                <Badge variant="secondary">{task.assignee}</Badge>
              </div>
            )}
            {task.dueDate && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Due:</span>
                <Badge variant="outline">{task.dueDate}</Badge>
              </div>
            )}
          </div>
          <Badge className={task.completed ? 'bg-green-500' : 'bg-orange-500'}>
            {task.completed ? 'Completed' : 'In Progress'}
          </Badge>
        </div>
      </div>

      {/* Progress Entries */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {progressEntries.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No progress updates yet.</p>
            <p className="text-sm mt-2">Add a comment or upload files to get started!</p>
          </div>
        ) : (
          progressEntries.map(renderProgressEntry)
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
        <Card>
          <CardContent className="p-4 space-y-3">
            {/* Recording Indicator */}
            {isRecording && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm">Recording... {formatDuration(recordingTime)}</span>
                </div>
                <Button size="sm" onClick={stopRecording} variant="destructive">
                  <Pause className="w-4 h-4 mr-1" />
                  Stop
                </Button>
              </div>
            )}

            {/* Comment Input */}
            <Textarea
              placeholder="Add a progress update or comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendComment();
                }
              }}
            />

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*,audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isRecording}
                >
                  <Paperclip className="w-4 h-4 mr-1" />
                  Attach
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={isRecording ? stopRecording : startRecording}
                  className={isRecording ? 'bg-red-50 border-red-300' : ''}
                >
                  <Mic className="w-4 h-4 mr-1" />
                  {isRecording ? 'Recording...' : 'Voice'}
                </Button>
              </div>

              <Button onClick={handleSendComment} size="sm" disabled={!comment.trim()}>
                <Send className="w-4 h-4 mr-1" />
                Send
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
