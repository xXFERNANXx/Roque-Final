"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimesController = void 0;
const common_1 = require("@nestjs/common");
const animes_service_1 = require("./animes.service");
const create_anime_dto_1 = require("./dto/create-anime.dto");
const update_anime_dto_1 = require("./dto/update-anime.dto");
const id_validation_pipe_1 = require("../common/pipes/id-validation/id-validation.pipe");
let AnimesController = class AnimesController {
    constructor(animesService) {
        this.animesService = animesService;
    }
    create(createAnimeDto) {
        return this.animesService.create(createAnimeDto);
    }
    findAll() {
        return this.animesService.findAll();
    }
    findOne(id) {
        return this.animesService.findOne(+id);
    }
    update(id, updateAnimeDto) {
        return this.animesService.update(+id, updateAnimeDto);
    }
    remove(id) {
        return this.animesService.remove(+id);
    }
};
exports.AnimesController = AnimesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_anime_dto_1.CreateAnimeDto]),
    __metadata("design:returntype", void 0)
], AnimesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnimesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnimesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_anime_dto_1.UpdateAnimeDto]),
    __metadata("design:returntype", void 0)
], AnimesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnimesController.prototype, "remove", null);
exports.AnimesController = AnimesController = __decorate([
    (0, common_1.Controller)('animes'),
    __metadata("design:paramtypes", [animes_service_1.AnimesService])
], AnimesController);
//# sourceMappingURL=animes.controller.js.map