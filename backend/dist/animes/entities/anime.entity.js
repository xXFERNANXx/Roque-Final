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
exports.Anime = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let Anime = class Anime {
};
exports.Anime = Anime;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Anime.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El título es obligatorio' }),
    (0, class_validator_1.Length)(1, 100, { message: 'El título debe tener entre 1 y 100 caracteres' }),
    (0, class_validator_1.IsString)({ message: 'El título debe ser una cadena de texto' }),
    __metadata("design:type", String)
], Anime.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: 'Sin sinopsis disponible' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La sinopsis es obligatoria' }),
    (0, class_validator_1.IsString)({ message: 'La sinopsis debe ser una cadena de texto' }),
    __metadata("design:type", String)
], Anime.prototype, "synopsis", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    (0, class_validator_1.IsDate)({ message: 'Formato de fecha inválido' }),
    __metadata("design:type", Date)
], Anime.prototype, "releaseDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)({ message: 'Formato de fecha inválido' }),
    __metadata("design:type", Date)
], Anime.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'Desconocida' }),
    (0, class_validator_1.IsString)({ message: 'La temporada debe ser una cadena de texto' }),
    (0, class_validator_1.Length)(1, 20, { message: 'La temporada debe tener entre 1 y 20 caracteres' }),
    __metadata("design:type", String)
], Anime.prototype, "season", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['En emisión', 'Finalizado', 'Próximamente'], default: 'Próximamente' }),
    (0, class_validator_1.IsEnum)(['En emisión', 'Finalizado', 'Próximamente'], { message: 'Estado inválido' }),
    __metadata("design:type", String)
], Anime.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['TV', 'OVA', 'Película', 'Especial', 'ONA'], default: 'TV' }),
    (0, class_validator_1.IsEnum)(['TV', 'OVA', 'Película', 'Especial', 'ONA'], { message: 'Tipo inválido' }),
    __metadata("design:type", String)
], Anime.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    (0, class_validator_1.IsInt)({ message: 'El número de episodios debe ser un entero' }),
    (0, class_validator_1.Min)(1, { message: 'El mínimo de episodios es 1' }),
    __metadata("design:type", Number)
], Anime.prototype, "episodeCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 24 }),
    (0, class_validator_1.IsInt)({ message: 'La duración debe ser un número entero' }),
    (0, class_validator_1.Min)(1, { message: 'La duración mínima es 1 minuto' }),
    __metadata("design:type", Number)
], Anime.prototype, "episodeDuration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['Todos', '+13', '+16', '+18'], default: 'Todos' }),
    (0, class_validator_1.IsEnum)(['Todos', '+13', '+16', '+18'], { message: 'Clasificación inválida' }),
    __metadata("design:type", String)
], Anime.prototype, "ageRating", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 3, scale: 1, default: 0.0 }),
    (0, class_validator_1.Min)(0, { message: 'La puntuación mínima es 0' }),
    (0, class_validator_1.Max)(10, { message: 'La puntuación máxima es 10' }),
    __metadata("design:type", Number)
], Anime.prototype, "averageScore", void 0);
exports.Anime = Anime = __decorate([
    (0, typeorm_1.Entity)()
], Anime);
//# sourceMappingURL=anime.entity.js.map