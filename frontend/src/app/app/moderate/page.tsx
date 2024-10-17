"use client";

import { Article } from "@/app/lib/types/article";
import { useEffect, useState } from "react";

export default function Moderate() {
  const [data, setData] = useState<Article[] | null>(null);

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
          }),
          headers: [["Content-Type", "application/json"]],
        }
      );

      fetchpending();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchpending();
  }, []);
  return (
    <div className="p-4">
      <ArticleTable articles={data} onClick={buttonPress}></ArticleTable>
    </div>
  );
}

const ArticleTable = ({
  articles,
  onClick,
}: {
  articles: Article[] | null;
  onClick: (value: boolean, article: Article) => Promise<void>;
}) => {
  if (articles === null) {
    return;
  }
  return (
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
        {articles.map((a, i) => {
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
                  onClick={() => onClick(true, a)}
                  className="bg-green-500 m-2 h-12 w-12 text-white text-lg border-4 border-green-600 shadow shadow-black focus:shadow-inner focus:shadow-black rounded-sm"
                >
                  ✓
                </button>{" "}
                <button
                  onClick={() => onClick(false, a)}
                  className="bg-red-500 m-2 h-12 w-12 text-white text-lg border-4 border-red-600 shadow shadow-black focus:shadow-inner focus:shadow-black rounded-sm"
                >
                  &times;
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
