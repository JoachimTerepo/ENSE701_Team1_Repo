import React, { useState } from 'react';

// Define the list of SE Methods
const SE_METHODS = [
  "Agile",
  "Test-Driven Development",
  "Pair Programming",
  "Code Review",
  "Continuous Integration",
  "Scrum",
  "Kanban",
  "Waterfall",
];

interface SearchBarProps {
  onMethodSelect: (method: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onMethodSelect }) => {
  const [selectedMethod, setSelectedMethod] = useState(SE_METHODS[0]);

  const handleMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const method = event.target.value;
    setSelectedMethod(method);
    onMethodSelect(method); // Notify parent component of the change
  };

  return (
    <div className="searchBar">
      <select
        className="inputField"
        value={selectedMethod}
        onChange={handleMethodChange}
      >
        {SE_METHODS.map((method, index) => (
          <option key={index} value={method}>
            {method}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;
