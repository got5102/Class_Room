import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarClock, FileCode, Users, Award, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();
  const isTeacher = user?.role === 'teacher';

  // Mock data
  const upcomingAssignments = [
    { id: '1', title: 'Python Basics Quiz', dueDate: '2025-06-15', className: 'Introduction to Python' },
    { id: '2', title: 'Java Collections Assignment', dueDate: '2025-06-18', className: 'Java Programming' },
    { id: '3', title: 'C++ Pointers Exercise', dueDate: '2025-06-20', className: 'Advanced C++' },
  ];

  const recentClasses = [
    { id: '1', name: 'Introduction to Python', students: 42, assignments: 12 },
    { id: '2', name: 'Java Programming', students: 28, assignments: 8 },
    { id: '3', name: 'Advanced C++', students: 15, assignments: 15 },
  ];

  const notifications = [
    { id: '1', text: 'Your Java assignment was graded.', time: '2 hours ago' },
    { id: '2', text: 'New Python quiz available.', time: '1 day ago' },
    { id: '3', text: 'Reminder: C++ assignment due tomorrow.', time: '1 day ago' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {isTeacher ? 'Instructor Dashboard' : 'Student Dashboard'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Welcome back, {user?.name}!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-2 mr-3">
              <FileCode className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              {isTeacher ? 'Total Assignments' : 'Completed Assignments'}
            </h2>
          </div>
          <div className="flex items-baseline">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">28</p>
            <p className="ml-2 text-sm text-green-600 dark:text-green-400">
              +4 this week
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-2 mr-3">
              <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              {isTeacher ? 'Total Students' : 'Active Classes'}
            </h2>
          </div>
          <div className="flex items-baseline">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{isTeacher ? '85' : '4'}</p>
            <p className="ml-2 text-sm text-green-600 dark:text-green-400">
              {isTeacher ? '+12 this month' : '+1 this week'}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-2 mr-3">
              <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              {isTeacher ? 'Average Score' : 'Overall Grade'}
            </h2>
          </div>
          <div className="flex items-baseline">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {isTeacher ? '78%' : 'B+'}
            </p>
            <p className="ml-2 text-sm text-green-600 dark:text-green-400">
              {isTeacher ? '+2.5% this term' : '88%'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CalendarClock className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Upcoming {isTeacher ? 'Assignments' : 'Deadlines'}
                  </h2>
                </div>
                <Link
                  to="/assignments"
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
                >
                  View all
                </Link>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {upcomingAssignments.map((assignment) => (
                <div key={assignment.id} className="p-4 sm:px-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <Link 
                        to={`/assignments/${assignment.id}`}
                        className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {assignment.title}
                      </Link>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {assignment.className}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        Due: {new Date(assignment.dueDate).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {Math.floor((new Date(assignment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {upcomingAssignments.length === 0 && (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No upcoming assignments
                </div>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    {isTeacher ? 'Recent Classes' : 'My Classes'}
                  </h2>
                </div>
                <Link
                  to="/classes"
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
                >
                  View all
                </Link>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {recentClasses.map((cls) => (
                <div key={cls.id} className="p-4 sm:px-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <Link 
                        to={`/classes/${cls.id}`}
                        className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {cls.name}
                      </Link>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {cls.students} students • {cls.assignments} assignments
                      </p>
                    </div>
                    <Link
                      to={`/classes/${cls.id}`}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {isTeacher ? 'Manage' : 'View'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center">
                <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Recent Notifications
                </h2>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-4">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {notification.text}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {notification.time}
                  </div>
                </div>
              ))}

              {notifications.length === 0 && (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No notifications
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-100 dark:border-gray-700">
              <button className="text-sm text-center w-full text-blue-600 dark:text-blue-400 hover:text-blue-500">
                View all notifications
              </button>
            </div>
          </div>

          {isTeacher && (
            <div className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-sm p-6 text-white">
              <h3 className="text-lg font-medium mb-2">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/classes/new"
                  className="block bg-white/10 hover:bg-white/20 rounded-md p-3 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="rounded-full bg-white/20 p-2 mr-3">
                      <Users className="h-5 w-5" />
                    </div>
                    <span>Create new class</span>
                  </div>
                </Link>
                <Link
                  to="/assignments/new"
                  className="block bg-white/10 hover:bg-white/20 rounded-md p-3 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="rounded-full bg-white/20 p-2 mr-3">
                      <FileCode className="h-5 w-5" />
                    </div>
                    <span>Create new assignment</span>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;