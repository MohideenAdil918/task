import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import { colors } from '../styles/colors';
import { ProgressEntry, ProjectsStackParamList } from '../types';

type NavigationProp = NativeStackNavigationProp<ProjectsStackParamList, 'DailyProgress'>;
type RouteProps = RouteProp<ProjectsStackParamList, 'DailyProgress'>;

const audioRecorderPlayer = new AudioRecorderPlayer();

export default function DailyProgressScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { task, projectName } = route.params;
  const [comment, setComment] = useState('');
  const [progressEntries, setProgressEntries] = useState<ProgressEntry[]>([
    {
      id: '1',
      type: 'comment',
      content: 'Started working on the initial mockups. Made good progress with the color scheme.',
      author: 'John Doe',
      timestamp: 'Oct 18, 10:30 AM',
    },
    {
      id: '2',
      type: 'audio',
      content: 'Audio update on design decisions',
      fileName: 'design-update.mp3',
      author: 'Jane Smith',
      timestamp: 'Oct 18, 2:15 PM',
      duration: 45,
    },
  ]);

  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

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

  const requestMicrophonePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'App needs access to your microphone to record audio.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const startRecording = async () => {
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Please allow microphone access to record audio.');
      return;
    }

    try {
      const path = Platform.select({
        ios: 'voice-note.m4a',
        android: `${audioRecorderPlayer.mmssss(Date.now())}.mp4`,
      });

      await audioRecorderPlayer.startRecorder(path);
      audioRecorderPlayer.addRecordBackListener(() => {
        // Recording in progress
      });
      
      setIsRecording(true);
      
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Failed to start recording', err);
      Alert.alert('Error', 'Failed to start recording. Please try again.');
    }
  };

  const stopRecording = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setIsRecording(false);
      
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }

      const newEntry: ProgressEntry = {
        id: Date.now().toString(),
        type: 'audio',
        content: 'Voice note',
        fileName: `voice-note-${Date.now()}.m4a`,
        fileUrl: result,
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
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  const pickImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'mixed',
        quality: 1,
      });

      if (result.didCancel) {
        return;
      }

      if (result.assets && result.assets[0]) {
        const asset = result.assets[0];
        const type = asset.type?.includes('video') ? 'video' : 'image';

        const newEntry: ProgressEntry = {
          id: Date.now().toString(),
          type,
          content: `Uploaded ${type}`,
          fileName: asset.fileName || `file-${Date.now()}`,
          fileUrl: asset.uri,
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
      }
    } catch (err) {
      console.error('Error picking image:', err);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const deleteEntry = (id: string) => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this progress entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setProgressEntries(progressEntries.filter(entry => entry.id !== id)),
        },
      ]
    );
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Task Info Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>{task.name}</Text>
        <Text style={styles.bannerSubtitle}>{projectName}</Text>
        {task.assignee && (
          <View style={styles.bannerInfo}>
            <Text style={styles.bannerLabel}>Assigned to: </Text>
            <Text style={styles.bannerValue}>{task.assignee}</Text>
          </View>
        )}
      </View>

      {/* Progress Entries */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.entriesContainer}>
        {progressEntries.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No progress updates yet.</Text>
            <Text style={styles.emptyStateSubtext}>Add a comment or upload files to get started!</Text>
          </View>
        ) : (
          progressEntries.map((entry) => (
            <View key={entry.id} style={styles.entryRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{getInitials(entry.author)}</Text>
              </View>

              <View style={styles.entryContent}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryAuthor}>{entry.author}</Text>
                  <Text style={styles.entryTimestamp}>{entry.timestamp}</Text>
                </View>

                {entry.type === 'comment' && (
                  <View style={styles.commentBubble}>
                    <Text style={styles.commentText}>{entry.content}</Text>
                  </View>
                )}

                {entry.type === 'audio' && (
                  <View style={styles.mediaBubble}>
                    <View style={styles.mediaHeader}>
                      <Icon name="mic" size={16} color={colors.primary} />
                      <Text style={styles.mediaTitle}>{entry.content}</Text>
                    </View>
                    {entry.duration && (
                      <Text style={styles.mediaDuration}>
                        Duration: {formatDuration(entry.duration)}
                      </Text>
                    )}
                  </View>
                )}

                {entry.type === 'video' && (
                  <View style={styles.mediaBubble}>
                    <View style={styles.mediaHeader}>
                      <Icon name="videocam" size={16} color="#9333ea" />
                      <Text style={styles.mediaTitle}>{entry.fileName}</Text>
                    </View>
                  </View>
                )}

                {entry.type === 'image' && (
                  <View style={styles.mediaBubble}>
                    <View style={styles.mediaHeader}>
                      <Icon name="image" size={16} color="#16a34a" />
                      <Text style={styles.mediaTitle}>{entry.fileName}</Text>
                    </View>
                  </View>
                )}
              </View>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteEntry(entry.id)}
              >
                <Icon name="trash-outline" size={18} color={colors.danger} />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        {isRecording && (
          <View style={styles.recordingIndicator}>
            <View style={styles.recordingDot} />
            <Text style={styles.recordingText}>Recording... {formatDuration(recordingTime)}</Text>
            <TouchableOpacity style={styles.stopButton} onPress={stopRecording}>
              <Text style={styles.stopButtonText}>Stop</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.inputCard}>
          <TextInput
            style={styles.textInput}
            placeholder="Add a progress update or comment..."
            placeholderTextColor={colors.placeholder}
            value={comment}
            onChangeText={setComment}
            multiline
          />

          <View style={styles.inputActions}>
            <View style={styles.inputActionsLeft}>
              <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
                <Icon name="attach" size={20} color={colors.text} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, isRecording && styles.actionButtonActive]}
                onPress={isRecording ? stopRecording : startRecording}
              >
                <Icon name="mic" size={20} color={isRecording ? colors.danger : colors.text} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.sendButton, !comment.trim() && styles.sendButtonDisabled]}
              onPress={handleSendComment}
              disabled={!comment.trim()}
            >
              <Icon name="send" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  banner: {
    backgroundColor: '#dbeafe',
    borderBottomWidth: 1,
    borderBottomColor: '#93c5fd',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  bannerSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  bannerInfo: {
    flexDirection: 'row',
    marginTop: 6,
  },
  bannerLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  bannerValue: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text,
  },
  scrollView: {
    flex: 1,
  },
  entriesContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  emptyState: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 8,
  },
  entryRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  entryContent: {
    flex: 1,
  },
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  entryAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  entryTimestamp: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  commentBubble: {
    backgroundColor: colors.border,
    borderRadius: 12,
    padding: 12,
  },
  commentText: {
    fontSize: 14,
    color: colors.text,
  },
  mediaBubble: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
  },
  mediaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mediaTitle: {
    fontSize: 14,
    color: colors.text,
  },
  mediaDuration: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  deleteButton: {
    padding: 4,
  },
  inputContainer: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: 16,
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fee2e2',
    borderWidth: 1,
    borderColor: '#fca5a5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    gap: 8,
  },
  recordingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.danger,
  },
  recordingText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  stopButton: {
    backgroundColor: colors.danger,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  stopButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  inputCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
  },
  textInput: {
    fontSize: 16,
    color: colors.text,
    minHeight: 60,
    maxHeight: 120,
    textAlignVertical: 'top',
  },
  inputActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  inputActionsLeft: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonActive: {
    backgroundColor: '#fee2e2',
  },
  sendButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  sendButtonDisabled: {
    backgroundColor: colors.disabled,
  },
});
