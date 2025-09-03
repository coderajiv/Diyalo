import React from 'react';

const FilterBar = ({ filters, selectedFilter, onFilterChange }) => {
    return (
        <div className="filter-bar">
            {filters.map((filter) => (
                <button
                    key={filter}
                    className={filter === selectedFilter ? 'active' : ''}
                    onClick={() => onFilterChange(filter)}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
};

export default FilterBar;