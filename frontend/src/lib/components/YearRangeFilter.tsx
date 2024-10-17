import React from 'react';

interface YearRangeFilterProps {
  minYear: number;
  maxYear: number;
  onYearRangeChange: (startYear: number, endYear: number) => void;
}

const YearRangeFilter: React.FC<YearRangeFilterProps> = ({ minYear, maxYear, onYearRangeChange }) => {
  const [startYear, setStartYear] = React.useState(minYear);
  const [endYear, setEndYear] = React.useState(maxYear);

  const handleRangeChange = () => {
    onYearRangeChange(startYear, endYear);
  };

  return (
    <div className="filterContainer">
      <label>
        Start Year:
        <input
          type="number"
          value={startYear}
          onChange={(e) => setStartYear(parseInt(e.target.value, 10))}
          min={minYear}
          max={maxYear}
        />
      </label>
      <label>
        End Year:
        <input
          type="number"
          value={endYear}
          onChange={(e) => setEndYear(parseInt(e.target.value, 10))}
          min={minYear}
          max={maxYear}
        />
      </label>
      <button className="applyButton" onClick={handleRangeChange}>
        Apply Year Range
      </button>
    </div>
  );
};

export default YearRangeFilter;