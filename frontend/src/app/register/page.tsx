"use client";

import Link from "next/link";
import { register } from "./register";
import { useFormState } from "react-dom";

export default function Login() {
  const [state, action] = useFormState(register, undefined);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="border border-neutral-200 shadow-md rounded w-10/12 md:w-1/2 lg:w-1/4 xl:w-1/6 p-4">
        <h1 className="text-center text-2xl mb-4">Register</h1>
        <form className="space-y-4" action={action}>
          <div>
            <span className="text-red-600">{state?.errors.firstName}</span>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First Name"
              className="border-b border-neutral-300 w-full focus-visible:outline-none focus:border-blue-500 focus:border-b-2 transition"
            ></input>
          </div>
          <div>
            <span className="text-red-600">{state?.errors.lastName}</span>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              className="border-b border-neutral-300 w-full focus-visible:outline-none focus:border-blue-500 focus:border-b-2 transition"
            ></input>
          </div>
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
          <div>
            <span className="text-red-600">{state?.errors.cpassword}</span>
            <input
              id="cpassword"
              name="cpassword"
              type="password"
              placeholder="Confirm Password"
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
          href={"/"}
          className="text-blue-400 underline text-center w-full flex justify-center mt-2"
        >
          <span>Already have an account? Login</span>
        </Link>
      </div>
    </div>
  );
}
