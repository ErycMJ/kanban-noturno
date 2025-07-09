"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProjectDto = void 0;
const project_entity_1 = require("../entities/project.entity");
class CreateProjectDto {
    constructor() {
        this.status = project_entity_1.ProjectStatus.PENDING;
    }
}
exports.CreateProjectDto = CreateProjectDto;
//# sourceMappingURL=create-project.dto.js.map