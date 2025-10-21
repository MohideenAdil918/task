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
import Icon from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../styles/colors';
import { SearchResult, SearchStackParamList, Project, SubTask } from '../types';

type Props = {
  navigation: NativeStackNavigationProp<SearchStackParamList, 'SearchList'>;
};

export default function SearchScreen({ navigation }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'projects' | 'tasks'>('all');
  
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
  ]);

  // Mock data for navigation - in a real app, this would come from your data store
  const getProjectData = (id: string): Project => {
    const projectMap: { [key: string]: Project } = {
      '1': {
        id: '1',
        name: 'Website Redesign',
        supervisor: 'Sarah Johnson',
        progress: 65,
        dueDate: '2025-11-15',
        status: 'active',
        taskCount: 8,
        completedTasks: 5,
      },
      '3': {
        id: '3',
        name: 'Mobile App Development',
        supervisor: 'Michael Chen',
        progress: 30,
        dueDate: '2025-12-01',
        status: 'active',
        taskCount: 12,
        completedTasks: 4,
      },
    };
    return projectMap[id] || projectMap['1'];
  };

  const getTaskData = (id: string, name: string): SubTask => {
    return {
      id,
      name,
      completed: id === '2',
      assignee: 'John Doe',
      dueDate: '2025-11-01',
    };
  };

  const handleResultPress = (result: SearchResult) => {
    if (result.type === 'project') {
      const projectData = getProjectData(result.id);
      navigation.navigate('ProjectDetail', { project: projectData });
    } else if (result.type === 'task') {
      const taskData = getTaskData(result.id, result.name);
      const projectName = result.parent || 'Unknown Project';
      navigation.navigate('DailyProgress', { task: taskData, projectName });
    }
  };

  const filteredResults = results.filter(
    (result) =>
      result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (result.parent && result.parent.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const displayResults = activeTab === 'all' 
    ? filteredResults 
    : filteredResults.filter(r => r.type === (activeTab === 'projects' ? 'project' : 'task'));

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search</Text>
        <Text style={styles.headerSubtitle}>Find projects and tasks</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search projects or tasks..."
            placeholderTextColor={colors.placeholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'all' && styles.tabActive]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.tabTextActive]}>
            All ({filteredResults.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'projects' && styles.tabActive]}
          onPress={() => setActiveTab('projects')}
        >
          <Text style={[styles.tabText, activeTab === 'projects' && styles.tabTextActive]}>
            Projects ({filteredResults.filter(r => r.type === 'project').length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'tasks' && styles.tabActive]}
          onPress={() => setActiveTab('tasks')}
        >
          <Text style={[styles.tabText, activeTab === 'tasks' && styles.tabTextActive]}>
            Tasks ({filteredResults.filter(r => r.type === 'task').length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Results */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.resultsContainer}>
        {displayResults.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              {searchQuery ? 'No results found' : 'Start typing to search'}
            </Text>
          </View>
        ) : (
          displayResults.map((result) => (
            <TouchableOpacity 
              key={result.id} 
              style={styles.resultCard}
              onPress={() => handleResultPress(result)}
            >
              <View style={styles.resultIcon}>
                <Icon
                  name={result.type === 'project' ? 'folder' : 'checkmark-circle'}
                  size={20}
                  color={result.type === 'project' ? colors.primary : colors.success}
                />
              </View>
              
              <View style={styles.resultContent}>
                <View style={styles.resultHeader}>
                  <Text style={styles.resultName}>{result.name}</Text>
                  {result.status && (
                    <View style={styles.statusBadge}>
                      <Text style={styles.statusText}>{result.status}</Text>
                    </View>
                  )}
                </View>
                
                {result.type === 'task' && result.parent && (
                  <Text style={styles.resultSubtext}>in {result.parent}</Text>
                )}
                {result.type === 'project' && result.supervisor && (
                  <Text style={styles.resultSubtext}>{result.supervisor}</Text>
                )}
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
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
  searchContainer: {
    padding: 16,
    backgroundColor: colors.surface,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  resultsContainer: {
    padding: 16,
  },
  emptyState: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  resultContent: {
    flex: 1,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  resultName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    flex: 1,
  },
  statusBadge: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    color: '#ffffff',
    textTransform: 'capitalize',
  },
  resultSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
