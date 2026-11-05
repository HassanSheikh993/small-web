import { Controller, Param, Query } from '@nestjs/common';
import { AddressParamDto } from './dto/address-param.dto';
import { SitesService } from './sites.service';
import { Get,Post,Body } from '@nestjs/common';
import { CreateSiteDto } from './dto/create-site.dto';
import { SearchQueryDto } from './dto/search-query.dto';
@Controller('sites')
export class SitesController {

    constructor(private readonly siteService:SitesService){}

    @Get("search")
    search(@Query() query:SearchQueryDto){
        return this.siteService.search(query.q);
    }

    @Get(":address")
    findByAddress(@Param() params:AddressParamDto){
         return this.siteService.findByAddress(params.address);
    }

    @Post()
    create(@Body() dto:CreateSiteDto){
        return this.siteService.create(dto)
    }

}
