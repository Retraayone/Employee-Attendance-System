import React, { useState, useEffect } from 'react';
import { Users, UserCircle, LogOut, UserPlus, Trash2 } from 'lucide-react';

type User = {
  id: string;
  name: string;
  role: 'admin' | 'employee';
  email: string;
  password: string;
};

type AttendanceRecord = {
  id: string;
  userId: string;
  date: string;
  checkIn: string;
  checkOut: string | null;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Admin User', role: 'admin', email: 'admin@gmail.com', password: 'admin' }
  ]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [showRegister, setShowRegister] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    const savedAttendance = localStorage.getItem('attendance');
    const savedSession = localStorage.getItem('currentUser');

    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
    if (savedAttendance) {
      setAttendanceRecords(JSON.parse(savedAttendance));
    }
    if (savedSession) {
      const user = JSON.parse(savedSession);
      setCurrentUser(user);
      setIsLoggedIn(true);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('attendance', JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setEmail('');
    setPassword('');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (users.some(u => u.email === newEmployee.email)) {
      setError('Email already exists');
      return;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: newEmployee.name,
      email: newEmployee.email,
      password: newEmployee.password,
      role: 'employee'
    };

    setUsers([...users, newUser]);
    setNewEmployee({ name: '', email: '', password: '' });
    setShowRegister(false);
    setError('');
  };

  const handleDeleteEmployee = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    setAttendanceRecords(attendanceRecords.filter(record => record.userId !== userId));
  };

  const handleCheckIn = () => {
    if (!currentUser) return;
    
    const newRecord: AttendanceRecord = {
      id: Date.now().toString(),
      userId: currentUser.id,
      date: new Date().toLocaleDateString(),
      checkIn: new Date().toLocaleTimeString(),
      checkOut: null,
    };
    
    setAttendanceRecords([...attendanceRecords, newRecord]);
  };

  const handleCheckOut = () => {
    if (!currentUser) return;
    
    setAttendanceRecords(records => 
      records.map(record => 
        record.userId === currentUser.id && !record.checkOut
          ? { ...record, checkOut: new Date().toLocaleTimeString() }
          : record
      )
    );
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Users className="mx-auto h-12 w-12 text-indigo-600" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Employee Attendance System
            </h2>
          </div>
          {!showRegister ? (
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <div className="flex flex-col space-y-4">
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={() => setShowRegister(true)}
                  className="w-full text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                >
                  Register as Employee
                </button>
              </div>
            </form>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleRegister}>
              <div className="rounded-md shadow-sm space-y-2">
                <div>
                  <input
                    type="text"
                    required
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Full Name"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    required
                    value={newEmployee.password}
                    onChange={(e) => setNewEmployee({...newEmployee, password: e.target.value})}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <div className="flex flex-col space-y-4">
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Register
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowRegister(false);
                    setError('');
                  }}
                  className="w-full text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                >
                  Back to Login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-indigo-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Users className="h-8 w-8" />
            <span className="font-semibold text-xl">Attendance System</span>
          </div>
          <div className="flex items-center space-x-4">
            <UserCircle className="h-6 w-6" />
            <span>{currentUser?.name}</span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-800"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {currentUser?.role === 'admin' ? (
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Manage Employees</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.filter(user => user.role === 'employee').map(user => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleDeleteEmployee(user.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Attendance Records</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {attendanceRecords.map(record => (
                      <tr key={record.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {users.find(u => u.id === record.userId)?.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{record.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{record.checkIn}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{record.checkOut || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">My Attendance</h2>
            <div className="flex space-x-4 mb-6">
              <button
                onClick={handleCheckIn}
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Check In
              </button>
              <button
                onClick={handleCheckOut}
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Check Out
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendanceRecords
                    .filter(record => record.userId === currentUser?.id)
                    .map(record => (
                      <tr key={record.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{record.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{record.checkIn}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{record.checkOut || '-'}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;