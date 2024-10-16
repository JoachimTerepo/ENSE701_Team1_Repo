'use client'; // Required for stateful components in the new Next.js app directory
import React, { useState } from 'react';
import ClaimsDropdown from '../../components/ClaimsDropdown'; // Import the dropdown component
import YearRangeFilter from '../../components/YearRangeFilter'; // Assuming you have this component

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

interface Article {
  _id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  url: string;
  bibtex: string;
  claims: string[]; // Array of claim IDs (ObjectId as string)
}

const SearchPage: React.FC = () => {
  const [selectedClaim, setSelectedClaim] = useState<ClaimItem | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [yearRange, setYearRange] = useState<{ startYear: number; endYear: number }>({ startYear: 0, endYear: new Date().getFullYear() });

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
  const handleSearch = (claimId: string, startYear: number, endYear: number) => {
    const filteredArticles = articles.filter(article =>
      article.claims.includes(claimId) && // Check if claimId is in the claims array
      article.year >= startYear &&
      article.year <= endYear
    );
    setArticles(filteredArticles);
  };

  return (
    <div>
      <h1>Search Articles by Claim ID</h1>
      <ClaimsDropdown onClaimSelect={handleClaimSelect} onArticlesFetch={handleArticlesFetch} />
      <YearRangeFilter onYearRangeChange={handleYearRangeChange} minYear={0} maxYear={new Date().getFullYear()} />
      
      {articles.length > 0 ? (
        <div>
          <h2>Articles Found:</h2>
          <ul>
            {articles.map(article => (
              <li key={article._id}>
                <h3>{article.title}</h3>
                <p><strong>Authors:</strong> {article.authors.join(', ')}</p>
                <p><strong>Journal:</strong> {article.journal}</p>
                <p><strong>Year:</strong> {article.year}</p>
                <p><strong>URL:</strong> <a href={article.url} target="_blank" rel="noopener noreferrer">{article.url}</a></p>
                <pre>{article.bibtex}</pre>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No articles found</p>
      )}
    </div>
  );
};

export default SearchPage;
