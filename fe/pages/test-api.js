// Test page untuk koneksi API Laravel Backend
// Akses di: http://localhost:3000/test-api
// NOTE: API service has been removed

import { useState } from 'react';
// import { api } from '../services/api'; // Commented out - services folder removed

export default function TestAPI() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testLogin = async () => {
    setLoading(true);
    setResult('Testing login...');
    
    try {
      // const response = await api.login('admin', '123456');
      // setResult(JSON.stringify(response, null, 2));
      setResult('API service has been removed - this test is no longer functional');
    } catch (error) {
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testMe = async () => {
    setLoading(true);
    setResult('Testing /api/me...');
    
    try {
      // const response = await api.me();
      // setResult(JSON.stringify(response, null, 2));
      setResult('API service has been removed - this test is no longer functional');
    } catch (error) {
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testLogout = async () => {
    setLoading(true);
    setResult('Testing logout...');
    
    try {
      // await api.logout();
      // setResult('Logout successful');
      setResult('API service has been removed - this test is no longer functional');
    } catch (error) {
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Laravel API Test</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">API Endpoints Test</h2>
          
          <div className="space-x-4 mb-6">
            <button
              onClick={testLogin}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Test Login
            </button>
            
            <button
              onClick={testMe}
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Test /api/me
            </button>
            
            <button
              onClick={testLogout}
              disabled={loading}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Test Logout
            </button>
          </div>

          <div className="bg-gray-50 rounded p-4">
            <h3 className="font-semibold mb-2">Result:</h3>
            <pre className="text-sm overflow-auto">{result || 'No test run yet'}</pre>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Connection Info</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Frontend:</strong> http://localhost:3000</p>
            <p><strong>Backend:</strong> {process.env.NEXT_PUBLIC_API_BASE_URL}</p>
            <p><strong>Auth Status:</strong> {/* api.isAuthenticated() ? 'Authenticated' : 'Not authenticated' */ 'API service removed'}</p>
            <p><strong>Stored User:</strong> {/* JSON.stringify(api.getStoredUser()) */ 'API service removed'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
