import { Date } from "mongoose";
import { ROLES } from "./user.schema";

/**
 * Object used by MongoDB to create a user
 */
export class CreateUserDto {
    created_at: Date;
    updated_at: Date;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: ROLES;
}

export class UserDTO {
    created_at?: Date;
    updated_at?: Date;
    email?: string;
    firstName?: string;
    lastName?: string;
    role?: ROLES;
}