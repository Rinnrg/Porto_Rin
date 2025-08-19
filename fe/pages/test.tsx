import React from 'react';

const TestPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-blue-600">Test Page</h1>
      <p className="text-gray-600">Jika Anda melihat halaman ini, server Next.js berjalan dengan baik!</p>
      <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
        ✅ Next.js server is working!
      </div>
    </div>
  );
};

export default TestPage;
