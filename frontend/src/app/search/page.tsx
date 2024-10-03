'use client';

import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import YearRangeFilter from '../../components/YearRangeFilter';
import ResultsDisplay from '../../components/ResultsDisplay';

// 1. Add the `Result` type here
interface Result {
  title: string;
  authors: string[];
  journal: string;
  year: number;
  url: string;
  bibtex: string;
  rating?: number; // Optional field
}

const SearchPage: React.FC = () => {
  // 2. Explicitly type the `results` state as `Result[]`
  const [results, setResults] = useState<Result[]>([]); // <-- Change here
  const [yearRange, setYearRange] = useState({ startYear: 2000, endYear: 2024 });

  const handleSearch = (query: string) => {
    const filteredResults = mockSearch(query, yearRange.startYear, yearRange.endYear);
    setResults(filteredResults); // Set the results without errors
  };

  const handleYearRangeChange = (startYear: number, endYear: number) => {
    setYearRange({ startYear, endYear });
  };

  // Mock search function with proper `Result[]` typing
  const mockSearch = (query: string, startYear: number, endYear: number): Result[] => {
    const mockResults: Result[] = [
      {
        title: 'Understanding Next.js',
        authors: ['John Doe'],
        journal: 'Web Technologies',
        year: 2022,
        url: 'https://example.com/article1',
        bibtex: generateBibTex('Understanding Next.js', ['John Doe'], 2022, 'Web Technologies'),
      },
      {
        title: 'React Patterns',
        authors: ['Jane Smith', 'Robert Brown'],
        journal: 'Frontend Development',
        year: 2020,
        url: 'https://example.com/article2',
        bibtex: generateBibTex('React Patterns', ['Jane Smith', 'Robert Brown'], 2020, 'Frontend Development'),
      },
    ];
    return mockResults.filter((result) => result.year >= startYear && result.year <= endYear);
  };

  // Function to generate BibTex format
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
      <SearchBar onSearch={handleSearch} />
      <YearRangeFilter minYear={2000} maxYear={2024} onYearRangeChange={handleYearRangeChange} />
      <ResultsDisplay results={results} />
    </div>
  );
};

export default SearchPage;
