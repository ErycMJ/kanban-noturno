import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(createProjectDto: CreateProjectDto): import("./entities/project.entity").Project;
    findAll(): import("./entities/project.entity").Project[];
    findOne(id: string): import("./entities/project.entity").Project;
    update(id: string, updateProjectDto: UpdateProjectDto): import("./entities/project.entity").Project;
    remove(id: string): {
        message: string;
    };
}
