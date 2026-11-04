import { Module } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { VisitsController } from './visits.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Visit,VisitSchema } from './schemas/visit.schema';
@Module({
  imports:[MongooseModule.forFeature([{name:Visit.name,schema:VisitSchema}])],
  providers: [VisitsService],
  controllers: [VisitsController],
  exports:[VisitsService]
})
export class VisitsModule {}
