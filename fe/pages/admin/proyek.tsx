
"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import AdminLayout from "@/components/AdminLayout";
import Swal from "sweetalert2";
import { Plus } from "lucide-react";
import ProjectCard from "@/components/admin/ProjectCard";
import ProjectListTable from "@/components/admin/ProjectListTable";
import FilterAndSearch from "@/components/admin/FilterAndSearch";
import ProjectForm from "@/components/admin/ProjectForm";

interface CustomSection {
  id: string;
  name: string;
  sectionName: string;
  description: string;
  largeImages: string[];
  smallImages: string[];
  videos: string[];
}

interface Project {
  id: number;
  title: string;
  description: string;
  detailedDescription?: string;
  category: string;
  subcategory?: string;
  date: string;
  liveDemo?: string;
  githubRepo?: string;
  image?: string;
  thumbnail?: string;
  slug: string;
  technologies?: string;
  challenge?: string;
  solution?: string;
  philosophy?: string;
  aboutImage?: string;
  philosophyImage?: string;
  challengeImages?: string[];
  projectVideo?: string;
  customSections?: CustomSection[];
  createdAt: string;
  updatedAt: string;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterAndSortProjects();
  }, [projects, searchTerm, selectedCategory, sortBy]);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/projects`);
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      await Swal.fire({
        title: 'Error!',
        text: 'Gagal memuat data proyek.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProjects = () => {
    let filtered = projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.technologies?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === "Semua" || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    setFilteredProjects(filtered);
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Data proyek akan dihapus permanen!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/projects/${id}`, { method: 'DELETE' });
        await Swal.fire({
          title: 'Terhapus!',
          text: 'Proyek berhasil dihapus.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
        fetchProjects();
      } catch (error) {
        console.error('Failed to delete project:', error);
        await Swal.fire({
          title: 'Error!',
          text: 'Gagal menghapus proyek.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  const handleFormSubmit = () => {
    fetchProjects();
    handleCloseForm();
  };

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
        {/* Header */}
        <div className="mb-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Manajemen Proyek</h1>
              <p className="mt-2 text-sm text-gray-600">
                Kelola semua proyek dalam sistem ({filteredProjects.length} dari {projects.length} proyek)
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                Tambah Proyek
              </button>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <FilterAndSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* Projects Display */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">Tidak ada proyek yang ditemukan</div>
            <p className="text-gray-500">Coba ubah filter atau tambah proyek baru</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <ProjectListTable
            projects={filteredProjects}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      {showForm && (
        <ProjectForm
          project={editingProject}
          onClose={handleCloseForm}
          onSubmit={handleFormSubmit}
        />
      )}
    </AdminLayout>
  );
}
