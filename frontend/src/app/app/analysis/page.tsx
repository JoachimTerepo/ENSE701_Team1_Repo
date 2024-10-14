"use client";

import Blocker from "@/app/lib/components/Blocker";
import { Article } from "@/app/lib/types/article";
import { useEffect, useState } from "react";

export default function Analysis() {
  const [data, setData] = useState<Article[] | null>(null);

  const fetchArticles = async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/article/",
        {
          method: "POST",
          body: JSON.stringify({
            quality_check_pass: true,
            analysed_at: null,
          }),
          headers: [["Content-Type", "application/json"]],
        }
      );

      setData(await res.json());
    } catch (e) {
      // TODO: There is a better way we can handle this
      console.error(e);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div>
      {data === null ? <Blocker></Blocker> : <></>}
      <div className="m-auto w-full md:w-2/3">
        <ArticleTable articles={data}></ArticleTable>
      </div>
    </div>
  );
}

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
        </tr>
      </thead>
      <tbody>
        {articles.map((a, i) => {
          return (
            <tr className="odd:bg-neutral-100 border-b border-neutral-200">
              <td className="pl-2">{a.title}</td>
              <td>{a.authors}</td>
              <td>{a.year}</td>
              <td>
                <a href={"http://" + a.url} className="underline text-blue-500">
                  {a.url}
                </a>
              </td>
              <td className="flex justify-end items-center space-x-6 py-2 pr-2">
                <a href={"/app/analysis/" + a._id} className="text-blue-500">
                  View
                </a>
                <button className="text-green-600">Mark as Completed</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
