import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';

export default function ReportScreen() {
  const [reportType, setReportType] = useState('');
  const [project, setProject] = useState('');
  const [description, setDescription] = useState('');
  const [showReportTypePicker, setShowReportTypePicker] = useState(false);
  const [showProjectPicker, setShowProjectPicker] = useState(false);

  const reportTypes = [
    'Project Progress Report',
    'Task Completion Report',
    'Team Performance Report',
    'Budget Report',
    'Time Tracking Report',
  ];

  const projects = [
    'All Projects',
    'Website Redesign',
    'Mobile App Development',
    'Marketing Campaign',
    'Database Migration',
  ];

  const recentReports = [
    {
      name: 'Q3 Project Progress Report',
      date: '2025-10-15',
      project: 'Website Redesign',
    },
    {
      name: 'Task Completion Report',
      date: '2025-10-12',
      project: 'Mobile App Development',
    },
    {
      name: 'Team Performance Report',
      date: '2025-10-08',
      project: 'All Projects',
    },
  ];

  const handleGenerateReport = () => {
    console.log('Generating report:', { reportType, project, description });
    // Handle report generation
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reports</Text>
        <Text style={styles.headerSubtitle}>Generate and download reports</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Create Report Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="document-text" size={20} color={colors.primary} />
            <Text style={styles.cardTitle}>Create New Report</Text>
          </View>

          {/* Report Type */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Report Type</Text>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => setShowReportTypePicker(!showReportTypePicker)}
            >
              <Text style={reportType ? styles.selectButtonText : styles.selectButtonPlaceholder}>
                {reportType || 'Select report type'}
              </Text>
              <Ionicons name="chevron-down" size={20} color={colors.textSecondary} />
            </TouchableOpacity>

            {showReportTypePicker && (
              <View style={styles.pickerContainer}>
                {reportTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={styles.pickerItem}
                    onPress={() => {
                      setReportType(type);
                      setShowReportTypePicker(false);
                    }}
                  >
                    <Text style={styles.pickerItemText}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Project Selection */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Project</Text>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => setShowProjectPicker(!showProjectPicker)}
            >
              <Text style={project ? styles.selectButtonText : styles.selectButtonPlaceholder}>
                {project || 'Select project'}
              </Text>
              <Ionicons name="chevron-down" size={20} color={colors.textSecondary} />
            </TouchableOpacity>

            {showProjectPicker && (
              <View style={styles.pickerContainer}>
                {projects.map((proj) => (
                  <TouchableOpacity
                    key={proj}
                    style={styles.pickerItem}
                    onPress={() => {
                      setProject(proj);
                      setShowProjectPicker(false);
                    }}
                  >
                    <Text style={styles.pickerItemText}>{proj}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description (Optional)</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Add any additional notes or requirements for this report..."
              placeholderTextColor={colors.placeholder}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Generate Button */}
          <TouchableOpacity
            style={[
              styles.generateButton,
              (!reportType || !project) && styles.generateButtonDisabled,
            ]}
            onPress={handleGenerateReport}
            disabled={!reportType || !project}
          >
            <Ionicons name="download" size={20} color="#ffffff" />
            <Text style={styles.generateButtonText}>Generate Report</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Reports */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recent Reports</Text>
          
          <View style={styles.reportsList}>
            {recentReports.map((report, index) => (
              <TouchableOpacity key={index} style={styles.reportItem}>
                <View style={styles.reportInfo}>
                  <Text style={styles.reportName}>{report.name}</Text>
                  <Text style={styles.reportMeta}>
                    {report.project} • {report.date}
                  </Text>
                </View>
                <TouchableOpacity style={styles.downloadButton}>
                  <Ionicons name="download-outline" size={20} color={colors.primary} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
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
  textArea: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.surface,
    minHeight: 100,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 8,
  },
  generateButtonDisabled: {
    backgroundColor: colors.disabled,
  },
  generateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  reportsList: {
    gap: 12,
    marginTop: 12,
  },
  reportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 8,
  },
  reportInfo: {
    flex: 1,
  },
  reportName: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 4,
  },
  reportMeta: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  downloadButton: {
    padding: 8,
  },
});
