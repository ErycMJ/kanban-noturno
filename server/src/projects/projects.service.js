"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
var common_1 = require("@nestjs/common");
var project_entity_1 = require("./entities/project.entity");
var uuid_1 = require("uuid");
var ProjectsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ProjectsService = _classThis = /** @class */ (function () {
        function ProjectsService_1() {
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
        ProjectsService_1.prototype.create = function (createProjectDto) {
            var project = __assign(__assign({ id: (0, uuid_1.v4)() }, createProjectDto), { status: createProjectDto.status || project_entity_1.ProjectStatus.PENDING, createdAt: new Date(), updatedAt: new Date() });
            this.projects.push(project);
            return project;
        };
        ProjectsService_1.prototype.findAll = function () {
            return this.projects;
        };
        ProjectsService_1.prototype.findOne = function (id) {
            var project = this.projects.find(function (p) { return p.id === id; });
            if (!project) {
                throw new common_1.NotFoundException("Project with ID ".concat(id, " not found"));
            }
            return project;
        };
        ProjectsService_1.prototype.update = function (id, updateProjectDto) {
            var projectIndex = this.projects.findIndex(function (p) { return p.id === id; });
            if (projectIndex === -1) {
                throw new common_1.NotFoundException("Project with ID ".concat(id, " not found"));
            }
            this.projects[projectIndex] = __assign(__assign(__assign({}, this.projects[projectIndex]), updateProjectDto), { updatedAt: new Date() });
            return this.projects[projectIndex];
        };
        ProjectsService_1.prototype.remove = function (id) {
            var projectIndex = this.projects.findIndex(function (p) { return p.id === id; });
            if (projectIndex === -1) {
                throw new common_1.NotFoundException("Project with ID ".concat(id, " not found"));
            }
            this.projects.splice(projectIndex, 1);
        };
        return ProjectsService_1;
    }());
    __setFunctionName(_classThis, "ProjectsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProjectsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProjectsService = _classThis;
}();
exports.ProjectsService = ProjectsService;
