import React from "react";
export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <a href="/app">
        <button className="bg-black text-white shadow rounded px-4 py-4 text-xl">
          Login
        </button>
      </a>
    </div>
  );
}
