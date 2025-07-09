"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const project_entity_1 = require("./entities/project.entity");
const uuid_1 = require("uuid");
let ProjectsService = class ProjectsService {
    constructor() {
        this.projects = [
            {
                id: '1',
                name: 'Proteção de Gotham',
                description: 'Patrulhar as ruas de Gotham City durante a noite',
                responsible: 'Dick Grayson',
                status: project_entity_1.ProjectStatus.IN_PROGRESS,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '2',
                name: 'Treinamento dos Titãs',
                description: 'Coordenar treinamentos da equipe dos Jovens Titãs',
                responsible: 'Nightwing',
                status: project_entity_1.ProjectStatus.PENDING,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '3',
                name: 'Investigação do Crime Organizado',
                description: 'Investigar conexões entre famílias criminosas de Blüdhaven',
                responsible: 'Dick Grayson',
                status: project_entity_1.ProjectStatus.COMPLETED,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
    }
    create(createProjectDto) {
        const project = {
            id: (0, uuid_1.v4)(),
            ...createProjectDto,
            status: createProjectDto.status || project_entity_1.ProjectStatus.PENDING,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.projects.push(project);
        return project;
    }
    findAll() {
        return this.projects;
    }
    findOne(id) {
        const project = this.projects.find(p => p.id === id);
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        }
        return project;
    }
    update(id, updateProjectDto) {
        const projectIndex = this.projects.findIndex(p => p.id === id);
        if (projectIndex === -1) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        }
        this.projects[projectIndex] = {
            ...this.projects[projectIndex],
            ...updateProjectDto,
            updatedAt: new Date(),
        };
        return this.projects[projectIndex];
    }
    remove(id) {
        const projectIndex = this.projects.findIndex(p => p.id === id);
        if (projectIndex === -1) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        }
        this.projects.splice(projectIndex, 1);
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)()
], ProjectsService);
//# sourceMappingURL=projects.service.js.map