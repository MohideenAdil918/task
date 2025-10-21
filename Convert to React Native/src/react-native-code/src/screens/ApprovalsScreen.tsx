import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { Approval } from '../types';

export default function ApprovalsScreen() {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
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
  ]);

  const handleApprove = (id: string) => {
    setApprovals(
      approvals.map((approval) =>
        approval.id === id ? { ...approval, status: 'approved' } : approval
      )
    );
  };

  const handleReject = (id: string) => {
    setApprovals(
      approvals.map((approval) =>
        approval.id === id ? { ...approval, status: 'rejected' } : approval
      )
    );
  };

  const displayApprovals = approvals.filter(a => a.status === activeTab);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'task':
        return 'checkmark-circle';
      case 'project':
        return 'time';
      case 'report':
        return 'document-text';
      default:
        return 'document';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Approvals</Text>
        <Text style={styles.headerSubtitle}>Review and manage approval requests</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'pending' && styles.tabActive]}
          onPress={() => setActiveTab('pending')}
        >
          <Text style={[styles.tabText, activeTab === 'pending' && styles.tabTextActive]}>
            Pending ({approvals.filter(a => a.status === 'pending').length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'approved' && styles.tabActive]}
          onPress={() => setActiveTab('approved')}
        >
          <Text style={[styles.tabText, activeTab === 'approved' && styles.tabTextActive]}>
            Approved ({approvals.filter(a => a.status === 'approved').length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'rejected' && styles.tabActive]}
          onPress={() => setActiveTab('rejected')}
        >
          <Text style={[styles.tabText, activeTab === 'rejected' && styles.tabTextActive]}>
            Rejected ({approvals.filter(a => a.status === 'rejected').length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Approvals List */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.listContainer}>
        {displayApprovals.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No {activeTab} approvals</Text>
          </View>
        ) : (
          displayApprovals.map((approval) => (
            <View key={approval.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{approval.title}</Text>
                <View style={styles.badges}>
                  <View style={styles.typeBadge}>
                    <Ionicons name={getTypeIcon(approval.type)} size={12} color={colors.primary} />
                    <Text style={styles.typeBadgeText}>{approval.type}</Text>
                  </View>
                  {approval.status === 'approved' && (
                    <View style={[styles.statusBadge, { backgroundColor: colors.success }]}>
                      <Text style={styles.statusBadgeText}>Approved</Text>
                    </View>
                  )}
                  {approval.status === 'rejected' && (
                    <View style={[styles.statusBadge, { backgroundColor: colors.danger }]}>
                      <Text style={styles.statusBadgeText}>Rejected</Text>
                    </View>
                  )}
                </View>
              </View>

              <Text style={styles.description}>{approval.description}</Text>

              <View style={styles.details}>
                <View style={styles.detailRow}>
                  <Ionicons name="person" size={16} color={colors.textSecondary} />
                  <Text style={styles.detailText}>Requested by: {approval.requestedBy}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="calendar" size={16} color={colors.textSecondary} />
                  <Text style={styles.detailText}>{approval.requestedDate}</Text>
                </View>
                <Text style={styles.projectText}>Project: {approval.projectName}</Text>
              </View>

              {approval.status === 'pending' && (
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.rejectButton]}
                    onPress={() => handleReject(approval.id)}
                  >
                    <Ionicons name="close" size={18} color={colors.danger} />
                    <Text style={styles.rejectButtonText}>Reject</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.approveButton]}
                    onPress={() => handleApprove(approval.id)}
                  >
                    <Ionicons name="checkmark" size={18} color="#ffffff" />
                    <Text style={styles.approveButtonText}>Approve</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
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
    fontSize: 13,
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  listContainer: {
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
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeBadgeText: {
    fontSize: 12,
    color: colors.primary,
    textTransform: 'capitalize',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  details: {
    gap: 6,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  projectText: {
    fontSize: 14,
    color: colors.textLight,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 8,
  },
  rejectButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.danger,
  },
  rejectButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.danger,
  },
  approveButton: {
    backgroundColor: colors.success,
  },
  approveButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
});
