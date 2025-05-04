import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimeDto } from './create-anime.dto';
import { IsOptional, IsDate, IsEnum, IsInt, IsString, Length, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateAnimeDto extends PartialType(CreateAnimeDto) {
    // Podemos agregar validaciones adicionales específicas para la actualización
    
    @IsOptional()
    @IsString({ message: 'El título debe ser una cadena de texto' })
    @Length(1, 100, { message: 'El título debe tener entre 1 y 100 caracteres' })
    title?: string;
    
    @IsOptional()
    @IsString({ message: 'La sinopsis debe ser una cadena de texto' })
    synopsis?: string;
    
    @IsOptional()
    @IsDate({ message: 'Formato de fecha inválido' })
    @Type(() => Date)
    releaseDate?: Date;
    
    @IsOptional()
    @IsDate({ message: 'Formato de fecha inválido' })
    @Type(() => Date)
    endDate?: Date;
    
    @IsOptional()
    @IsString({ message: 'La temporada debe ser una cadena de texto' })
    @Length(1, 20, { message: 'La temporada debe tener entre 1 y 20 caracteres' })
    season?: string;
    
    @IsOptional()
    @IsEnum(['En emisión', 'Finalizado', 'Próximamente'], { message: 'Estado inválido. Debe ser: En emisión, Finalizado o Próximamente' })
    status?: 'En emisión' | 'Finalizado' | 'Próximamente';
    
    @IsOptional()
    @IsEnum(['TV', 'OVA', 'Película', 'Especial', 'ONA'], { message: 'Tipo inválido. Debe ser: TV, OVA, Película, Especial u ONA' })
    type?: 'TV' | 'OVA' | 'Película' | 'Especial' | 'ONA';
    
    @IsOptional()
    @IsInt({ message: 'El número de episodios debe ser un entero' })
    @Min(1, { message: 'El mínimo de episodios es 1' })
    @Type(() => Number)
    episodeCount?: number;
    
    @IsOptional()
    @IsInt({ message: 'La duración debe ser un número entero' })
    @Min(1, { message: 'La duración mínima es 1 minuto' })
    @Type(() => Number)
    episodeDuration?: number;
    
    @IsOptional()
    @IsEnum(['Todos', '+13', '+16', '+18'], { message: 'Clasificación inválida. Debe ser: Todos, +13, +16 o +18' })
    ageRating?: 'Todos' | '+13' | '+16' | '+18';
    
    @IsOptional()
    @Min(0, { message: 'La puntuación mínima es 0' })
    @Max(10, { message: 'La puntuación máxima es 10' })
    @Type(() => Number)
    averageScore?: number;
}