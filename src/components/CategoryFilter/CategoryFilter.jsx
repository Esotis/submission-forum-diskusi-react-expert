import { FilterWrapper, Chip } from './CategoryFilter.styles';

function CategoryFilter({ categories, selectedCategory, onSelect }) {
  if (categories.length === 0) return null;

  return (
    <FilterWrapper role="group" aria-label="Filter kategori thread">
      <Chip
        type="button"
        $active={!selectedCategory}
        onClick={() => onSelect(null)}
      >
        Semua
      </Chip>
      {categories.map((category) => (
        <Chip
          key={category}
          type="button"
          $active={selectedCategory === category}
          onClick={() => onSelect(category)}
        >
          #{category}
        </Chip>
      ))}
    </FilterWrapper>
  );
}

export default CategoryFilter;
