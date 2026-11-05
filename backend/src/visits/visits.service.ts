import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Visit } from './schemas/visit.schema';
import { User } from '../users/schemas/user.schema';
import { CreateVisitDto } from './dto/create-visit.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class VisitsService {
  static readonly PAGE_SIZE = 50;

  constructor(@InjectModel(Visit.name) private visitModel: Model<Visit>,
@InjectModel(User.name) private userModel: Model<User>,) {}

  async getHistory(userId: string, page: number) {
    const visits = await this.visitModel
      .find({ user: userId })
      .sort({ visitedAt: -1 })
      .skip(page * VisitsService.PAGE_SIZE)
      .limit(VisitsService.PAGE_SIZE + 1)
      .select('address how visitedAt')
      .lean();

    const hasMore = visits.length > VisitsService.PAGE_SIZE;

    return {
      visits: visits.slice(0, VisitsService.PAGE_SIZE),
      hasMore,
    };
  }


    async create(dto: CreateVisitDto) {
    const userExists = await this.userModel.exists({ _id: dto.userId });
    if (!userExists) throw new NotFoundException('User not found');

    const visit = await this.visitModel.create({
      user: dto.userId,
      address: dto.address.toLowerCase().trim(),
      how: dto.how,
    });

    return {
      _id: visit._id,
      address: visit.address,
      how: visit.how,
      visitedAt: visit.visitedAt,
    };
  }


}