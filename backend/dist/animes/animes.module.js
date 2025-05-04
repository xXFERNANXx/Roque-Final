"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimesModule = void 0;
const common_1 = require("@nestjs/common");
const animes_service_1 = require("./animes.service");
const animes_controller_1 = require("./animes.controller");
const typeorm_1 = require("@nestjs/typeorm");
const anime_entity_1 = require("./entities/anime.entity");
let AnimesModule = class AnimesModule {
};
exports.AnimesModule = AnimesModule;
exports.AnimesModule = AnimesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([anime_entity_1.Anime])],
        controllers: [animes_controller_1.AnimesController],
        providers: [animes_service_1.AnimesService],
    })
], AnimesModule);
//# sourceMappingURL=animes.module.js.map