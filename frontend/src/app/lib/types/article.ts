

export type Article = {
    _id: string,
    title: string,
    authors: string[]
    journal: string
    year: number
    url: string
    isbn?: string
    sections: string
    content: string
    is_approved?: boolean
    approved_at?: Date
    approved_by?: string
    total_ratings?: number
    rating?: number
    quality_check_pass?: boolean
    quality_checked_at?: Date
    quality_checked_by?: string
    analysed_at?: Date
    moderation_comments?: string
}