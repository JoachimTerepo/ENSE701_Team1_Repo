"use client";

import { useEffect, useState } from "react";
import { Article } from "../lib/types/article";

export default function Home() {
  const [data, setData] = useState<Article[] | null>(null);

  const fetchApproved = async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/article/",
        {
          method: "POST",
          body: JSON.stringify({
            is_approved: true,
          }),
          headers: [["Content-Type", "application/json"]],
        }
      );
      setData(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const ArticleTable = ({ articles }: { articles: Article[] | null }) => {
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
            <th>Rating</th>
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
                  <a href={"http://" + a.url} target="_blank">
                    {a.url}
                  </a>
                </td>
                <td>
                  {a.rating}⭐ ({a.total_ratings} rating/s)
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  useEffect(() => {
    fetchApproved();
  }, []);
  return (
    <div className="p-4">
      <ArticleTable articles={data}></ArticleTable>
    </div>
  );

  return <></>;
}
