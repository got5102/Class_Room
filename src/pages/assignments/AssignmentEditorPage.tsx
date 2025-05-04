import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, SendHorizontal } from 'lucide-react';
import CodeEditor from '../../components/common/CodeEditor';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const AssignmentEditorPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [code, setCode] = useState<string>(
`def calculate_factorial(n):
    """
    Calculate the factorial of a given number.
    
    Args:
        n: A non-negative integer
        
    Returns:
        The factorial of n
    """
    # Your implementation here
    pass

# Test your function
print(calculate_factorial(5))  # Should return 120`
  );
  const [output, setOutput] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [language, setLanguage] = useState('python');

  const handleSaveCode = (newCode: string) => {
    setCode(newCode);
    // In a real app, we would save to the backend here
  };

  const handleRunCode = (codeToRun: string) => {
    // Simulate code execution
    setTimeout(() => {
      if (language === 'python') {
        // Mock output for the factorial function
        const hasImplementation = codeToRun.includes('return') && !codeToRun.includes('pass');
        
        if (hasImplementation) {
          setOutput('120\n\nExecution successful.');
        } else {
          setOutput('Error: Function not fully implemented.');
        }
      } else if (language === 'java') {
        setOutput('Error: Java execution environment not available in demo.');
      } else if (language === 'cpp') {
        setOutput('Error: C++ execution environment not available in demo.');
      }
    }, 1000);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      navigate(`/assignments/${id}`);
    }, 2000);
  };

  const handleBack = () => {
    navigate(`/assignments/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={handleBack}
            className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Python Basics Quiz
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Due: June 15, 2025 • Introduction to Python
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={() => handleSaveCode(code)}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md flex items-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Save size={18} className="mr-2" /> Save Draft
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 disabled:opacity-70 transition-colors"
          >
            {isSubmitting ? (
              <LoadingSpinner size="small" />
            ) : (
              <>
                <SendHorizontal size={18} className="mr-2" /> Submit
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Assignment Instructions
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                Implement the <code>calculate_factorial</code> function that computes the factorial of a given non-negative integer.
              </p>
              <ul>
                <li>The factorial of n is the product of all positive integers less than or equal to n.</li>
                <li>Factorial of 0 is 1.</li>
                <li>Example: factorial(5) = 5 × 4 × 3 × 2 × 1 = 120</li>
              </ul>
              <p className="font-medium">Requirements:</p>
              <ul>
                <li>Your solution must handle inputs of at least up to n=12.</li>
                <li>Implement the solution using a loop or recursion.</li>
                <li>Make sure to handle edge cases appropriately.</li>
              </ul>
            </div>
          </div>

          <CodeEditor
            initialValue={code}
            language={language}
            onSave={handleSaveCode}
            onRun={handleRunCode}
            height="400px"
          />
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Output
            </h2>
            <div className="bg-gray-100 dark:bg-gray-900 rounded-md p-4 font-mono text-sm whitespace-pre-wrap overflow-auto max-h-[300px]">
              {output || 'Run your code to see output here.'}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Test Cases
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                <span className="font-mono text-sm">calculate_factorial(0)</span>
                <span className="font-mono text-sm">→ 1</span>
              </div>
              <div className="flex justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                <span className="font-mono text-sm">calculate_factorial(1)</span>
                <span className="font-mono text-sm">→ 1</span>
              </div>
              <div className="flex justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                <span className="font-mono text-sm">calculate_factorial(5)</span>
                <span className="font-mono text-sm">→ 120</span>
              </div>
              <div className="flex justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                <span className="font-mono text-sm">calculate_factorial(10)</span>
                <span className="font-mono text-sm">→ 3628800</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentEditorPage;