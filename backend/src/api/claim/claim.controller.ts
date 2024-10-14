
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ClaimDTO, CreateClaimDTO } from './dto';
import { ClaimService } from './claim.service';

/**
 * API endpoint controller for `/api/claim`
 */
@Controller('/api/claim')
export class ClaimController {
    constructor(private readonly ClaimService: ClaimService) { }

    // Only get the top level parents
    @Get()
    async get() {
        try {
            const data = await this.ClaimService.findParants()
            return data
        } catch (e) {
            // TODO: Improve this error message by making it an object
            return "Something went wrong\n" + e
        }
    }

    @Get(':parent')
    async getChildren(@Param('parent') parent: string) {
        try {
            const data = await this.ClaimService.findChildren(parent)
            return data
        } catch (e) {
            // TODO: Improve this error message by making it an object
            return "Something went wrong\n" + e
        }
    }

    // To create an Claim. Expects an object fitting the definition of the CreateClaimDto object
    @Post('/create')
    async create(@Body() createClaimDto: CreateClaimDTO) {
        try {
            await this.ClaimService.create(createClaimDto)
            return { error: null }
        } catch (e) {
            return { error: "Something went wrong\n" + e }
        }
    }

    @Post("/update")
    async update(@Body() claimDTO: ClaimDTO) {
        try {
            // Try to create the user
            await this.ClaimService.update(claimDTO._id, claimDTO)
            return { error: null }
        } catch (e) {
            // Send the error back to the user
            return { error: "Something went wrong\n" + e }
        }
    }

    @Get("/search/:text")
    async search(@Param('text') text: string) {
        try {
            const data = await this.ClaimService.search(text)
            return data
        } catch (e) {
            return { error: "Something went wrong\n" + e }
        }
    }
}
