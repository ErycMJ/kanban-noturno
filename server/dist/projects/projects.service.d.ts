import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
export declare class ProjectsService {
    private projects;
    create(createProjectDto: CreateProjectDto): Project;
    findAll(): Project[];
    findOne(id: string): Project;
    update(id: string, updateProjectDto: UpdateProjectDto): Project;
    remove(id: string): void;
}
