"use client";

import { useEffect, useState } from "react";
import { Article } from "../lib/types/article";

export default function Home() {
  const [data, setData] = useState<Article[] | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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

  const submitRating = async (rating: number, article: Article) => {
    // The new rating sum
    let ratingSum = article.rating_sum + rating;
    // Increment the total ratings
    let totalRatings = article.total_ratings + 1;
    // Calculate the new rating
    const newRating = ratingSum / totalRatings;
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/article/update",
        {
          method: "POST",
          body: JSON.stringify({
            id: article._id,
            rating: newRating,
            total_ratings: totalRatings,
            rating_sum: ratingSum,
          }),
          headers: [["Content-Type", "application/json"]],
        }
      );

      fetchApproved();
    } catch (e) {
      console.error(e);
    }

    // closes  the dropdown after a submission
    setActiveDropdown(null);
  };

  const ArticleTable = ({
    articles,
    onClick,
  }: {
    articles: Article[] | null;
    onClick: (rating: number, article: Article) => Promise<void>;
  }) => {
    if (articles === null) {
      return;
    }
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
                  {Number(a.rating.toFixed(1))}⭐ ({a.total_ratings} rating
                  {a.total_ratings !== 1 ? "s" : ""}){" "}
                  <div className="relative inline-block">
                    <button
                      className="m-1 px-1 bg-yellow-400 border-4 border-yellow-600 shadow shadow-black focus:shadow-inner focus:shadow-black rounded-sm"
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === a._id ? null : a._id
                        )
                      }
                    >
                      Rate!
                    </button>
                    {activeDropdown === a._id && (
                      <div className="absolute bg-white border border-gray-300 shadow-lg mt-1 z-10">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <div
                              key={rating}
                              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                              onClick={() => submitRating(rating, a)}
                            >
                              {rating}⭐
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
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
      <ArticleTable
        articles={data}
        onClick={function (rating: number, article: Article): Promise<void> {
          throw new Error("Function not implemented.");
        }}
      ></ArticleTable>
    </div>
  );
}
