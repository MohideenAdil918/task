import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../styles/colors';
import { Project, SubTask, ProjectsStackParamList } from '../types';

type NavigationProp = NativeStackNavigationProp<ProjectsStackParamList, 'ProjectDetail'>;
type RouteProps = RouteProp<ProjectsStackParamList, 'ProjectDetail'>;

export default function ProjectDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { project: initialProject } = route.params;
  const [project] = useState(initialProject);
  
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

  const completedCount = subTasks.filter((t) => t.completed).length;
  const progressPercent = subTasks.length > 0 ? Math.round((completedCount / subTasks.length) * 100) : 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Project Info Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Project Information</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Project Name</Text>
            <Text style={styles.infoValue}>{project.name}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Supervisor</Text>
            <Text style={styles.infoValue}>{project.supervisor}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Due Date</Text>
            <View style={styles.dateRow}>
              <Ionicons name="calendar" size={16} color={colors.textSecondary} />
              <Text style={styles.infoValue}>{project.dueDate}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{project.status}</Text>
            </View>
          </View>
        </View>

        {/* Progress Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Overall Progress</Text>
          
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Completion</Text>
            <Text style={styles.progressText}>
              {completedCount}/{subTasks.length} tasks ({progressPercent}%)
            </Text>
          </View>
          
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
          </View>
        </View>

        {/* Sub Tasks Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sub Tasks</Text>

          <View style={styles.addTaskRow}>
            <TextInput
              style={[styles.input, styles.taskInput]}
              placeholder="Enter new sub task name"
              placeholderTextColor={colors.placeholder}
              value={newSubTask}
              onChangeText={setNewSubTask}
              onSubmitEditing={addSubTask}
            />
            <TouchableOpacity style={styles.addButton} onPress={addSubTask}>
              <Ionicons name="add" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <View style={styles.tasksList}>
            {subTasks.map((task) => (
              <TouchableOpacity
                key={task.id}
                style={styles.taskCard}
                onPress={() => navigation.navigate('DailyProgress', { task, projectName: project.name })}
              >
                <View style={styles.taskHeader}>
                  <TouchableOpacity
                    style={styles.checkbox}
                    onPress={(e) => {
                      e.stopPropagation();
                      toggleSubTask(task.id);
                    }}
                  >
                    {task.completed && (
                      <Ionicons name="checkmark" size={18} color={colors.primary} />
                    )}
                  </TouchableOpacity>
                  <Text style={[styles.taskName, task.completed && styles.taskNameCompleted]}>
                    {task.name}
                  </Text>
                </View>

                {(task.assignee || task.dueDate) && (
                  <View style={styles.taskDetails}>
                    {task.assignee && (
                      <View style={styles.taskDetailItem}>
                        <Text style={styles.taskDetailLabel}>Assignee:</Text>
                        <Text style={styles.taskDetailValue}>{task.assignee}</Text>
                      </View>
                    )}
                    {task.dueDate && (
                      <View style={styles.taskDetailItem}>
                        <Ionicons name="calendar" size={14} color={colors.textSecondary} />
                        <Text style={styles.taskDetailValue}>{task.dueDate}</Text>
                      </View>
                    )}
                  </View>
                )}
              </TouchableOpacity>
            ))}

            {subTasks.length === 0 && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  No sub tasks yet. Add one above to get started!
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  infoRow: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: colors.text,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 14,
    color: '#ffffff',
    textTransform: 'capitalize',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  progressText: {
    fontSize: 14,
    color: colors.text,
  },
  progressBarBackground: {
    height: 12,
    backgroundColor: colors.border,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 6,
  },
  addTaskRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  taskInput: {
    flex: 1,
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tasksList: {
    gap: 12,
  },
  taskCard: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskName: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  taskNameCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  taskDetails: {
    marginLeft: 36,
    marginTop: 8,
    gap: 6,
  },
  taskDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  taskDetailLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  taskDetailValue: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  emptyState: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
