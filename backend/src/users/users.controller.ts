import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { Get } from '@nestjs/common';
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Get()
    findAll(){
        return this.userService.findAll();
    }
}
