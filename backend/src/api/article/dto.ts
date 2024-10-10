import { User } from '../user/user.schema';

export class ArticleDTO {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  url: string;
  isbn?: string;
  sections: string;
  content: string;
  is_approved?: boolean;
  approved_at?: Date;
  approved_by?: User;
  total_ratings?: number;
  rating?: number;
  quality_check_pass?: boolean;
  quality_checked_at?: Date;
  quality_checked_by?: User;
  moderation_comments?: string;
}

export class ArticleUpdateDTO {
  id: string;
  title?: string;
  authors?: string[];
  journal?: string;
  year?: number;
  url?: string;
  isbn?: string;
  sections?: string;
  content?: string;
  is_approved?: boolean;
  approved_at?: Date;
  approved_by?: User;
  total_ratings?: number;
  rating?: number;
  quality_check_pass?: boolean;
  quality_checked_at?: Date;
  quality_checked_by?: User;
  moderation_comments?: string;
}

export class ArticleFilter {
  id?: string;
  year?: number;
  isbn?: string;
  is_approved?: boolean;
  approved_at?: Date;
  total_ratings?: number;
  rating?: number;
  quality_check_pass?: boolean;
  quality_checked_at?: Date;
}
