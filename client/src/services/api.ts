import axios from 'axios';
import type { Project, CreateProjectDto } from '../types/project';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const projectsApi = {
  // Listar todos os projetos
  getAll: async (): Promise<Project[]> => {
    const response = await api.get<Project[]>('/projects');
    return response.data;
  },

  // Buscar um projeto específico
  getById: async (id: string): Promise<Project> => {
    const response = await api.get<Project>(`/projects/${id}`);
    return response.data;
  },

  // Criar um novo projeto
  create: async (project: CreateProjectDto): Promise<Project> => {
    const response = await api.post<Project>('/projects', project);
    return response.data;
  },

  // Atualizar projeto (status e outros campos)
  update: async (id: string, updateData: Partial<Project>): Promise<Project> => {
    const response = await api.patch<Project>(`/projects/${id}`, updateData);
    return response.data;
  },

  // Deletar um projeto
  delete: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },
};

export default api;