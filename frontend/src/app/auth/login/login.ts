'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function login(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await fetch("http://localhost:3001/api/user/auth", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json() as { data?: string, error?: string }
    if (data.error !== undefined) {
      return {
        errors: {
          email: [data.error],
        }
      }
    }
    if (data.data === undefined) {
      return {
        errors: {
          email: ["Data not found"],
        }
      }
    }

    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

    cookies().set('session', data.data, {
      httpOnly: true,
      expires: expiresAt,
      path: "/"
    })
  } catch (e) {
    return {
      errors: {
        email: ["Something went wrong: " + e],
      }
    }
  }

  redirect("/app")
}

const LoginSchema = z.object({
  email: z.string().email().trim(),
  password: z
    .string()
    .min(8, "Password length must be at least 8 characters")
    .trim(),
});

export type FormState =
  | {
    errors?: {
      name?: string[];
      email?: string[];
      password?: string[];
    };
    message?: string;
  }
  | undefined;
