import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileCode, 
  Book, 
  Settings, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/classes', icon: <Users size={20} />, label: 'Classes' },
    { path: '/assignments', icon: <FileCode size={20} />, label: 'Assignments' },
    { 
      path: '/resources', 
      icon: <Book size={20} />, 
      label: 'Resources',
      show: user?.role === 'teacher'
    },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ].filter(item => item.show !== false);

  return (
    <div
      className={`h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 flex justify-end">
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex-1 py-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center py-2 px-4 ${
                      collapsed ? 'justify-center' : 'space-x-3'
                    } ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    } rounded-md transition-colors`
                  }
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4">
          <div className={`rounded-md bg-blue-50 dark:bg-blue-900/20 p-3 ${collapsed ? 'text-center' : ''}`}>
            {!collapsed && (
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
                {user?.role === 'teacher' ? 'Teacher Account' : 'Student Account'}
              </p>
            )}
            <div className="flex items-center justify-center">
              <div className={`rounded-full bg-blue-100 dark:bg-blue-800 p-2 ${collapsed ? '' : 'mr-2'}`}>
                {user?.role === 'teacher' ? (
                  <Users size={collapsed ? 16 : 20} className="text-blue-600 dark:text-blue-400" />
                ) : (
                  <User size={collapsed ? 16 : 20} className="text-blue-600 dark:text-blue-400" />
                )}
              </div>
              {!collapsed && (
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {user?.role === 'teacher' ? 'Manage Classes' : 'View Progress'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;