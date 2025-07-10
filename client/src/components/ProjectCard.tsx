import { useState } from 'react';
import { Edit2, Trash2, User, Calendar, X, Check, Tag } from 'lucide-react';
import type { Project, Column } from '../types/project';

interface ProjectCardProps {
  project: Project;
  columns: Column[];
  onUpdate: (updates: Partial<Project>) => void;
  onDelete: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  columns,
  onUpdate, 
  onDelete 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: project.name,
    description: project.description,
    responsible: project.responsible,
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate({
      name: editForm.name,
      description: editForm.description,
      responsible: editForm.responsible,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: project.name,
      description: project.description,
      responsible: project.responsible,
    });
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getCurrentColumn = () => {
    return columns.find(col => col.id === project.status);
  };

  const getColumnTagColor = (color: string) => {
    const colors = {
      gray: 'bg-gray-100 text-gray-700',
      blue: 'bg-blue-100 text-blue-700',
      green: 'bg-green-100 text-green-700',
      red: 'bg-red-100 text-red-700',
      yellow: 'bg-yellow-100 text-yellow-700',
      purple: 'bg-purple-100 text-purple-700',
      pink: 'bg-pink-100 text-pink-700',
      indigo: 'bg-indigo-100 text-indigo-700',
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Projeto
            </label>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Responsável
            </label>
            <input
              type="text"
              value={editForm.responsible}
              onChange={(e) => setEditForm({ ...editForm, responsible: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              value={editForm.description}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-2">
            <button
              onClick={handleCancel}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <X className="h-4 w-4 mr-1" />
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Check className="h-4 w-4 mr-1" />
              Salvar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
          {project.name}
        </h3>
        <div className="flex space-x-1 ml-2">
          <button
            onClick={handleEdit}
            className="text-gray-400 hover:text-blue-500 p-1"
          >
            <Edit2 className="h-3 w-3" />
          </button>
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-500 p-1"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>
      
      <p className="text-xs text-gray-600 mb-3 line-clamp-3">
        {project.description}
      </p>
      
      {getCurrentColumn() && (
        <div className="mb-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getColumnTagColor(getCurrentColumn()!.color)}`}>
            <Tag className="h-3 w-3 mr-1" />
            {getCurrentColumn()!.name}
          </span>
        </div>
      )}
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center">
          <User className="h-3 w-3 mr-1" />
          <span>{project.responsible}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{formatDate(project.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;