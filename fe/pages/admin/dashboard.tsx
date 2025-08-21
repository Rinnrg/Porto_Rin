
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/AdminLayout";
// import { api } from "@/services/api"; // Removed - services folder deleted
import Swal from 'sweetalert2';
import { 
  FolderOpen, 
  User, 
  Download, 
  TrendingUp, 
  Calendar,
  Eye,
  Activity,
  ArrowUpRight,
  BarChart3,
  Clock,
  LogOut,
  Wifi,
  WifiOff
} from "lucide-react";

interface DashboardStats {
  totalProjects: number;
  totalViews: number;
  recentProjects: number;
  activeProjects: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    totalViews: 0,
    recentProjects: 0,
    activeProjects: 0
  });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [backendStatus, setBackendStatus] = useState('checking'); // checking, connected, disconnected

  useEffect(() => {
    fetchDashboardData();
    checkBackendConnection();
  }, []);

  const checkBackendConnection = async () => {
    try {
      setBackendStatus('checking');
      // const userData = await api.me(); // API service removed
      // setUser(userData);
      
      // Check if user is stored in localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setBackendStatus('connected');
      } else {
        setBackendStatus('disconnected');
      }
    } catch (error) {
      console.error('Backend connection failed:', error);
      setBackendStatus('disconnected');
    }
  };

  const fetchDashboardData = async () => {
    try {
      // Mock data for now - replace with actual API when available
      setStats({
        totalProjects: 8,
        totalViews: Math.floor(Math.random() * 10000) + 1000,
        recentProjects: 2,
        activeProjects: 6
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: 'Konfirmasi Logout',
        text: 'Apakah Anda yakin ingin keluar dari dashboard?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#dc2626',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Ya, Logout',
        cancelButtonText: 'Batal',
        reverseButtons: true,
        backdrop: true,
        allowOutsideClick: false
      });

      if (result.isConfirmed) {
        // Show loading
        Swal.fire({
          title: 'Logging out...',
          text: 'Mohon tunggu sebentar',
          icon: 'info',
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        try {
          // await api.logout(); // API service removed
          
          // Clear localStorage instead
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          
          await Swal.fire({
            title: 'Logout Berhasil!',
            text: 'Anda telah berhasil keluar dari dashboard',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
            timerProgressBar: true
          });

          router.push('/admin/login');
        } catch (error) {
          console.error('Logout error:', error);
          
          await Swal.fire({
            title: 'Logout',
            text: 'Sesi Anda telah berakhir',
            icon: 'info',
            timer: 1500,
            showConfirmButton: false,
            timerProgressBar: true
          });

          router.push('/admin/login');
        }
      }
    } catch (error) {
      console.error('Logout confirmation error:', error);
      router.push('/admin/login');
    }
  };

  const navigationCards = [
    {
      title: "Kelola Proyek",
      description: "Tambah, edit, dan hapus proyek portfolio Anda",
      icon: FolderOpen,
      href: "/admin/proyek",
      color: "from-blue-500 to-blue-600",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      title: "Lihat CV",
      description: "Download dan kelola curriculum vitae",
      icon: Download,
      href: "https://drive.google.com/file/d/10ZxX_qmXEmdryI-lygfR6YDdMoAfwMb5/view?usp=drive_link",
      color: "from-green-500 to-green-600",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      external: true
    },
    {
      title: "About Me",
      description: "Informasi tentang diri dan pengalaman",
      icon: User,
      href: "/tentangku",
      color: "from-purple-500 to-purple-600",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      external: true
    }
  ];

  const statsCards = [
    {
      title: "Total Proyek",
      value: stats.totalProjects,
      icon: FolderOpen,
      change: "+12%",
      changeType: "positive",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Total Views",
      value: stats.totalViews.toLocaleString(),
      icon: Eye,
      change: "+23%",
      changeType: "positive",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Proyek Baru (30 hari)",
      value: stats.recentProjects,
      icon: Calendar,
      change: "+5%",
      changeType: "positive",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Proyek Aktif",
      value: stats.activeProjects,
      icon: Activity,
      change: "+8%",
      changeType: "positive",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">
                    Selamat Datang, {user?.name || user?.username || 'Admin'}! 👋
                  </h1>
                  {/* Backend Status Indicator */}
                  <div className="flex items-center space-x-2">
                    {backendStatus === 'connected' && (
                      <div className="flex items-center bg-green-500/20 px-2 py-1 rounded-lg border border-green-500/30">
                        <Wifi className="w-3 h-3 text-green-300 mr-1" />
                        <span className="text-xs text-green-300 font-medium">Connected</span>
                      </div>
                    )}
                    {backendStatus === 'disconnected' && (
                      <div className="flex items-center bg-red-500/20 px-2 py-1 rounded-lg border border-red-500/30">
                        <WifiOff className="w-3 h-3 text-red-300 mr-1" />
                        <span className="text-xs text-red-300 font-medium">Offline</span>
                      </div>
                    )}
                    {backendStatus === 'checking' && (
                      <div className="flex items-center bg-yellow-500/20 px-2 py-1 rounded-lg border border-yellow-500/30">
                        <div className="w-3 h-3 bg-yellow-300 rounded-full animate-pulse mr-1"></div>
                        <span className="text-xs text-yellow-300 font-medium">Checking...</span>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-indigo-100 text-lg">
                  Kelola portfolio dan proyek Anda dengan mudah
                </p>
                <div className="mt-4 flex items-center space-x-4 text-indigo-100">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      Last updated: {new Date().toLocaleDateString('id-ID')}
                    </span>
                  </div>
                  {user?.email && (
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <BarChart3 className="w-20 h-20 text-indigo-200" />
                <button
                  onClick={handleLogout}
                  className="flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 border border-white/20 hover:border-white/30 backdrop-blur-sm"
                  title="Logout dari dashboard"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
              {/* Mobile logout button */}
              <div className="md:hidden">
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 border border-white/20 hover:border-white/30 backdrop-blur-sm"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600 font-medium">
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">vs last month</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {navigationCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  onClick={() => {
                    if (card.external) {
                      window.open(card.href, '_blank');
                    } else {
                      router.push(card.href);
                    }
                  }}
                  className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${card.iconBg}`}>
                      <Icon className={`w-6 h-6 ${card.iconColor}`} />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {card.description}
                  </p>

                  <div className={`mt-4 h-1 bg-gradient-to-r ${card.color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300`}></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            <button
              onClick={() => router.push('/admin/proyek')}
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center"
            >
              View All
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-4"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Dashboard updated successfully</p>
                <p className="text-xs text-gray-500">{new Date().toLocaleDateString('id-ID')}</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-4"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">System ready for project management</p>
                <p className="text-xs text-gray-500">{new Date().toLocaleDateString('id-ID')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
