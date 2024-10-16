import { Injectable } from '@nestjs/common';
import { Claim } from './claim.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ClaimDTO, CreateClaimDTO } from './dto';

// Service functions to help interact with the database
@Injectable()
export class ClaimService {

    constructor(@InjectModel(Claim.name) private ClaimModel: Model<Claim>) { }

    test(): string {
        return 'Claim route testing';
    }

    async findParants(): Promise<Claim[]> {
        return await this.ClaimModel.find({ parent: null, is_parent: true }).exec()
    }

    async findChildren(id: string): Promise<Claim[]> {
        return await this.ClaimModel.find({ parent: new Types.ObjectId(id) }).exec()
    }

    async findAll(): Promise<Claim[]> {
        return await this.ClaimModel.find().exec();
    }

    async findOne(id: string): Promise<Claim> {
        return await this.ClaimModel.findById(id).exec();
    }

    async create(createClaimDto: CreateClaimDTO) {
        const data = { ...createClaimDto, parent: new Types.ObjectId(createClaimDto.parent) }
        return await this.ClaimModel.create(data);
    }

    async update(id: string, createClaimDto: ClaimDTO) {
        return await this.ClaimModel.findByIdAndUpdate(id, createClaimDto).exec();
    }

    async delete(id: string) {
        const deletedClaim = await this.ClaimModel.findByIdAndDelete(id).exec();
        return deletedClaim;
    }

    async search(text: string) {
        return await this.ClaimModel.find({
            $or: [
                { name: { $regex: text, $options: 'i' } },
            ],
            is_parent: false
        }).limit(10).exec()
    }
}