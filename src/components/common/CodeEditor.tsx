import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Play, Save, RefreshCw } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface CodeEditorProps {
  initialValue?: string;
  language?: string;
  onSave?: (code: string) => void;
  onRun?: (code: string) => void;
  readOnly?: boolean;
  height?: string;
}

const languageOptions = [
  { value: 'python', label: 'Python' },
  { value: 'cpp', label: 'C++' },
  { value: 'java', label: 'Java' },
];

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue = '',
  language: initialLanguage = 'python',
  onSave,
  onRun,
  readOnly = false,
  height = '400px',
}) => {
  const [code, setCode] = useState(initialValue);
  const [language, setLanguage] = useState(initialLanguage);
  const [isRunning, setIsRunning] = useState(false);
  const { theme } = useTheme();

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleSave = () => {
    onSave?.(code);
  };

  const handleRun = () => {
    setIsRunning(true);
    onRun?.(code);
    
    // Simulate run completion
    setTimeout(() => {
      setIsRunning(false);
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <select
            value={language}
            onChange={handleLanguageChange}
            disabled={readOnly}
            className="text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 py-1 pl-3 pr-8"
          >
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex space-x-2">
          {!readOnly && onSave && (
            <button
              onClick={handleSave}
              className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md flex items-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Save size={16} className="mr-1" /> Save
            </button>
          )}
          
          {onRun && (
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isRunning ? (
                <>
                  <RefreshCw size={16} className="mr-1 animate-spin" /> Running...
                </>
              ) : (
                <>
                  <Play size={16} className="mr-1" /> Run
                </>
              )}
            </button>
          )}
        </div>
      </div>
      
      <div className="relative" style={{ height }}>
        <textarea
          value={code}
          onChange={handleCodeChange}
          disabled={readOnly}
          className="absolute inset-0 w-full h-full font-mono text-transparent bg-transparent caret-gray-900 dark:caret-white resize-none p-4 outline-none z-10"
          style={{ tabSize: 2 }}
        />
        
        <div className="absolute inset-0 pointer-events-none overflow-auto">
          <SyntaxHighlighter
            language={language}
            style={theme === 'dark' ? vscDarkPlus : vs}
            customStyle={{
              margin: 0,
              padding: '1rem',
              height: '100%',
              backgroundColor: 'transparent',
              fontSize: '0.875rem',
            }}
          >
            {code || ' '}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;