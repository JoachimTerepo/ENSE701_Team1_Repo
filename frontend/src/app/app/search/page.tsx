"use client"; // Required for stateful components in the new Next.js app directory
import React, { useState } from "react";
import ClaimsDropdown from "../components/ClaimsDropdown"; // Import the dropdown component
import YearRangeFilter from "../components/YearRangeFilter"; // Assuming you have this component
import { Article } from "@/app/lib/types/article";

interface Claim {
  _id: string;
  name: string;
  colour: string;
  parent: string;
  is_parent: boolean;
}

interface ClaimItem extends Claim {
  children: ClaimItem[] | null;
}

const SearchPage: React.FC = () => {
  const [selectedClaim, setSelectedClaim] = useState<ClaimItem | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [yearRange, setYearRange] = useState<{
    startYear: number;
    endYear: number;
  }>({ startYear: 0, endYear: new Date().getFullYear() });

  const handleClaimSelect = (claim: ClaimItem) => {
    setSelectedClaim(claim);
    handleSearch(claim._id, yearRange.startYear, yearRange.endYear); // Perform search after claim selection
  };

  const handleArticlesFetch = (fetchedArticles: Article[]) => {
    setArticles(fetchedArticles); // Store fetched articles from ClaimsDropdown
  };

  const handleYearRangeChange = (startYear: number, endYear: number) => {
    setYearRange({ startYear, endYear });
    if (selectedClaim) {
      handleSearch(selectedClaim._id, startYear, endYear); // Reapply filter based on new year range
    }
  };

  // Filtering the articles based on the selected year range and claim ID
  const handleSearch = (
    claimId: string,
    startYear: number,
    endYear: number
  ) => {
    const filteredArticles = articles.filter(
      (article) =>
        article.claims !== undefined &&
        article.claims.includes(claimId) && // Check if claimId is in the claims array
        article.year >= startYear &&
        article.year <= endYear
    );
    setArticles(filteredArticles);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Search Articles by Claim ID
      </h1>
      <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0 mb-8">
        <div className="flex-grow">
          <ClaimsDropdown
            onClaimSelect={handleClaimSelect}
            onArticlesFetch={handleArticlesFetch}
          />
        </div>
        <div className="flex-grow">
          <YearRangeFilter
            onYearRangeChange={handleYearRangeChange}
            minYear={0}
            maxYear={new Date().getFullYear()}
          />
        </div>
      </div>

      {articles.length > 0 ? (
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Articles Found:
          </h2>
          <ul className="space-y-4">
            {articles.map((article) => (
              <li
                key={article._id}
                className="bg-white shadow-md p-6 rounded-lg border border-gray-200"
              >
                <h3 className="text-xl font-bold text-blue-600 mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-700">
                  <strong>Authors:</strong> {article.authors.join(", ")}
                </p>
                <p className="text-gray-700">
                  <strong>Journal:</strong> {article.journal}
                </p>
                <p className="text-gray-700">
                  <strong>Year:</strong> {article.year}
                </p>
                <p className="text-blue-500">
                  <strong>URL:</strong>{" "}
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {article.url}
                  </a>
                </p>
                {/*
                <pre className="bg-gray-100 p-4 mt-4 text-sm rounded-lg">
                  {article.bibtex}
                </pre>
                */}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-lg text-center text-gray-500">No articles found</p>
      )}
    </div>
  );
};

export default SearchPage;
