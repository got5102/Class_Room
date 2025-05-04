import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  FileCode, 
  Edit2, 
  CheckCircle, 
  Users,
  BarChart,
  XCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ReactMarkdown from 'react-markdown';

// 課題データのモック
const mockAssignment = {
  id: '1',
  title: 'Python基礎クイズ',
  description: 'Pythonの基本的な概念（変数、データ型、制御構造、関数、エラー処理）の理解度を確認します。',
  className: 'Python入門',
  classId: '1',
  dueDate: '2025-06-15T23:59:59Z',
  points: 100,
  status: 'active',
  studentStatus: 'submitted',
  submissionCount: 38,
  totalStudents: 42,
  instructions: `
# 課題の説明

以下のPython関数を仕様に従って実装してください：

## 1. factorial(n)関数
- 非負整数nの階乗を計算する
- 階乗とは、nまでのすべての正の整数の積
- 例：factorial(5) = 5 × 4 × 3 × 2 × 1 = 120
- 0の階乗は1

## 2. is_prime(num)関数
- 数値が素数かどうかを判定する
- 素数とは、1より大きい自然数で、1とその数自身以外に約数を持たない数
- Trueまたは Falseを返す
- 例：is_prime(7)はTrue、is_prime(4)はFalse

## 3. find_duplicates(numbers)関数
- リスト内の重複する要素をすべて見つける
- 入力リスト内で2回以上出現する要素のリストを返す
- 例：find_duplicates([1, 2, 3, 2, 1, 5, 6, 5])は[1, 2, 5]を返す

### 要件：
- エッジケースを適切に処理すること
- コメントで実装方法を説明すること
- Pythonのコーディング規約に従うこと
`,
  testCases: [
    { input: 'calculate_factorial(0)', expected: '1' },
    { input: 'calculate_factorial(1)', expected: '1' },
    { input: 'calculate_factorial(5)', expected: '120' },
    { input: 'is_prime(7)', expected: 'True' },
    { input: 'is_prime(4)', expected: 'False' },
    { input: 'is_prime(1)', expected: 'False' },
    { input: 'find_duplicates([1, 2, 3, 2, 1, 5, 6, 5])', expected: '[1, 2, 5]' },
    { input: 'find_duplicates([1, 2, 3, 4])', expected: '[]' },
  ],
  studentSubmission: {
    submittedAt: '2025-06-10T14:32:15Z',
    code: `def calculate_factorial(n):
    """階乗を計算する関数"""
    if n == 0 or n == 1:
        return 1
    else:
        return n * calculate_factorial(n - 1)

def is_prime(num):
    """素数判定を行う関数"""
    if num <= 1:
        return False
    if num <= 3:
        return True
    if num % 2 == 0 or num % 3 == 0:
        return False
    i = 5
    while i * i <= num:
        if num % i == 0 or num % (i + 2) == 0:
            return False
        i += 6
    return True

def find_duplicates(numbers):
    """リスト内の重複要素を見つける関数"""
    seen = set()
    duplicates = set()
    for num in numbers:
        if num in seen:
            duplicates.add(num)
        else:
            seen.add(num)
    return list(duplicates)`,
    results: [
      { testCase: 'calculate_factorial(0)', passed: true, actual: '1' },
      { testCase: 'calculate_factorial(1)', passed: true, actual: '1' },
      { testCase: 'calculate_factorial(5)', passed: true, actual: '120' },
      { testCase: 'is_prime(7)', passed: true, actual: 'True' },
      { testCase: 'is_prime(4)', passed: true, actual: 'False' },
      { testCase: 'is_prime(1)', passed: true, actual: 'False' },
      { testCase: 'find_duplicates([1, 2, 3, 2, 1, 5, 6, 5])', passed: true, actual: '[1, 2, 5]' },
      { testCase: 'find_duplicates([1, 2, 3, 4])', passed: true, actual: '[]' },
    ],
    score: 100,
    feedback: '素晴らしい出来栄えです！コードが正確で、効率的、かつ適切にドキュメント化されています。',
  },
  classAverageScore: 85,
};

const AssignmentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const assignment = mockAssignment; // 実際のアプリではIDで取得
  const { user } = useAuth();
  const isTeacher = user?.role === 'teacher';
  
  const hasSubmission = assignment.studentSubmission !== undefined;
  const isSubmitted = assignment.studentStatus === 'submitted';
  
  // 提出期限までの時間を計算
  const dueDate = new Date(assignment.dueDate);
  const now = new Date();
  const timeUntilDue = dueDate.getTime() - now.getTime();
  const daysUntilDue = Math.floor(timeUntilDue / (1000 * 60 * 60 * 24));
  const isPastDue = timeUntilDue < 0;

  // テスト合格率を計算
  const passedTests = assignment.studentSubmission?.results.filter(r => r.passed).length || 0;
  const totalTests = assignment.testCases.length;
  const passRate = totalTests > 0 ? (passedTests / totalTests) * 100 : 0;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex items-center">
        <Link
          to="/assignments"
          className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="戻る"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {assignment.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {assignment.className} • {assignment.points}点
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                課題の説明
              </h2>
              
              {isPastDue ? (
                <div className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 text-xs px-2.5 py-1 rounded-full flex items-center">
                  <Clock size={14} className="mr-1" /> 期限切れ
                </div>
              ) : (
                <div className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 text-xs px-2.5 py-1 rounded-full flex items-center">
                  <Clock size={14} className="mr-1" /> あと{daysUntilDue}日
                </div>
              )}
            </div>
            
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown>{assignment.instructions}</ReactMarkdown>
            </div>
          </div>

          {hasSubmission && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                提出内容
              </h2>
              
              <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 font-mono text-sm whitespace-pre overflow-auto">
                {assignment.studentSubmission.code}
              </div>
              
              <div className="mt-6">
                <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                  テスト結果
                </h3>
                
                <div className="space-y-2">
                  {assignment.studentSubmission.results.map((result, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-md ${
                        result.passed 
                          ? 'bg-green-50 dark:bg-green-900/20' 
                          : 'bg-red-50 dark:bg-red-900/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-mono text-sm">
                          {result.testCase}
                        </div>
                        <div className={`flex items-center text-sm font-medium ${
                          result.passed 
                            ? 'text-green-700 dark:text-green-400' 
                            : 'text-red-700 dark:text-red-400'
                        }`}>
                          {result.passed ? (
                            <>
                              <CheckCircle size={16} className="mr-1" />
                              合格
                            </>
                          ) : (
                            <>
                              <XCircle size={16} className="mr-1" />
                              不合格
                            </>
                          )}
                        </div>
                      </div>
                      {!result.passed && (
                        <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="block text-gray-500 dark:text-gray-400">期待値:</span>
                            <span className="font-mono text-gray-900 dark:text-white">{assignment.testCases[index].expected}</span>
                          </div>
                          <div>
                            <span className="block text-gray-500 dark:text-gray-400">実際の値:</span>
                            <span className="font-mono text-gray-900 dark:text-white">{result.actual}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {assignment.studentSubmission.feedback && (
                <div className="mt-6">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                    講師からのフィードバック
                  </h3>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md text-gray-900 dark:text-white">
                    {assignment.studentSubmission.feedback}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            {isTeacher ? (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  クラスの進捗
                </h2>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">提出状況</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {assignment.submissionCount} / {assignment.totalStudents}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${(assignment.submissionCount / assignment.totalStudents) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">クラス平均</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {assignment.classAverageScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-green-500 h-2.5 rounded-full" 
                      style={{ width: `${assignment.classAverageScore}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-col space-y-3">
                  <Link
                    to={`/assignments/${id}/edit`}
                    className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Edit2 size={16} className="mr-2" />
                    課題を編集
                  </Link>
                  
                  <Link
                    to={`/assignments/${id}/submissions`}
                    className="inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    <Users size={16} className="mr-2" />
                    提出一覧を表示
                  </Link>
                  
                  <Link
                    to={`/assignments/${id}/analytics`}
                    className="inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
                  >
                    <BarChart size={16} className="mr-2" />
                    分析を表示
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  あなたの進捗
                </h2>
                
                {hasSubmission ? (
                  <div>
                    <div className="text-center mb-4">
                      <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-2">
                        <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                          {assignment.studentSubmission.score}%
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        あなたのスコア
                      </p>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">テスト合格率</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {passedTests} / {totalTests}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            passRate >= 90 ? 'bg-green-500' : passRate >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${passRate}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">クラス平均</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {assignment.classAverageScore}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${assignment.classAverageScore}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-gray-50 dark:bg-gray-700 rounded-md p-3">
                      <div className="flex items-center">
                        <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-2 mr-3">
                          <CheckCircle size={16} className="text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            提出完了
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(assignment.studentSubmission.submittedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
                      <FileCode size={24} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                      {isPastDue ? '提出期限切れ' : '未提出'}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {isPastDue
                        ? '提出期限が過ぎています。講師に相談してください。'
                        : '課題に取り組んで、進捗を確認しましょう。'}
                    </p>
                    
                    <Link
                      to={`/assignments/${id}/editor`}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {isPastDue ? '課題を確認' : '課題を開始'}
                    </Link>
                  </div>
                )}
                
                <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                  <Link
                    to={`/assignments/${id}/editor`}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    <Edit2 size={16} className="mr-2" />
                    {isSubmitted ? '提出内容を編集' : '課題に取り組む'}
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
              課題の詳細
            </h2>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">提出期限</p>
                <p className="text-sm text-gray-900 dark:text-white">
                  {new Date(assignment.dueDate).toLocaleString()}
                </p>
              </div>
              
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">配点</p>
                <p className="text-sm text-gray-900 dark:text-white">
                  {assignment.points}点
                </p>
              </div>
              
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">ステータス</p>
                <p className="text-sm text-gray-900 dark:text-white flex items-center">
                  {isPastDue ? (
                    <span className="flex items-center text-red-600 dark:text-red-400">
                      <Clock size={14} className="mr-1" /> 期限切れ
                    </span>
                  ) : (
                    <span className="flex items-center text-green-600 dark:text-green-400">
                      <Clock size={14} className="mr-1" /> 受付中
                    </span>
                  )}
                </p>
              </div>
              
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">クラス</p>
                <Link 
                  to={`/classes/${assignment.classId}`}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {assignment.className}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetailPage;