import { useState } from 'react'
import './FilterPanel.css'

const categories = ['Bottled', 'Energy', 'Sports', 'Tea', 'Juice', 'Water', 'Fountain', 'Coffee', 'Specialty']

const FilterPanel = ({ filters, onFiltersChange, availableCount }) => {
  const [isExpanded, setIsExpanded] = useState(true) // Always expanded in sidebar

  const toggleFilter = (filterType, value) => {
    const newFilters = { ...filters }
    if (!newFilters[filterType]) {
      newFilters[filterType] = []
    }
    
    const index = newFilters[filterType].indexOf(value)
    if (index > -1) {
      newFilters[filterType].splice(index, 1)
    } else {
      newFilters[filterType].push(value)
    }
    
    onFiltersChange(newFilters)
  }

  const clearAllFilters = () => {
    onFiltersChange({
      noCaffeine: [],
      noPackaging: [],
      noDairy: [],
      noWater: [],
      noCategory: [],
      noSugar: [],
    })
  }

  const activeFilterCount = 
    (filters.noCaffeine?.length || 0) +
    (filters.noPackaging?.length || 0) +
    (filters.noDairy?.length || 0) +
    (filters.noWater?.length || 0) +
    (filters.noCategory?.length || 0) +
    (filters.noSugar?.length || 0)

  return (
    <div className={`filter-panel ${isExpanded ? 'expanded' : ''} filter-panel-sidebar`}>
      <div className="filter-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="filter-header-content">
          <span className="filter-icon">🔍</span>
          <span className="filter-title">Filters</span>
          {activeFilterCount > 0 && (
            <span className="filter-badge">{activeFilterCount}</span>
          )}
        </div>
        <span className="filter-toggle">{isExpanded ? '−' : '+'}</span>
      </div>

      {isExpanded && (
        <div className="filter-content">
          <div className="filter-section">
            <h3 className="filter-section-title">Exclude Categories</h3>
            <div className="filter-options">
              {categories.map(category => (
                <label key={category} className="filter-option">
                  <input
                    type="checkbox"
                    checked={filters.noCategory?.includes(category) || false}
                    onChange={() => toggleFilter('noCategory', category)}
                  />
                  <span className="filter-option-label">No {category}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3 className="filter-section-title">Exclude Caffeine</h3>
            <div className="filter-options">
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.noCaffeine?.includes('caffeine') || false}
                  onChange={() => toggleFilter('noCaffeine', 'caffeine')}
                />
                <span className="filter-option-label">No Caffeine</span>
              </label>
            </div>
          </div>

          <div className="filter-section">
            <h3 className="filter-section-title">Exclude Packaging</h3>
            <div className="filter-options">
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.noPackaging?.includes('fountain') || false}
                  onChange={() => toggleFilter('noPackaging', 'fountain')}
                />
                <span className="filter-option-label">No Fountain</span>
              </label>
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.noPackaging?.includes('can') || false}
                  onChange={() => toggleFilter('noPackaging', 'can')}
                />
                <span className="filter-option-label">No Cans</span>
              </label>
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.noPackaging?.includes('bottle') || false}
                  onChange={() => toggleFilter('noPackaging', 'bottle')}
                />
                <span className="filter-option-label">No Bottles</span>
              </label>
            </div>
          </div>

          <div className="filter-section">
            <h3 className="filter-section-title">Exclude Types</h3>
            <div className="filter-options">
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.noDairy?.includes('dairy') || false}
                  onChange={() => toggleFilter('noDairy', 'dairy')}
                />
                <span className="filter-option-label">No Dairy</span>
              </label>
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.noWater?.includes('water') || false}
                  onChange={() => toggleFilter('noWater', 'water')}
                />
                <span className="filter-option-label">No Water</span>
              </label>
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.noSugar?.includes('sugar') || false}
                  onChange={() => toggleFilter('noSugar', 'sugar')}
                />
                <span className="filter-option-label">No Diet/Zero</span>
              </label>
            </div>
          </div>

          {activeFilterCount > 0 && (
            <button className="filter-clear" onClick={clearAllFilters}>
              Clear All Filters
            </button>
          )}

          <div className="filter-count">
            <span className="filter-count-text">
              {availableCount} drink{availableCount !== 1 ? 's' : ''} available
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterPanel
