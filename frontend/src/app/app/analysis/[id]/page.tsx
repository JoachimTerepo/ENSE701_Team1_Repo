"use client";

import Blocker from "@/app/lib/components/Blocker";
import { Article } from "@/app/lib/types/article";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Analysis({
  params,
}: {
  params: { id: string | null };
}) {
  const [article, setArticle] = useState<Article | null>(null);

  const fetchArticles = async () => {
    const id = params.id;
    if (id === null) {
      console.error("ID parameter is missing");
      return;
    }
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/article/",
        {
          method: "POST",
          body: JSON.stringify({
            _id: params.id,
          }),
          headers: [["Content-Type", "application/json"]],
        }
      );

      const data = (await res.json()) as Article[] | null;

      if (data === null) {
        console.error("No data returned");
        return;
      }

      if (data.length !== 1) {
        console.error("More than 1 article returned. Defaulting to index 0");
      }

      setArticle(data[0]);
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
      {article === null ? (
        <Blocker></Blocker>
      ) : (
        <div className="m-auto w-full md:w-2/3 lg:w-1/2 py-8">
          <div className="flex justify-center">
            <div className="w-1/2">
              <h1 className="font-semibold text-2xl">{article?.title}</h1>
              <p>
                {article.authors.map((a, i) => {
                  return a + (i !== article.authors.length - 1 ? ", " : "");
                })}
              </p>
              <p>{article.year}</p>
              <p>
                Moderator approved at: {article.approved_at?.toLocaleString()}
              </p>
            </div>
            <div className="w-1/2 text-end block space-y-2">
              {!article.analysed_at ? (
                <button className="text-white px-4 py-2 bg-green-600 rounded shadow">
                  Mark as completed
                </button>
              ) : (
                <button
                  disabled
                  className="text-green-600 px-4 py-2 border border-green-600 rounded shadow"
                >
                  Analysis Completed
                </button>
              )}
              <div className="text-blue-500 underline">
                <a href={"http://" + article.url} target="_blank">
                  View journal
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
