"use client";

import Blocker from "@/app/lib/components/Blocker";
import { Article } from "@/app/lib/types/article";
import { useEffect, useState } from "react";

export default function Analysis({
  params,
}: {
  params: { id: string | null };
}) {
  const [article, setArticle] = useState<Article | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchTimer, setSearchTimer] = useState<NodeJS.Timeout | null>(null);
  const [searchResult, setSearchResult] = useState<Claim[] | null>(null);

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

  const search = async (text: string) => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/claim/search/" + text,
        {
          method: "GET",
          headers: [["Content-Type", "application/json"]],
        }
      );

      const data = (await res.json()) as Claim[] | null;

      if (data === null) {
        console.error("No data returned");
        return;
      }

      setSearchResult(data);
    } catch (e) {
      // TODO: There is a better way we can handle this
      console.error(e);
    }
  };

  const handleSearch = (text: string) => {
    setSearchValue(text);

    if (text === "") {
      setSearchResult([]);
    }

    if (searchTimer) {
      clearTimeout(searchTimer);
    }

    const newTimer = setTimeout(async () => {
      await search(text);
    }, 1000);

    setSearchTimer(newTimer);
  };

  const handleAdd = async (claimID: string) => {
    try {
      if (article === null) {
        throw new Error("Article is null?");
      }

      console.log(article.claims);

      if (article.claims === undefined) {
        throw new Error("Article does not contain a claims array");
      }

      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/article/update",
        {
          method: "POST",
          body: JSON.stringify({
            id: article._id,
            claims: [...article.claims, claimID],
          }),
          headers: [["Content-Type", "application/json"]],
        }
      );

      const data = (await res.json()) as { error: string | null };

      if (data.error !== null) {
        throw new Error(data.error);
      }

      setSearchValue("");
      await fetchArticles();
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
        <div className="m-auto w-full md:w-2/3 lg:w-1/2 py-8 space-y-8">
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
                  View article site
                </a>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-medium">Claims</h1>
            <div className="flex justify-center">
              <div className="w-1/2 relative">
                <input
                  className="border border-neutral-300 rounded px-2 py-1 focus-within:outline-none focus:ring focus:ring-blue-300 transition"
                  type="text"
                  placeholder="Search to add claim"
                  onChange={(e) => handleSearch(e.target.value)}
                  value={searchValue}
                ></input>
                {searchResult !== null && searchResult.length !== 0 ? (
                  <div className="absolute border rounded shadow-lg bg-white mt-1 w-full py-2">
                    {searchResult.map((r) => (
                      <button
                        key={r._id}
                        className="block py-1 px-2 hover:bg-slate-50 w-full text-left"
                        onClick={() => handleAdd(r._id)}
                      >
                        {r.name}
                      </button>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="w-1/2">
                <ul className="list-none">
                  {searchResult?.map((r) => {
                    return <li>{r.name}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
