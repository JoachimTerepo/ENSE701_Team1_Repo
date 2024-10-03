import React from 'react';

interface Result {
  title: string;
  authors: string[];
  journal: string;
  year: number;
  url: string;
  bibtex: string;
}

interface ResultsDisplayProps {
  results: Result[];
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  return (
    <div className="container">
      <h2 className="text-center">Search Results</h2>
      {results.length === 0 ? (
        <p className="text-center">No results found</p>
      ) : (
        <ul>
          {results.map((result, index) => (
            <li key={index} className="resultCard">
              <p className="resultCardTitle">{result.title}</p>
              <p className="resultCardAuthors">by {result.authors.join(', ')}</p>
              <p className="resultCardJournal">
                {result.journal} ({result.year})
              </p>
              <p>
                <a href={result.url} target="_blank" rel="noopener noreferrer">
                  Access Article
                </a>
              </p>
              <pre className="bibtex">{result.bibtex}</pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResultsDisplay;
