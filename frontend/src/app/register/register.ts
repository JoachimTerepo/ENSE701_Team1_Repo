import { redirect } from "next/navigation";
import { z } from "zod";

export async function register(state: FormState, formData: FormData) {
    // Validate form fields
    const validatedFields = RegisterSchema.safeParse({
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        password: formData.get("password"),
        cpassword: formData.get("cpassword"),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const firstName = formData.get("firstName")
    const lastName = formData.get("lastName")
    const email = formData.get("email");
    const password = formData.get("password");
    const cpassword = formData.get("cpassword")

    if (password !== cpassword) {
        return {
            errors: {
                cpassword: ["Passwords do not match"]
            }
        }
    }

    try {
        const res = await fetch("http://localhost:3001/api/user/create", {
            method: "POST",
            body: JSON.stringify({ firstName, lastName, email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json() as { error: string }
        if (data.error !== null) {
            return {
                errors: {
                    firstName: [data.error]
                }
            }
        }
    } catch (e) {
        return {
            errors: {
                firstName: ["Something went wrong. " + e]
            }
        }
    }
    redirect("/")
}

export const RegisterSchema = z.object({
    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().trim().min(1, "Last name is required"),
    email: z.string().email("Invalid email address").trim(),
    password: z
        .string()
        .min(8, "Password length must be at least 8 characters")
        .trim(),
    cpassword: z
        .string()
        .min(1, "You must confirm your password")
        .trim(),
});

export type FormState =
    | {
        errors?: {
            firstName?: string[];
            lastName?: string[];
            email?: string[];
            password?: string[];
            cpassword?: string[]
        };
        message?: string;
    }
    | undefined;
