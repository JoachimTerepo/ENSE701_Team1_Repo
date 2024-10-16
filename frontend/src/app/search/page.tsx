'use client'; // Required for stateful components in the new Next.js app directory
import React, { useState } from 'react';
import ClaimsDropdown from '../../components/ClaimsDropdown';
import YearRangeFilter from '../../components/YearRangeFilter';
import ResultsDisplay from '../../components/ResultsDisplay';

interface Result {
  title: string;
  authors: string[];
  journal: string;
  year: number;
  url: string;
  bibtex: string;
  claim: string; // Add a `claim` field to represent the claim used
}

interface Claim {
  _id: string;
  name: string;
  colour: string; // Ensure this property is required
  parent: string;
  is_parent: boolean;
}

interface ClaimItem extends Claim {
  children: ClaimItem[] | null;
}

const SearchPage: React.FC = () => {
  // State for the search results and year range
  const [results, setResults] = useState<Result[]>([]);
  const [yearRange, setYearRange] = useState({ startYear: 2000, endYear: 2024 });
  const [selectedClaim, setSelectedClaim] = useState<ClaimItem | null>(null);

  // Function to handle claim selection
  const handleClaimSelect = (claim: ClaimItem) => {
    setSelectedClaim(claim);
    handleSearch(claim, yearRange.startYear, yearRange.endYear);
  };

  // Function to handle year range changes
  const handleYearRangeChange = (startYear: number, endYear: number) => {
    setYearRange({ startYear, endYear });
    if (selectedClaim) {
      handleSearch(selectedClaim, startYear, endYear); // Reapply filter based on new year range
    }
  };

  // Mock search function for demonstration purposes
  const handleSearch = (claim: ClaimItem, startYear: number, endYear: number): void => {
    // Mock data representing articles in the database
    const mockResults: Result[] = [
      {
        title: 'Understanding Agile Development',
        authors: ['John Doe'],
        journal: 'Web Technologies',
        year: 2022,
        url: 'https://example.com/article1',
        bibtex: generateBibTex('Understanding Agile Development', ['John Doe'], 2022, 'Web Technologies'),
        claim: claim.name,
      },
      {
        title: 'Test-Driven Development Best Practices',
        authors: ['Jane Smith', 'Robert Brown'],
        journal: 'Software Engineering',
        year: 2020,
        url: 'https://example.com/article2',
        bibtex: generateBibTex('Test-Driven Development Best Practices', ['Jane Smith', 'Robert Brown'], 2020, 'Software Engineering'),
        claim: claim.name,
      },
    ];

    // Filter based on the selected claim and the year range
    const filteredResults = mockResults.filter(
      (result) =>
        result.claim === claim.name &&
        result.year >= startYear &&
        result.year <= endYear
    );
    setResults(filteredResults);
  };

  // Function to generate BibTex format for demonstration purposes
  const generateBibTex = (title: string, authors: string[], year: number, journal: string): string => {
    const authorString = authors.join(' and ');
    return `@article{${authors[0].toLowerCase()}${year}${title.replace(/\s+/g, '')},
      title={${title}},
      author={${authorString}},
      journal={${journal}},
      year={${year}}
    }`;
  };

  return (
    <div>
      <h1>Search Journals</h1>
      {/* Use the dropdown-based ClaimsDropdown */}
      <ClaimsDropdown onClaimSelect={handleClaimSelect} />
      {/* Year range selection component */}
      <YearRangeFilter onYearRangeChange={handleYearRangeChange} minYear={0} maxYear={0} />
      {/* Results display component */}
      <ResultsDisplay results={results} />
    </div>
  );
};

export default SearchPage;