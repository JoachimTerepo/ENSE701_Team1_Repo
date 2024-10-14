import { Module } from '@nestjs/common';
import { ClaimController } from './claim.controller';
import { ClaimService } from './claim.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Claim, ClaimSchema } from './claim.schema';

// Add all the user components together to make the module
@Module({
    imports: [
        MongooseModule.forFeature([{ name: Claim.name, schema: ClaimSchema }]),
    ],
    controllers: [ClaimController],
    providers: [ClaimService],
})
export class ClaimModule { }