import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, FileCode, Search, Filter, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

// Mock assignment data
const mockAssignments = [
  { 
    id: '1', 
    title: 'Python Basics Quiz', 
    className: 'Introduction to Python',
    classId: '1',
    dueDate: '2025-06-15', 
    status: 'active',
    studentStatus: 'submitted',
    submissionCount: 38,
    totalStudents: 42,
    points: 100
  },
  { 
    id: '2', 
    title: 'Java Collections Assignment', 
    className: 'Java Programming',
    classId: '2',
    dueDate: '2025-06-18', 
    status: 'active',
    studentStatus: 'pending',
    submissionCount: 15,
    totalStudents: 28,
    points: 150
  },
  { 
    id: '3', 
    title: 'C++ Pointers Exercise', 
    className: 'Advanced C++',
    classId: '3',
    dueDate: '2025-06-20', 
    status: 'active',
    studentStatus: 'missed',
    submissionCount: 10,
    totalStudents: 15,
    points: 80
  },
  { 
    id: '4', 
    title: 'Python Functions Lab', 
    className: 'Introduction to Python',
    classId: '1',
    dueDate: '2025-06-25', 
    status: 'draft',
    studentStatus: 'upcoming',
    submissionCount: 0,
    totalStudents: 42,
    points: 120
  },
  { 
    id: '5', 
    title: 'Java Interfaces Quiz', 
    className: 'Java Programming',
    classId: '2',
    dueDate: '2025-06-28', 
    status: 'upcoming',
    studentStatus: 'upcoming',
    submissionCount: 0,
    totalStudents: 28,
    points: 50
  },
];

type AssignmentStatus = 'all' | 'submitted' | 'pending' | 'missed' | 'upcoming';

const AssignmentsPage = () => {
  const { user } = useAuth();
  const isTeacher = user?.role === 'teacher';
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<AssignmentStatus>('all');
  
  // Filter assignments based on search query and status filter
  const filteredAssignments = mockAssignments.filter(assignment => {
    // Apply search filter
    const matchesSearch = 
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.className.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply status filter (for students only)
    const matchesStatus = 
      statusFilter === 'all' || 
      (isTeacher ? true : assignment.studentStatus === statusFilter);
    
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: mockAssignments.length,
    submitted: mockAssignments.filter(a => a.studentStatus === 'submitted').length,
    pending: mockAssignments.filter(a => a.studentStatus === 'pending').length,
    missed: mockAssignments.filter(a => a.studentStatus === 'missed').length,
    upcoming: mockAssignments.filter(a => a.studentStatus === 'upcoming').length,
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'submitted':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle size={12} className="mr-1" /> Submitted
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
            <Clock size={12} className="mr-1" /> Pending
          </span>
        );
      case 'missed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            <XCircle size={12} className="mr-1" /> Missed
          </span>
        );
      case 'upcoming':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            <Clock size={12} className="mr-1" /> Upcoming
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isTeacher ? 'Manage Assignments' : 'Your Assignments'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {isTeacher 
              ? 'Create, edit, and track student progress on assignments' 
              : 'View and complete your assigned work'}
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white dark:bg-gray-700 sm:text-sm"
            />
          </div>
          
          {isTeacher && (
            <Link
              to="/assignments/new"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <PlusCircle size={18} className="mr-2" /> 
              Create Assignment
            </Link>
          )}
        </div>
      </div>

      {!isTeacher && (
        <div className="bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6 flex overflow-x-auto">
          <button
            onClick={() => setStatusFilter('all')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${
              statusFilter === 'all'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            All ({statusCounts.all})
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${
              statusFilter === 'pending'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Pending ({statusCounts.pending})
          </button>
          <button
            onClick={() => setStatusFilter('submitted')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${
              statusFilter === 'submitted'
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Submitted ({statusCounts.submitted})
          </button>
          <button
            onClick={() => setStatusFilter('upcoming')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${
              statusFilter === 'upcoming'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Upcoming ({statusCounts.upcoming})
          </button>
          <button
            onClick={() => setStatusFilter('missed')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${
              statusFilter === 'missed'
                ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Missed ({statusCounts.missed})
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {filteredAssignments.map((assignment) => (
          <Link
            to={`/assignments/${assignment.id}`}
            key={assignment.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="p-6">
              <div className="sm:flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center mb-1">
                    <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-2 mr-3">
                      <FileCode size={18} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                      {assignment.title}
                    </h2>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {assignment.className}
                  </p>
                  
                  <div className="mt-2 flex items-center flex-wrap gap-2">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </div>
                    
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      •
                    </div>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {assignment.points} points
                    </div>
                    
                    {!isTeacher && (
                      <>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          •
                        </div>
                        {getStatusBadge(assignment.studentStatus)}
                      </>
                    )}
                  </div>
                </div>
                
                {isTeacher ? (
                  <div className="mt-4 sm:mt-0 sm:ml-5 flex flex-col items-end">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {assignment.submissionCount} / {assignment.totalStudents} submitted
                    </div>
                    <div className="mt-1 w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${(assignment.submissionCount / assignment.totalStudents) * 100}%` }}
                      ></div>
                    </div>
                    <div className="mt-3">
                      {assignment.status === 'draft' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          Draft
                        </span>
                      ) : assignment.status === 'upcoming' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                          Scheduled
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 sm:mt-0 sm:ml-5">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
                      {assignment.studentStatus === 'submitted' 
                        ? 'View Submission' 
                        : assignment.studentStatus === 'pending' 
                        ? 'Continue Working' 
                        : assignment.studentStatus === 'missed'
                        ? 'View Assignment'
                        : 'Start Assignment'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {filteredAssignments.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
            <FileCode size={32} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No assignments found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            {searchQuery 
              ? `No assignments match your search "${searchQuery}"`
              : isTeacher 
                ? "You haven't created any assignments yet."
                : "You don't have any assignments yet."}
          </p>
          
          {isTeacher && (
            <div className="mt-6">
              <Link
                to="/assignments/new"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <PlusCircle size={18} className="mr-2" /> 
                Create First Assignment
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AssignmentsPage;