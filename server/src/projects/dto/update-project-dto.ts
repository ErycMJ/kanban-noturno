import { ProjectStatus } from '../entities/project.entity';

export class UpdateProjectDto {
  name?: string;
  description?: string;
  responsible?: string;
  status?: ProjectStatus;
}