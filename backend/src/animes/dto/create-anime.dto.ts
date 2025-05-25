import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Length, Max, Min } from "class-validator";
import { Type } from "class-transformer";

export class CreateAnimeDto {
    @IsNotEmpty({ message: 'El título del anime no puede ir vacío' })
    @IsString({ message: 'El título debe ser una cadena de texto' })
    @Length(1, 100, { message: 'El título debe tener entre 1 y 100 caracteres' })
    title: string;

    @IsNotEmpty({ message: 'La sinopsis no puede ir vacía' })
    @IsString({ message: 'La sinopsis debe ser una cadena de texto' })
    synopsis: string;

    @IsOptional()
    @IsDate({ message: 'Formato de fecha Inicio inválido' })
    @Type(() => Date)
    releaseDate: Date;

    @IsOptional()
    @IsDate({ message: 'Formato de fecha Finalizado inválido' })
    @Type(() => Date)
    endDate?: Date;

    @IsNotEmpty({ message: 'La temporada es obligatoria' })
    @IsString({ message: 'La temporada debe ser una cadena de texto' })
    @Length(1, 20, { message: 'La temporada debe tener entre 1 y 20 caracteres' })
    season: string;

    @IsNotEmpty({ message: 'El estado es obligatorio' })
    @IsEnum(['En emisión', 'Finalizado', 'Próximamente'], { message: 'Estado inválido. Debe ser: En emisión, Finalizado o Próximamente' })
    status: 'En emisión' | 'Finalizado' | 'Próximamente';

    @IsNotEmpty({ message: 'El tipo es obligatorio' })
    @IsEnum(['TV', 'OVA', 'Película', 'Especial', 'ONA'], { message: 'Tipo inválido. Debe ser: TV, OVA, Película, Especial u ONA' })
    type: 'TV' | 'OVA' | 'Película' | 'Especial' | 'ONA';

    @IsNotEmpty({ message: 'El número de episodios es obligatorio' })
    @IsInt({ message: 'El número de episodios debe ser un entero' })
    @Min(1, { message: 'El mínimo de episodios es 1' })
    @Type(() => Number)
    episodeCount: number;

    @IsNotEmpty({ message: 'La duración del episodio es obligatoria' })
    @IsInt({ message: 'La duración debe ser un número entero' })
    @Min(1, { message: 'La duración mínima es 1 minuto' })
    @Type(() => Number)
    episodeDuration: number;

    @IsNotEmpty({ message: 'La clasificación por edad es obligatoria' })
    @IsEnum(['Todos', '+13', '+16', '+18'], { message: 'Clasificación inválida. Debe ser: Todos, +13, +16 o +18' })
    ageRating: 'Todos' | '+13' | '+16' | '+18';

    @IsOptional()
    @Min(0, { message: 'La puntuación mínima es 0' })
    @Max(10, { message: 'La puntuación máxima es 10' })
    @Type(() => Number)
    averageScore?: number;
}