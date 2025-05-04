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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAnimeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_anime_dto_1 = require("./create-anime.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class UpdateAnimeDto extends (0, mapped_types_1.PartialType)(create_anime_dto_1.CreateAnimeDto) {
}
exports.UpdateAnimeDto = UpdateAnimeDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'El título debe ser una cadena de texto' }),
    (0, class_validator_1.Length)(1, 100, { message: 'El título debe tener entre 1 y 100 caracteres' }),
    __metadata("design:type", String)
], UpdateAnimeDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'La sinopsis debe ser una cadena de texto' }),
    __metadata("design:type", String)
], UpdateAnimeDto.prototype, "synopsis", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)({ message: 'Formato de fecha inválido' }),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], UpdateAnimeDto.prototype, "releaseDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)({ message: 'Formato de fecha inválido' }),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], UpdateAnimeDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'La temporada debe ser una cadena de texto' }),
    (0, class_validator_1.Length)(1, 20, { message: 'La temporada debe tener entre 1 y 20 caracteres' }),
    __metadata("design:type", String)
], UpdateAnimeDto.prototype, "season", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['En emisión', 'Finalizado', 'Próximamente'], { message: 'Estado inválido. Debe ser: En emisión, Finalizado o Próximamente' }),
    __metadata("design:type", String)
], UpdateAnimeDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['TV', 'OVA', 'Película', 'Especial', 'ONA'], { message: 'Tipo inválido. Debe ser: TV, OVA, Película, Especial u ONA' }),
    __metadata("design:type", String)
], UpdateAnimeDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'El número de episodios debe ser un entero' }),
    (0, class_validator_1.Min)(1, { message: 'El mínimo de episodios es 1' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateAnimeDto.prototype, "episodeCount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'La duración debe ser un número entero' }),
    (0, class_validator_1.Min)(1, { message: 'La duración mínima es 1 minuto' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateAnimeDto.prototype, "episodeDuration", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Todos', '+13', '+16', '+18'], { message: 'Clasificación inválida. Debe ser: Todos, +13, +16 o +18' }),
    __metadata("design:type", String)
], UpdateAnimeDto.prototype, "ageRating", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0, { message: 'La puntuación mínima es 0' }),
    (0, class_validator_1.Max)(10, { message: 'La puntuación máxima es 10' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateAnimeDto.prototype, "averageScore", void 0);
//# sourceMappingURL=update-anime.dto.js.map