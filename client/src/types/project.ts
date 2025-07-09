export interface Project {
  id: string;
  name: string;
  description: string;
  responsible: string;
  status: string; // Agora pode ser qualquer string (nome da coluna)
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: string;
  name: string;
  color: string;
  order: number;
}

export interface CreateProjectDto {
  name: string;
  description: string;
  responsible: string;
  status: string;
}

export interface UpdateProjectDto {
  name?: string;
  description?: string;
  responsible?: string;
  status?: string;
}

export interface CreateColumnDto {
  name: string;
  color: string;
}

export interface UpdateColumnDto {
  name?: string;
  color?: string;
  order?: number;
}

// Cores predefinidas
export const ColumnColors = {
  GRAY: 'gray',
  RED: 'red',
  YELLOW: 'yellow',
  GREEN: 'green',
  BLUE: 'blue',
  INDIGO: 'indigo',
  PURPLE: 'purple',
  PINK: 'pink',
} as const;

export type ColumnColor = typeof ColumnColors[keyof typeof ColumnColors];