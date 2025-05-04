import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Users, Search, Key } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

// Mock class data
const mockClasses = [
  { 
    id: '1', 
    name: 'Introduction to Python', 
    description: 'Learn the basics of Python programming language.',
    students: 42,
    assignments: 12,
    code: 'PYT101',
    instructor: 'Dr. Jane Smith'
  },
  { 
    id: '2', 
    name: 'Java Programming', 
    description: 'Master Java programming language and OOP concepts.',
    students: 28,
    assignments: 8,
    code: 'JAV202',
    instructor: 'Prof. Michael Johnson'
  },
  { 
    id: '3', 
    name: 'Advanced C++', 
    description: 'Dive deep into C++ programming for performance-critical applications.',
    students: 15,
    assignments: 15,
    code: 'CPP303',
    instructor: 'Dr. Lisa Chen'
  },
];

const ClassesPage = () => {
  const { user } = useAuth();
  const isTeacher = user?.role === 'teacher';
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClasses = mockClasses.filter(cls => 
    cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cls.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoinClass = () => {
    // In a real app, we would validate the join code and add the student
    // to the class here
    setShowJoinModal(false);
    setJoinCode('');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isTeacher ? 'Your Classes' : 'Enrolled Classes'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {isTeacher 
              ? 'Manage your teaching classes' 
              : 'Classes you are currently enrolled in'}
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search classes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white dark:bg-gray-700 sm:text-sm"
            />
          </div>
          
          {isTeacher ? (
            <Link
              to="/classes/new"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <PlusCircle size={18} className="mr-2" /> 
              Create Class
            </Link>
          ) : (
            <button
              onClick={() => setShowJoinModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Key size={18} className="mr-2" /> 
              Join Class
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((cls) => (
          <Link
            to={`/classes/${cls.id}`}
            key={cls.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="h-2 bg-blue-600 dark:bg-blue-500"></div>
            <div className="p-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {cls.name}
                </h2>
                <div className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-xs font-medium text-blue-700 dark:text-blue-400">
                  {cls.code}
                </div>
              </div>
              
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {cls.description}
              </p>
              
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Users size={16} className="mr-1" />
                  <span>{cls.students} students</span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {cls.assignments} assignments
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {filteredClasses.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
            <Users size={32} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No classes found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            {searchQuery 
              ? `No classes match your search "${searchQuery}"`
              : isTeacher 
                ? "You haven't created any classes yet. Create your first class to get started."
                : "You haven't joined any classes yet. Use a class code to join one."}
          </p>
        </div>
      )}

      {/* Join Class Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowJoinModal(false)}>
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

            <div 
              className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 sm:mx-0 sm:h-10 sm:w-10">
                    <Key className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      Join a Class
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Enter the class invitation code provided by your instructor.
                      </p>
                      <input
                        type="text"
                        value={joinCode}
                        onChange={(e) => setJoinCode(e.target.value)}
                        placeholder="Class code (e.g., ABC123)"
                        className="mt-3 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white dark:bg-gray-700 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleJoinClass}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Join Class
                </button>
                <button
                  type="button"
                  onClick={() => setShowJoinModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassesPage;