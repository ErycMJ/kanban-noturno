import { useState, useEffect } from 'react';
import { Plus, AlertCircle, X, Kanban } from 'lucide-react';
import { projectsApi } from './services/api';
import type { Project, CreateProjectDto, Column } from './types/project';
import KanbanBoard from './components/KanbanBoard';
import ProjectForm from './components/ProjectForm';

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Carregar projetos ao inicializar
  useEffect(() => {
    loadProjects();
    loadColumns();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Buscar sempre da API
      const data = await projectsApi.getAll();
      setProjects(data);
      
    } catch (err) {
      console.error('Erro ao carregar projetos da API:', err);
      setError('Não foi possível conectar com a API. Verifique se o servidor está rodando.');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const loadColumns = () => {
    // Colunas padrão sincronizadas com o backend
    const defaultColumns: Column[] = [
      { id: 'pending', name: 'A Fazer', color: 'gray', order: 1 },
      { id: 'in_progress', name: 'Em Progresso', color: 'blue', order: 2 },
      { id: 'completed', name: 'Finalizado', color: 'green', order: 3 }
    ];
    
    // Tentar carregar do localStorage
    const savedColumns = localStorage.getItem('kanban-columns');
    if (savedColumns) {
      setColumns(JSON.parse(savedColumns));
    } else {
      setColumns(defaultColumns);
      localStorage.setItem('kanban-columns', JSON.stringify(defaultColumns));
    }
  };

  const handleCreateProject = async (projectData: CreateProjectDto) => {
    try {
      const newProject = await projectsApi.create(projectData);
      setProjects(prev => [...prev, newProject]);
      setShowForm(false);
      if (error) setError(null);
    } catch (err) {
      console.error('Erro ao criar projeto:', err);
      setError('Erro ao criar projeto. Verifique se o servidor está rodando.');
    }
  };

  const handleUpdateProject = async (id: string, updates: Partial<Project>) => {
    try {
      const updatedProject = await projectsApi.update(id, updates);
      setProjects(prev => prev.map(p => p.id === id ? updatedProject : p));
      if (error) setError(null);
    } catch (err) {
      console.error('Erro ao atualizar projeto:', err);
      setError('Erro ao atualizar projeto. Verifique se o servidor está rodando.');
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await projectsApi.delete(id);
      setProjects(prev => prev.filter(p => p.id !== id));
      if (error) setError(null);
    } catch (err) {
      console.error('Erro ao deletar projeto:', err);
      setError('Erro ao deletar projeto. Verifique se o servidor está rodando.');
    }
  };

  const handleUpdateColumn = (id: string, updates: Partial<Column>) => {
    setColumns(prev => {
      const updated = prev.map(col => col.id === id ? { ...col, ...updates } : col);
      localStorage.setItem('kanban-columns', JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteColumn = (columnId: string) => {
    setColumns(prev => {
      const updated = prev.filter(col => col.id !== columnId);
      localStorage.setItem('kanban-columns', JSON.stringify(updated));
      return updated;
    });
  };

  const handleCreateColumn = (columnData: { name: string; color: string }) => {
    const newColumn: Column = {
      id: Date.now().toString(),
      name: columnData.name,
      color: columnData.color,
      order: columns.length + 1
    };
    setColumns(prev => {
      const updated = [...prev, newColumn];
      localStorage.setItem('kanban-columns', JSON.stringify(updated));
      return updated;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Carregando Projetos</h2>
          <p className="text-gray-500">Aguarde um momento...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Kanban className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Sistema Kanban</h1>
              </div>
            </div>
            
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Projeto
            </button>
          </div>
        </div>
      </header>

      {/* Error Alert */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
              <span className="text-red-800 text-sm">{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <KanbanBoard
          projects={projects}
          columns={columns}
          onUpdateProject={handleUpdateProject}
          onDeleteProject={handleDeleteProject}
          onUpdateColumn={handleUpdateColumn}
          onDeleteColumn={handleDeleteColumn}
          onCreateColumn={handleCreateColumn}
        />
      </main>

      {/* Modal para Novo Projeto */}
      {showForm && (
        <ProjectForm
          onSubmit={handleCreateProject}
          onCancel={() => setShowForm(false)}
          columns={columns}
        />
      )}
    </div>
  );
}

export default App;
