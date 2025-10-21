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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../styles/colors';
import { ProjectsStackParamList } from '../types';

type NavigationProp = NativeStackNavigationProp<ProjectsStackParamList, 'CreateProject'>;

interface SubTask {
  id: string;
  name: string;
}

export default function CreateProjectScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [projectName, setProjectName] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [showSupervisorPicker, setShowSupervisorPicker] = useState(false);
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
      console.log('Creating project:', { projectName, supervisor, subTasks });
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Project Information Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Project Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Project Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter project name"
              placeholderTextColor={colors.placeholder}
              value={projectName}
              onChangeText={setProjectName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Assign Supervisor</Text>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => setShowSupervisorPicker(!showSupervisorPicker)}
            >
              <Text style={supervisor ? styles.selectButtonText : styles.selectButtonPlaceholder}>
                {supervisor || 'Select supervisor'}
              </Text>
              <Icon name="chevron-down" size={20} color={colors.textSecondary} />
            </TouchableOpacity>

            {showSupervisorPicker && (
              <View style={styles.pickerContainer}>
                {supervisors.map((sup) => (
                  <TouchableOpacity
                    key={sup}
                    style={styles.pickerItem}
                    onPress={() => {
                      setSupervisor(sup);
                      setShowSupervisorPicker(false);
                    }}
                  >
                    <Text style={styles.pickerItemText}>{sup}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Sub Tasks Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sub Tasks</Text>

          <View style={styles.addTaskRow}>
            <TextInput
              style={[styles.input, styles.taskInput]}
              placeholder="Enter sub task name"
              placeholderTextColor={colors.placeholder}
              value={newSubTask}
              onChangeText={setNewSubTask}
              onSubmitEditing={addSubTask}
            />
            <TouchableOpacity style={styles.addButton} onPress={addSubTask}>
              <Icon name="add" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {subTasks.length > 0 && (
            <View style={styles.tasksList}>
              <Text style={styles.tasksLabel}>Tasks ({subTasks.length})</Text>
              {subTasks.map((task) => (
                <View key={task.id} style={styles.taskItem}>
                  <Text style={styles.taskName}>{task.name}</Text>
                  <TouchableOpacity onPress={() => removeSubTask(task.id)}>
                    <Icon name="close-circle" size={24} color={colors.danger} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              styles.submitButton,
              (!projectName || !supervisor) && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={!projectName || !supervisor}
          >
            <Text style={styles.submitButtonText}>Create Project</Text>
          </TouchableOpacity>
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
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
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
  selectButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  selectButtonText: {
    fontSize: 16,
    color: colors.text,
  },
  selectButtonPlaceholder: {
    fontSize: 16,
    color: colors.placeholder,
  },
  pickerContainer: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.surface,
    maxHeight: 200,
  },
  pickerItem: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  pickerItemText: {
    fontSize: 16,
    color: colors.text,
  },
  addTaskRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  taskInput: {
    flex: 1,
    marginBottom: 0,
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
    gap: 8,
  },
  tasksLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 8,
  },
  taskName: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  submitButton: {
    backgroundColor: colors.primary,
  },
  submitButtonDisabled: {
    backgroundColor: colors.disabled,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
