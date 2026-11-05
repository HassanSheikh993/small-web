import { Module } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { VisitsController } from './visits.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Visit,VisitSchema } from './schemas/visit.schema';
import { User,UserSchema } from '../users/schemas/user.schema';
@Module({
  imports:[MongooseModule.forFeature([{name:Visit.name,schema:VisitSchema},{ name: User.name, schema: UserSchema }])],
  providers: [VisitsService],
  controllers: [VisitsController],
  exports:[VisitsService]
})
export class VisitsModule {}
