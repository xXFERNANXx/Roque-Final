import { Repository } from 'typeorm';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { Anime } from './entities/anime.entity';
export declare class AnimesService {
    private readonly animeRepository;
    constructor(animeRepository: Repository<Anime>);
    create(createAnimeDto: CreateAnimeDto): Promise<CreateAnimeDto & Anime>;
    findAll(): Promise<Anime[]>;
    findOne(id: number): Promise<Anime>;
    update(id: number, updateAnimeDto: UpdateAnimeDto): Promise<Anime>;
    remove(id: number): Promise<{
        id: number;
        title: string;
        synopsis: string;
        releaseDate: Date;
        endDate: Date;
        season: string;
        status: "En emisi\u00F3n" | "Finalizado" | "Pr\u00F3ximamente";
        type: "TV" | "OVA" | "Pel\u00EDcula" | "Especial" | "ONA";
        episodeCount: number;
        episodeDuration: number;
        ageRating: "Todos" | "+13" | "+16" | "+18";
        averageScore: number;
    }>;
}
