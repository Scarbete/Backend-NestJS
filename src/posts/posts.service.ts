import { Injectable } from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { InjectModel } from '@nestjs/sequelize'
import { Post } from './posts.model'
import { FilesService } from '../files/files.service'

@Injectable()
export class PostsService {

    constructor(
        @InjectModel(Post) private postRepository: typeof Post,
        private fileService: FilesService
    ) {}

    async create(dto: CreatePostDto, image: any): Promise<Post> {
        const fileName = await this.fileService.createFile(image)
        return (await this.postRepository.create({...dto, image: fileName}))
    }
}
