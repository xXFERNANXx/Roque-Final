import { AnimesService } from './animes.service';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
export declare class AnimesController {
    private readonly animesService;
    constructor(animesService: AnimesService);
    create(createAnimeDto: CreateAnimeDto): Promise<CreateAnimeDto & import("./entities/anime.entity").Anime>;
    findAll(): Promise<import("./entities/anime.entity").Anime[]>;
    findOne(id: string): Promise<import("./entities/anime.entity").Anime>;
    update(id: string, updateAnimeDto: UpdateAnimeDto): Promise<import("./entities/anime.entity").Anime>;
    remove(id: string): Promise<{
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
