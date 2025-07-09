import { ProjectStatus } from '../entities/project.entity';

export class CreateProjectDto {
  name: string;
  description: string;
  responsible: string;
  status?: ProjectStatus = ProjectStatus.PENDING;
}