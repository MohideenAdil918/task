import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../styles/colors';
import { Project, ProjectsStackParamList } from '../types';

type Props = {
  navigation: NativeStackNavigationProp<ProjectsStackParamList, 'ProjectList'>;
};

export default function ProjectListScreen({ navigation }: Props) {
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
        return colors.statusActive;
      case 'pending':
        return colors.statusPending;
      case 'completed':
        return colors.statusCompleted;
      default:
        return colors.secondary;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Projects</Text>
        <Text style={styles.headerSubtitle}>Manage and track your projects</Text>
      </View>

      {/* Projects List */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.listContainer}>
        {projects.map((project) => (
          <TouchableOpacity
            key={project.id}
            style={styles.card}
            onPress={() => navigation.navigate('ProjectDetail', { project })}
          >
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderLeft}>
                <Text style={styles.projectName}>{project.name}</Text>
                <View style={styles.supervisorRow}>
                  <Icon name="people" size={16} color={colors.textSecondary} />
                  <Text style={styles.supervisorText}>{project.supervisor}</Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(project.status) }]}>
                <Text style={styles.statusText}>{project.status}</Text>
              </View>
            </View>

            <View style={styles.cardBody}>
              {/* Progress */}
              <View style={styles.progressSection}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressLabel}>Progress</Text>
                  <Text style={styles.progressPercent}>{project.progress}%</Text>
                </View>
                <View style={styles.progressBarBackground}>
                  <View
                    style={[styles.progressBarFill, { width: `${project.progress}%` }]}
                  />
                </View>
              </View>

              {/* Task Info */}
              <View style={styles.taskInfo}>
                <View style={styles.taskInfoItem}>
                  <Icon name="calendar" size={16} color={colors.textSecondary} />
                  <Text style={styles.taskInfoText}>Due: {project.dueDate}</Text>
                </View>
                <Text style={styles.taskInfoText}>
                  {project.completedTasks}/{project.taskCount} tasks
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateProject')}
      >
        <Icon name="add" size={28} color="#ffffff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.surface,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80,
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardHeaderLeft: {
    flex: 1,
  },
  projectName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  supervisorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  supervisorText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    textTransform: 'capitalize',
  },
  cardBody: {
    gap: 12,
  },
  progressSection: {
    gap: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  taskInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  taskInfoText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});
