export declare class Anime {
    id: number;
    title: string;
    synopsis: string;
    releaseDate: Date;
    endDate: Date;
    season: string;
    status: 'En emisión' | 'Finalizado' | 'Próximamente';
    type: 'TV' | 'OVA' | 'Película' | 'Especial' | 'ONA';
    episodeCount: number;
    episodeDuration: number;
    ageRating: 'Todos' | '+13' | '+16' | '+18';
    averageScore: number;
}
