export class CreateClaimDTO {
    name: string
    colour?: string
    parent?: string
    is_parent: boolean
}

export class ClaimDTO {
    _id: string
    name?: string
    colour?: string
    parent?: string
    is_parent?: boolean
}