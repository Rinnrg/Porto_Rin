"use client";
import { useState, useEffect, useCallback } from "react";
import AdminLayout from "@/components/AdminLayout";

export default function AdminCVTest() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading CV data...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Test Page</h1>
        </div>
      </div>
    </AdminLayout>
  );
}
