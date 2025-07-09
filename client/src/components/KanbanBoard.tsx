import { useState } from 'react';
import { Plus, Settings, X } from 'lucide-react';
import type { Project, Column } from '../types/project';
import ProjectCard from './ProjectCard';
import ColumnManager from './ColumnManager';

interface KanbanBoardProps {
  projects: Project[];
  columns: Column[];
  onUpdateProject: (id: string, updates: Partial<Project>) => void;
  onDeleteProject: (id: string) => void;
  onCreateColumn: (column: { name: string; color: string }) => void;
  onUpdateColumn: (id: string, updates: Partial<Column>) => void;
  onDeleteColumn: (id: string) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  projects,
  columns,
  onUpdateProject,
  onDeleteProject,
  onCreateColumn,
  onUpdateColumn,
  onDeleteColumn
}) => {
  const [showColumnManager, setShowColumnManager] = useState(false);
  const [draggedProject, setDraggedProject] = useState<Project | null>(null);
  const [draggedOverColumn, setDraggedOverColumn] = useState<string | null>(null);

  const getProjectsByStatus = (status: string) => {
    return projects.filter(project => project.status === status);
  };

  const handleDragStart = (e: React.DragEvent, project: Project) => {
    setDraggedProject(project);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    setDraggedOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDraggedOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    if (draggedProject && draggedProject.status !== columnId) {
      onUpdateProject(draggedProject.id, { status: columnId });
    }
    setDraggedProject(null);
    setDraggedOverColumn(null);
  };

  const getColumnColor = (color: string) => {
    const colors = {
      gray: 'bg-gray-100 border-gray-200',
      blue: 'bg-blue-50 border-blue-200',
      green: 'bg-green-50 border-green-200',
      red: 'bg-red-50 border-red-200',
      yellow: 'bg-yellow-50 border-yellow-200',
      purple: 'bg-purple-50 border-purple-200',
      pink: 'bg-pink-50 border-pink-200',
      indigo: 'bg-indigo-50 border-indigo-200',
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  const getColumnHeaderColor = (color: string) => {
    const colors = {
      gray: 'text-gray-700',
      blue: 'text-blue-700',
      green: 'text-green-700',
      red: 'text-red-700',
      yellow: 'text-yellow-700',
      purple: 'text-purple-700',
      pink: 'text-pink-700',
      indigo: 'text-indigo-700',
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  const sortedColumns = [...columns].sort((a, b) => a.order - b.order);

  return (
    <div className="h-full">
      {/* Header com botão de gerenciar colunas */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Projetos ({projects.length})
        </h2>
        <button
          onClick={() => setShowColumnManager(true)}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Settings className="h-4 w-4 mr-2" />
          Gerenciar Colunas
        </button>
      </div>

      {/* Grid de colunas com altura fixa */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedColumns.map((column) => {
          const columnProjects = getProjectsByStatus(column.id);
          const isDraggedOver = draggedOverColumn === column.id;
          
          return (
            <div
              key={column.id}
              className={`
                ${getColumnColor(column.color)} 
                ${isDraggedOver ? 'ring-2 ring-blue-400 ring-opacity-50' : ''}
                border rounded-lg h-96 flex flex-col
              `}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {/* Header da coluna */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    column.color === 'gray' ? 'bg-gray-400' :
                    column.color === 'blue' ? 'bg-blue-400' :
                    column.color === 'green' ? 'bg-green-400' :
                    column.color === 'red' ? 'bg-red-400' :
                    column.color === 'yellow' ? 'bg-yellow-400' :
                    column.color === 'purple' ? 'bg-purple-400' :
                    column.color === 'pink' ? 'bg-pink-400' :
                    column.color === 'indigo' ? 'bg-indigo-400' :
                    'bg-gray-400'
                  }`}></div>
                  <h3 className={`font-medium ${getColumnHeaderColor(column.color)}`}>
                    {column.name}
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded">
                    {columnProjects.length}
                  </span>
                  <button
                    onClick={() => onDeleteColumn(column.id)}
                    className="text-gray-400 hover:text-red-500 p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Área de cards com scroll */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {columnProjects.map((project) => (
                  <div
                    key={project.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, project)}
                    className="cursor-move"
                  >
                    <ProjectCard
                      project={project}
                      columns={columns}
                      onUpdate={(updates) => onUpdateProject(project.id, updates)}
                      onDelete={() => onDeleteProject(project.id)}
                    />
                  </div>
                ))}
                
                {/* Área de drop quando vazia */}
                {columnProjects.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <p className="text-sm">Arraste um projeto aqui</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Coluna para adicionar nova coluna */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg h-96 flex flex-col items-center justify-center">
          <button
            onClick={() => setShowColumnManager(true)}
            className="flex flex-col items-center text-gray-500 hover:text-gray-700 p-8"
          >
            <Plus className="h-8 w-8 mb-2" />
            <span className="text-sm font-medium">Nova Coluna</span>
          </button>
        </div>
      </div>

      {/* Modal de gerenciamento de colunas */}
      {showColumnManager && (
        <ColumnManager
          columns={columns}
          onCreateColumn={onCreateColumn}
          onUpdateColumn={onUpdateColumn}
          onDeleteColumn={onDeleteColumn}
          onClose={() => setShowColumnManager(false)}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
