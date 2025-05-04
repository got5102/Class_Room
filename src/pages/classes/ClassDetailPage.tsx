import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Users, 
  FileCode, 
  Settings, 
  User, 
  Clock, 
  BookOpen, 
  Copy,
  PlusCircle,
  ArrowUpDown,
  Search
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

// Mock class data
const mockClass = {
  id: '1',
  name: 'Introduction to Python',
  description: 'Learn the basics of Python programming language including syntax, data types, control structures, functions, and more.',
  code: 'PYT101',
  enrolledCount: 42,
  instructor: 'Dr. Jane Smith',
  assistants: ['Alice Johnson', 'Bob Williams'],
  createdAt: '2025-01-15',
  assignments: [
    { id: '1', title: 'Python Basics Quiz', dueDate: '2025-06-15', status: 'active' },
    { id: '2', title: 'Functions and Methods', dueDate: '2025-06-22', status: 'draft' },
    { id: '3', title: 'Data Structures', dueDate: '2025-06-29', status: 'active' },
    { id: '4', title: 'File I/O', dueDate: '2025-07-06', status: 'draft' },
    { id: '5', title: 'Final Project', dueDate: '2025-07-15', status: 'upcoming' },
  ],
  students: Array.from({ length: 42 }, (_, i) => ({
    id: `student-${i + 1}`,
    name: `Student ${i + 1}`,
    email: `student${i + 1}@example.com`,
    joinedAt: '2025-01-20',
    completedAssignments: Math.floor(Math.random() * 5),
    averageScore: Math.floor(70 + Math.random() * 30),
  })),
};

const ClassDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const classData = mockClass; // In a real app, fetch by ID
  const { user } = useAuth();
  const isTeacher = user?.role === 'teacher';
  
  const [activeTab, setActiveTab] = useState('assignments');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'name' | 'score'>('name');
  
  // Filter students based on search query
  const filteredStudents = classData.students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Sort students based on sort order
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortOrder === 'name') {
      return a.name.localeCompare(b.name);
    } else {
      return b.averageScore - a.averageScore;
    }
  });

  const copyClassCode = () => {
    navigator.clipboard.writeText(classData.code);
    // In a real app, show a toast/notification here
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        <div className="h-3 bg-blue-600 dark:bg-blue-500"></div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {classData.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1 max-w-3xl">
                {classData.description}
              </p>
              
              <div className="mt-4 flex items-center gap-4 flex-wrap">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <User size={16} className="mr-1" />
                  <span>Instructor: {classData.instructor}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Users size={16} className="mr-1" />
                  <span>{classData.enrolledCount} students</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock size={16} className="mr-1" />
                  <span>Created: {new Date(classData.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            {isTeacher && (
              <div className="flex items-center px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                <div className="mr-3">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Class Code</div>
                  <div className="text-lg font-semibold">{classData.code}</div>
                </div>
                <button
                  onClick={copyClassCode}
                  className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full"
                  aria-label="Copy class code"
                >
                  <Copy size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`px-6 py-3 text-sm font-medium flex items-center ${
              activeTab === 'assignments'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('assignments')}
          >
            <FileCode size={18} className="mr-2" />
            Assignments
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium flex items-center ${
              activeTab === 'students'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('students')}
          >
            <Users size={18} className="mr-2" />
            Students
          </button>
          {isTeacher && (
            <button
              className={`px-6 py-3 text-sm font-medium flex items-center ${
                activeTab === 'resources'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('resources')}
            >
              <BookOpen size={18} className="mr-2" />
              Resources
            </button>
          )}
          {isTeacher && (
            <button
              className={`px-6 py-3 text-sm font-medium flex items-center ${
                activeTab === 'settings'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={18} className="mr-2" />
              Settings
            </button>
          )}
        </div>

        <div className="p-6">
          {activeTab === 'assignments' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {isTeacher ? 'Manage Assignments' : 'Class Assignments'}
                </h2>
                
                {isTeacher && (
                  <Link
                    to="/assignments/new"
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    <PlusCircle size={16} className="mr-2" />
                    Create Assignment
                  </Link>
                )}
              </div>
              
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Assignment
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Due Date
                      </th>
                      {isTeacher && (
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                      )}
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {classData.assignments.map((assignment) => (
                      <tr key={assignment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {assignment.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(assignment.dueDate).toLocaleDateString()}
                          </div>
                        </td>
                        {isTeacher && (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              assignment.status === 'active'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                : assignment.status === 'draft'
                                ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                            }`}>
                              {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                            </span>
                          </td>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            to={`/assignments/${assignment.id}`}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            {isTeacher ? 'Manage' : 'View'}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {isTeacher ? 'Enrolled Students' : 'Classmates'}
                </h2>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search students..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white dark:bg-gray-700 sm:text-sm"
                    />
                  </div>
                  
                  {isTeacher && (
                    <button
                      onClick={() => setSortOrder(sortOrder === 'name' ? 'score' : 'name')}
                      className="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    >
                      <ArrowUpDown size={16} className="mr-2" />
                      Sort by: {sortOrder === 'name' ? 'Name' : 'Score'}
                    </button>
                  )}
                </div>
              </div>
              
              {sortedStudents.length > 0 ? (
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Student
                        </th>
                        {isTeacher && (
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Email
                          </th>
                        )}
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Joined
                        </th>
                        {isTeacher && (
                          <>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Assignments
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Avg. Score
                            </th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {sortedStudents.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400">
                                {student.name.charAt(0)}
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {student.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          {isTeacher && (
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {student.email}
                              </div>
                            </td>
                          )}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(student.joinedAt).toLocaleDateString()}
                            </div>
                          </td>
                          {isTeacher && (
                            <>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {student.completedAssignments} / {classData.assignments.length}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className={`text-sm font-medium ${
                                  student.averageScore >= 90
                                    ? 'text-green-600 dark:text-green-400'
                                    : student.averageScore >= 70
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-red-600 dark:text-red-400'
                                }`}>
                                  {student.averageScore}%
                                </div>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                    <Users size={32} className="text-gray-500 dark:text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                    No students found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {searchQuery ? `No students match your search "${searchQuery}"` : "There are no students in this class yet."}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'resources' && isTeacher && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Class Resources
                </h2>
                
                <button
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                >
                  <PlusCircle size={16} className="mr-2" />
                  Add Resource
                </button>
              </div>
              
              <div className="text-center py-16 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
                  <BookOpen size={32} className="text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  No resources yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  Share learning materials, links, and resources with your students to enhance their learning experience.
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm inline-flex items-center"
                >
                  <PlusCircle size={16} className="mr-2" />
                  Add First Resource
                </button>
              </div>
            </div>
          )}

          {activeTab === 'settings' && isTeacher && (
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Class Settings
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="className" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Class Name
                    </label>
                    <input
                      type="text"
                      id="className"
                      defaultValue={classData.name}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white dark:bg-gray-700 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="classDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      id="classDescription"
                      rows={4}
                      defaultValue={classData.description}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white dark:bg-gray-700 sm:text-sm"
                    />
                  </div>
                  
                  <div className="flex justify-end gap-3">
                    <button
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 pt-10 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-red-600 dark:text-red-500 mb-4">
                  Danger Zone
                </h3>
                
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-red-800 dark:text-red-400">
                        Archive Class
                      </h4>
                      <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                        This will archive the class and make it read-only for all students. You can restore it later.
                      </p>
                    </div>
                    <button
                      className="px-4 py-2 bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-700 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors text-sm"
                    >
                      Archive Class
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassDetailPage;