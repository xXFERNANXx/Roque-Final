import { CreateAnimeDto } from './create-anime.dto';
declare const UpdateAnimeDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateAnimeDto>>;
export declare class UpdateAnimeDto extends UpdateAnimeDto_base {
    title?: string;
    synopsis?: string;
    releaseDate?: Date;
    endDate?: Date;
    season?: string;
    status?: 'En emisión' | 'Finalizado' | 'Próximamente';
    type?: 'TV' | 'OVA' | 'Película' | 'Especial' | 'ONA';
    episodeCount?: number;
    episodeDuration?: number;
    ageRating?: 'Todos' | '+13' | '+16' | '+18';
    averageScore?: number;
}
export {};
