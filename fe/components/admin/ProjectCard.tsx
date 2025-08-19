
import React from 'react';
import Image from 'next/image';
import { Calendar, Tag, ExternalLink, Github, Eye, Edit, Trash2 } from 'lucide-react';

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
  customSections?: any[];
  createdAt: string;
  updatedAt: string;
}

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
}

export default function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {(project.thumbnail || project.image) && (
        <div className="aspect-video bg-gray-100 overflow-hidden">
          <Image
            src={(project.thumbnail || project.image)!}
            alt={project.title}
            width={400}
            height={225}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
            {project.title}
          </h3>
          <div className="flex flex-col items-end gap-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              {project.category}
            </span>
            {project.subcategory && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                {project.subcategory}
              </span>
            )}
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(project.date).toLocaleDateString('id-ID')}
          </span>
          <span className="flex items-center gap-1">
            <Tag className="w-3 h-3" />
            {project.slug}
          </span>
        </div>

        {project.technologies && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {project.technologies.split(',').slice(0, 3).map((tech, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                >
                  {tech.trim()}
                </span>
              ))}
              {project.technologies.split(',').length > 3 && (
                <span className="text-xs text-gray-500">+{project.technologies.split(',').length - 3} lainnya</span>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                title="View live demo"
                aria-label="View live demo"
                className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 text-sm"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {project.githubRepo && (
              <a
                href={project.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                title="View GitHub repository"
                aria-label="View GitHub repository"
                className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-700 text-sm"
              >
                <Github className="w-3 h-3" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`/project/${project.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              <Eye className="w-4 h-4" />
              Lihat
            </a>
            <button
              onClick={() => onEdit(project)}
              className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={() => onDelete(project.id)}
              className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium"
            >
              <Trash2 className="w-4 h-4" />
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
