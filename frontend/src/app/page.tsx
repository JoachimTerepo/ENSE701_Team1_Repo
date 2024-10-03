"use client";

import Link from "next/link";
import { login } from "./login";
import { useFormState } from "react-dom";

export default function Login() {
  const [state, action] = useFormState(login, undefined);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="border border-neutral-200 shadow-md rounded w-10/12 md:w-1/2 lg:w-1/4 xl:w-1/6 p-4">
        <h1 className="text-center text-2xl mb-4">Login</h1>
        <form className="space-y-4" action={action}>
          <div>
            <span className="text-red-600">{state?.errors.email}</span>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="border-b border-neutral-300 w-full focus-visible:outline-none focus:border-blue-500 focus:border-b-2 transition"
            ></input>
          </div>
          <div>
            <span className="text-red-600">{state?.errors.password}</span>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="border-b border-neutral-300 w-full focus-visible:outline-none focus:border-blue-500 focus:border-b-2 transition"
            ></input>
          </div>
          <div className="flex justify-center items-center">
            <button
              className="px-4 py-2 rounded bg-blue-600 text-white"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
        <Link
          href={"/register"}
          className="text-blue-400 underline text-center w-full flex justify-center mt-2"
        >
          <span>No account? Register</span>
        </Link>
      </div>
    </div>
  );
}
