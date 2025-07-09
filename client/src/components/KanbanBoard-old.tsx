import type { Project } from '../types/project';
import { ProjectStatus } from '../types/project';
import ProjectCard from './ProjectCard';

interface KanbanBoardProps {
  projects: Project[];
  onUpdateStatus: (id: string, status: ProjectStatus) => void;
  onDelete?: (id: string) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ projects, onUpdateStatus, onDelete }) => {
  const getProjectsByStatus = (status: ProjectStatus) => {
    return projects.filter(project => project.status === status);
  };

  const columns = [
    {
      status: ProjectStatus.PENDING,
      title: 'Não Iniciado',
      icon: '⏳',
      bgColor: 'bg-gray-100',
      borderColor: 'border-gray-300',
      textColor: 'text-gray-700'
    },
    {
      status: ProjectStatus.IN_PROGRESS,
      title: 'Em Andamento',
      icon: '🔄',
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-300',
      textColor: 'text-blue-700'
    },
    {
      status: ProjectStatus.COMPLETED,
      title: 'Finalizado',
      icon: '✅',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-300',
      textColor: 'text-green-700'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {columns.map((column) => {
        const columnProjects = getProjectsByStatus(column.status);
        return (
          <div key={column.status} className={`${column.bgColor} ${column.borderColor} border-2 rounded-lg p-4 min-h-[600px]`}>
            {/* Header da coluna */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-gray-300">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{column.icon}</span>
                <h2 className={`text-xl font-bold ${column.textColor}`}>
                  {column.title}
                </h2>
              </div>
              <span className={`${column.textColor} bg-white px-3 py-1 rounded-full text-sm font-medium shadow-sm`}>
                {columnProjects.length}
              </span>
            </div>
            
            {/* Conteúdo da coluna */}
            <div className="space-y-3">
              {columnProjects.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-4xl mb-3">{column.icon}</div>
                  <p className="text-lg font-medium mb-2">
                    Nenhum projeto {column.title.toLowerCase()}
                  </p>
                  <p className="text-sm">
                    Arraste ou adicione projetos aqui
                  </p>
                </div>
              ) : (
                columnProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onUpdateStatus={onUpdateStatus}
                    onDelete={onDelete}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;