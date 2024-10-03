'use client'; // Required for stateful components in the new Next.js app directory

import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import YearRangeFilter from '../../components/YearRangeFilter';
import ResultsDisplay from '../../components/ResultsDisplay';

interface Result {
  title: string;
  authors: string[];
  journal: string;
  year: number;
  url: string;
  bibtex: string;
  method: string; // Add a `method` field to represent the SE method used
}

const SearchPage: React.FC = () => {
  // State for the search results and year range
  const [results, setResults] = useState<Result[]>([]);
  const [yearRange, setYearRange] = useState({ startYear: 2000, endYear: 2024 });
  const [selectedMethod, setSelectedMethod] = useState("Agile"); // Default SE method

  // Function to handle SE method selection
  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method);
    handleSearch(method, yearRange.startYear, yearRange.endYear);
  };

  // Function to handle year range changes
  const handleYearRangeChange = (startYear: number, endYear: number) => {
    setYearRange({ startYear, endYear });
    handleSearch(selectedMethod, startYear, endYear); // Reapply filter based on new year range
  };

  // Mock search function for demonstration purposes
  const handleSearch = (method: string, startYear: number, endYear: number): void => {
    // Mock data representing articles in the database
    const mockResults: Result[] = [
      {
        title: 'Understanding Agile Development',
        authors: ['John Doe'],
        journal: 'Web Technologies',
        year: 2022,
        url: 'https://example.com/article1',
        bibtex: generateBibTex('Understanding Agile Development', ['John Doe'], 2022, 'Web Technologies'),
        method: 'Agile',
      },
      {
        title: 'Test-Driven Development Best Practices',
        authors: ['Jane Smith', 'Robert Brown'],
        journal: 'Software Engineering',
        year: 2020,
        url: 'https://example.com/article2',
        bibtex: generateBibTex('Test-Driven Development Best Practices', ['Jane Smith', 'Robert Brown'], 2020, 'Software Engineering'),
        method: 'Test-Driven Development',
      },
    ];

    // Filter based on the selected SE method and the year range
    const filteredResults = mockResults.filter(
      (result) =>
        result.method === method &&
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
      {/* Use the dropdown-based SearchBar */}
      <SearchBar onMethodSelect={handleMethodSelect} />
      {/* Year range selection component */}
      <YearRangeFilter minYear={2000} maxYear={2024} onYearRangeChange={handleYearRangeChange} />
      {/* Display the search results */}
      <ResultsDisplay results={results} />
    </div>
  );
};

export default SearchPage;
