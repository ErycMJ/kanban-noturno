import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectStatus } from './entities/project.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProjectsService {
  private projects: Project[] = [
    {
      id: '1',
      name: 'Proteção de Gotham',
      description: 'Patrulhar as ruas de Gotham City durante a noite',
      responsible: 'Dick Grayson',
      status: ProjectStatus.IN_PROGRESS,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Treinamento dos Titãs',
      description: 'Coordenar treinamentos da equipe dos Jovens Titãs',
      responsible: 'Nightwing',
      status: ProjectStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      name: 'Investigação do Crime Organizado',
      description: 'Investigar conexões entre famílias criminosas de Blüdhaven',
      responsible: 'Dick Grayson',
      status: ProjectStatus.COMPLETED,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  create(createProjectDto: CreateProjectDto): Project {
    const project: Project = {
      id: uuidv4(),
      ...createProjectDto,
      status: createProjectDto.status || ProjectStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.projects.push(project);
    return project;
  }

  findAll(): Project[] {
    return this.projects;
  }

  findOne(id: string): Project {
    const project = this.projects.find(p => p.id === id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  update(id: string, updateProjectDto: UpdateProjectDto): Project {
    const projectIndex = this.projects.findIndex(p => p.id === id);
    if (projectIndex === -1) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    this.projects[projectIndex] = {
      ...this.projects[projectIndex],
      ...updateProjectDto,
      updatedAt: new Date(),
    };

    return this.projects[projectIndex];
  }

  remove(id: string): void {
    const projectIndex = this.projects.findIndex(p => p.id === id);
    if (projectIndex === -1) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    this.projects.splice(projectIndex, 1);
  }
}