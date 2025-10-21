import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../styles/colors';

// Screens
import LoginScreen from '../screens/LoginScreen';
import ProjectListScreen from '../screens/ProjectListScreen';
import SearchScreen from '../screens/SearchScreen';
import ApprovalsScreen from '../screens/ApprovalsScreen';
import ReportScreen from '../screens/ReportScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CreateProjectScreen from '../screens/CreateProjectScreen';
import ProjectDetailScreen from '../screens/ProjectDetailScreen';
import DailyProgressScreen from '../screens/DailyProgressScreen';

import { 
  RootStackParamList, 
  TabParamList, 
  ProjectsStackParamList,
  SearchStackParamList 
} from '../types';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();
const ProjectsStack = createNativeStackNavigator<ProjectsStackParamList>();
const SearchStack = createNativeStackNavigator<SearchStackParamList>();

// Projects Stack Navigator
function ProjectsNavigator() {
  return (
    <ProjectsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text,
      }}
    >
      <ProjectsStack.Screen
        name="ProjectList"
        component={ProjectListScreen}
        options={{ headerShown: false }}
      />
      <ProjectsStack.Screen
        name="ProjectDetail"
        component={ProjectDetailScreen}
        options={{ title: 'Project Details' }}
      />
      <ProjectsStack.Screen
        name="DailyProgress"
        component={DailyProgressScreen}
        options={{ title: 'Daily Progress' }}
      />
      <ProjectsStack.Screen
        name="CreateProject"
        component={CreateProjectScreen}
        options={{ title: 'Create New Project' }}
      />
    </ProjectsStack.Navigator>
  );
}

// Search Stack Navigator
function SearchNavigator() {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text,
      }}
    >
      <SearchStack.Screen
        name="SearchList"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <SearchStack.Screen
        name="ProjectDetail"
        component={ProjectDetailScreen}
        options={{ title: 'Project Details' }}
      />
      <SearchStack.Screen
        name="DailyProgress"
        component={DailyProgressScreen}
        options={{ title: 'Daily Progress' }}
      />
    </SearchStack.Navigator>
  );
}

// Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="ProjectsTab"
        component={ProjectsNavigator}
        options={{
          tabBarLabel: 'Projects',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchNavigator}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Approvals"
        component={ApprovalsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="checkmark-done" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="document-text" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Root Navigator
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="MainTabs" component={TabNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
