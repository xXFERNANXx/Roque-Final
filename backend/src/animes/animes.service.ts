import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { Anime } from './entities/anime.entity';

@Injectable()
export class AnimesService {

 constructor(
   @InjectRepository(Anime) private readonly animeRepository: Repository<Anime>
 ) {}

 create(createAnimeDto: CreateAnimeDto) {
   return this.animeRepository.save(createAnimeDto);
 }

 findAll() {
   return this.animeRepository.find();
 }

 async findOne(id: number) {
   const anime = await this.animeRepository.findOne({ where: { id } });
   if (!anime) throw new NotFoundException('El Anime no existe');
   return anime;
 }

 async update(id: number, updateAnimeDto: UpdateAnimeDto) {
   const anime = await this.findOne(id);
   const updatedAnime = this.animeRepository.merge(anime, updateAnimeDto);
   return this.animeRepository.save(updatedAnime);
 }

 async remove(id: number) {
   const anime = await this.findOne(id);
   await this.animeRepository.remove(anime);
   return { ...anime, id };
 }
}