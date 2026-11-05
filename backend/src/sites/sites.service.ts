import { Injectable, NotFoundException,ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Site } from './schemas/site.schema';
import { CreateSiteDto } from './dto/create-site.dto';
import { User } from '../users/schemas/user.schema';
import DOMPurify from 'isomorphic-dompurify';



@Injectable()
export class SitesService {
constructor(@InjectModel(Site.name) private siteModel: Model<Site>,
@InjectModel(User.name) private userModel: Model<User>,){}

async findByAddress(address:string){
    const site = await this.siteModel
    .findOne({address:address.toLocaleLowerCase().trim()})
    .select("address userId title html")
    .populate('userId','name')
    .lean();

    if(!site){
        throw new NotFoundException(`No site at ${address}`);
    }
    return site;
}


async create(dto:CreateSiteDto){
    const userExists =  await this.userModel.findById(dto.userId);
    if (!userExists) throw new NotFoundException('Author not found');

    const html = DOMPurify.sanitize(dto.html);                           // security
    const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();  // for search

    try{
        const site = await this.siteModel.create({
            address: dto.address.toLocaleLowerCase().trim(),
            title:dto.title.trim(),
            html:html,
            text:text,
            userId:dto.userId
        });
        return{_id:site._id, address: site.address, title: site.title}
    }catch(err:any){
         if (err.code === 11000) throw new ConflictException('Address already taken');
      throw err;
    }

}

async search(q:string){
    const result = await this.siteModel.find(
        {$text: {$search:q}}, //$text is not the index. It’s a MongoDB operator that searches using the text index you made in the schema
        {score:{$meta:"textScore"}}
    ).sort({score: {$meta: "textScore"}})
    .select("address title text")
    .limit(20)
    .lean<(Site & { score: number })[]>();

    return result.map((res)=>
    (
        {
        address:res.address,
        title:res.title,
        snippet:res.text.slice(0,160) + (res.text.length >160 ? "..." : ""),
        score: res.score

    }
    ))
}
}
