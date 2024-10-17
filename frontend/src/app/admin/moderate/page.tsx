"use client";

import { Article } from "@/lib/types/article";
import { useEffect, useState } from "react";

export default function Moderate() {
  const [data, setData] = useState<Article[] | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [comment, setComment] = useState<string>("");

  const fetchpending = async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/article/",
        {
          method: "POST",
          body: JSON.stringify({
            is_approved: null,
            quality_check_pass: null,
            quality_checked_at: null,
          }),
          headers: [["Content-Type", "application/json"]],
        }
      );

      setData(await res.json());
    } catch (e) {
      console.error(e);
    }

    setComment("");
  };

  const buttonPress = async (value: boolean, article: Article) => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/article/update",
        {
          method: "POST",
          body: JSON.stringify({
            id: article._id,
            quality_check_pass: true,
            quality_checked_at: Date.now(),
            is_approved: value,
            approved_at: Date.now(),
            moderation_comments: comment,
          }),
          headers: [["Content-Type", "application/json"]],
        }
      );

      fetchpending();
    } catch (e) {
      console.error(e);
    }

    // closes  the dropdown after a submission
    setComment("");
    setActiveDropdown(null);
  };

  const handleDropdown = (value: string | null) => {
    setComment("");
    setActiveDropdown(value);
  };

  useEffect(() => {
    fetchpending();
  }, []);

  if (data === null) {
    return <></>;
  }
  return (
    <div className="p-4">
      <table className="w-full">
        <thead className="text-left border-b border-neutral-300">
          <tr>
            <th>Title</th>
            <th>Author(s)</th>
            <th>Year</th>
            <th>URL</th>
            <th>Accept/Decline</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a, i) => {
            return (
              <tr
                className="odd:bg-neutral-100 border-b border-neutral-200"
                key={a._id}
              >
                <td>{a.title}</td>
                <td>{a.authors}</td>
                <td>{a.year}</td>
                <td>
                  <a href={a.url} target="_blank">
                    {a.url}
                  </a>
                </td>
                <td>
                  <button
                    onClick={() => buttonPress(true, a)}
                    className="bg-green-500 m-2 h-12 w-12 text-white text-lg border-4 border-green-600 shadow shadow-black focus:shadow-inner focus:shadow-black rounded-sm"
                  >
                    ✓
                  </button>{" "}
                  <button
                    onClick={() => {
                      handleDropdown(activeDropdown === a._id ? null : a._id);
                    }}
                    className="bg-red-500 m-2 h-12 w-12 text-white text-lg border-4 border-red-600 shadow shadow-black focus:shadow-inner focus:shadow-black rounded-sm"
                  >
                    &times;
                  </button>
                  {activeDropdown === a._id && (
                    <div className="right-4 absolute bg-white border border-gray-300 shadow-lg mt-1 z-10">
                      <div className="flex p-1 space-x-2">
                        <input
                          autoFocus
                          type="text"
                          placeholder="Reason for rejection"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="focus-within:outline-none p-1 focus:ring ring-blue-300 rounded"
                        ></input>
                        <button
                          type="button"
                          className="p-1 border border-black rounded"
                          onClick={() => buttonPress(false, a)}
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          className="p-1 bg-red-500 text-white rounded"
                          onClick={() => handleDropdown(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
