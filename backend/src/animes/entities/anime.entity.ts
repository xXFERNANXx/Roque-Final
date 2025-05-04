import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Length, Max, Min } from "class-validator";

@Entity()
export class Anime {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'varchar', length: 100 })
    @IsNotEmpty({ message: 'El título es obligatorio' })
    @Length(1, 100, { message: 'El título debe tener entre 1 y 100 caracteres' })
    @IsString({ message: 'El título debe ser una cadena de texto' })
    title: string;
    
    @Column({ type: 'text', default: 'Sin sinopsis disponible' })
    @IsNotEmpty({ message: 'La sinopsis es obligatoria' })
    @IsString({ message: 'La sinopsis debe ser una cadena de texto' })
    synopsis: string;
    
    @Column({ type: 'date', nullable: true })
    @IsOptional()
    @IsDate({ message: 'Formato de fecha inválido' })
    releaseDate: Date;
    
    @Column({ type: 'date', nullable: true })
    @IsOptional()
    @IsDate({ message: 'Formato de fecha inválido' })
    endDate: Date;
    
    @Column({ type: 'varchar', length: 20, default: 'Desconocida' })
    @IsString({ message: 'La temporada debe ser una cadena de texto' })
    @Length(1, 20, { message: 'La temporada debe tener entre 1 y 20 caracteres' })
    season: string;
    
    @Column({ type: 'enum', enum: ['En emisión', 'Finalizado', 'Próximamente'], default: 'Próximamente' })
    @IsEnum(['En emisión', 'Finalizado', 'Próximamente'], { message: 'Estado inválido' })
    status: 'En emisión' | 'Finalizado' | 'Próximamente';
    
    @Column({ type: 'enum', enum: ['TV', 'OVA', 'Película', 'Especial', 'ONA'], default: 'TV' })
    @IsEnum(['TV', 'OVA', 'Película', 'Especial', 'ONA'], { message: 'Tipo inválido' })
    type: 'TV' | 'OVA' | 'Película' | 'Especial' | 'ONA';
    
    @Column({ type: 'int', default: 1 })
    @IsInt({ message: 'El número de episodios debe ser un entero' })
    @Min(1, { message: 'El mínimo de episodios es 1' })
    episodeCount: number;
    
    @Column({ type: 'int', default: 24 })
    @IsInt({ message: 'La duración debe ser un número entero' })
    @Min(1, { message: 'La duración mínima es 1 minuto' })
    episodeDuration: number;
    
    @Column({ type: 'enum', enum: ['Todos', '+13', '+16', '+18'], default: 'Todos' })
    @IsEnum(['Todos', '+13', '+16', '+18'], { message: 'Clasificación inválida' })
    ageRating: 'Todos' | '+13' | '+16' | '+18';
    
    @Column({ type: 'decimal', precision: 3, scale: 1, default: 0.0 })
    @Min(0, { message: 'La puntuación mínima es 0' })
    @Max(10, { message: 'La puntuación máxima es 10' })
    averageScore: number;
}