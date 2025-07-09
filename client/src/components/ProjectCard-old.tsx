import type { Project } from '../types/project';
import { ProjectStatus } from '../types/project';

interface ProjectCardProps {
  project: Project;
  onUpdateStatus: (id: string, status: ProjectStatus) => void;
  onDelete?: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onUpdateStatus, onDelete }) => {
  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.PENDING:
        return 'bg-gray-200 text-gray-800';
      case ProjectStatus.IN_PROGRESS:
        return 'bg-blue-200 text-blue-800';
      case ProjectStatus.COMPLETED:
        return 'bg-green-200 text-green-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const getStatusText = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.PENDING:
        return 'Não Iniciado';
      case ProjectStatus.IN_PROGRESS:
        return 'Em Andamento';
      case ProjectStatus.COMPLETED:
        return 'Finalizado';
      default:
        return status;
    }
  };

  const getNextStatus = (currentStatus: ProjectStatus) => {
    switch (currentStatus) {
      case ProjectStatus.PENDING:
        return ProjectStatus.IN_PROGRESS;
      case ProjectStatus.IN_PROGRESS:
        return ProjectStatus.COMPLETED;
      case ProjectStatus.COMPLETED:
        return ProjectStatus.PENDING;
      default:
        return ProjectStatus.PENDING;
    }
  };

  const getNextStatusText = (currentStatus: ProjectStatus) => {
    const nextStatus = getNextStatus(currentStatus);
    return getStatusText(nextStatus);
  };

  const getStatusIcon = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.PENDING:
        return '⏳';
      case ProjectStatus.IN_PROGRESS:
        return '🔄';
      case ProjectStatus.COMPLETED:
        return '✅';
      default:
        return '📋';
    }
  };

  const handleStatusUpdate = () => {
    const nextStatus = getNextStatus(project.status);
    onUpdateStatus(project.id, nextStatus);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow">
      {/* Header do card */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800 truncate pr-2">
          {project.name}
        </h3>
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
          <span className="mr-1">{getStatusIcon(project.status)}</span>
          {getStatusText(project.status)}
        </span>
      </div>
      
      {/* Descrição */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {project.description}
      </p>
      
      {/* Responsável */}
      <div className="flex items-center mb-4 p-2 bg-gray-50 rounded-lg">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
          {project.responsible.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800">
            {project.responsible}
          </p>
          <p className="text-xs text-gray-500">
            Responsável
          </p>
        </div>
      </div>
      
      {/* Rodapé */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          {formatDate(project.createdAt)}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleStatusUpdate}
            className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-md transition-colors"
          >
            → {getNextStatusText(project.status)}
          </button>
          
          {onDelete && (
            <button
              onClick={() => onDelete(project.id)}
              className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded-md transition-colors"
            >
              🗑️
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;