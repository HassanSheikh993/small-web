import { Controller, Query,Get,Post,Body } from '@nestjs/common';
import { HistoryQueryDto } from './dto/history-query.dto';
import { VisitsService } from './visits.service';
import { CreateVisitDto } from './dto/create-visit.dto';

@Controller('visits')
export class VisitsController {
    constructor(private readonly visitsService: VisitsService){}

    @Get()
    getHistory(@Query() query:HistoryQueryDto){
      return this.visitsService.getHistory(query.userId, query.page);
    }

    @Post()
    create(@Body() dto: CreateVisitDto) {
    return this.visitsService.create(dto);
  }
}
