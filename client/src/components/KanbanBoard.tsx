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
    const colorMap = {
      gray: 'bg-gray-100 border-gray-200',
      blue: 'bg-gray-100 border-blue-200',
      green: 'bg-gray-100 border-green-200',
      red: 'bg-gray-100 border-red-200',
      yellow: 'bg-gray-100 border-yellow-200',
      purple: 'bg-gray-100 border-purple-200',
      pink: 'bg-gray-100 border-pink-200',
      indigo: 'bg-gray-100 border-indigo-200',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.gray;
  };

  const getColumnHeaderColor = (color: string) => {
    const colorMap = {
      gray: 'text-gray-700',
      blue: 'text-blue-700',
      green: 'text-green-800',
      red: 'text-red-700',
      yellow: 'text-yellow-700',
      purple: 'text-purple-700',
      pink: 'text-pink-700',
      indigo: 'text-indigo-700',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.gray;
  };

  const getColumnDotColor = (color: string) => {
    const colorMap = {
      gray: 'bg-gray-400',
      blue: 'bg-blue-400',
      green: 'bg-green-400',
      red: 'bg-red-400',
      yellow: 'bg-yellow-400',
      purple: 'bg-purple-400',
      pink: 'bg-pink-400',
      indigo: 'bg-indigo-400',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.gray;
  };

  const sortedColumns = [...columns].sort((a, b) => a.order - b.order);

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-white">
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
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${getColumnDotColor(column.color)}`}></div>
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
                
                {columnProjects.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <p className="text-sm">Arraste um projeto aqui</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <div className="border-2 border-dashed border-gray-300 rounded-lg h-96 flex flex-col items-center justify-center">
          <button
            onClick={() => setShowColumnManager(true)}
            className="flex flex-col items-center text-gray-500 hover:text-gray-700 p-8"
          >
            <Plus className="text-white h-8 w-8 mb-2" />
            <span className="text-white text-sm font-medium">Nova Coluna</span>
          </button>
        </div>
      </div>

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