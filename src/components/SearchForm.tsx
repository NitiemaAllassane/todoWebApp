import type { SearchCategories } from "../types/types";
import { Search, Funnel } from "lucide-react";

function SearchForm({ 
  searchValue, 
  categoriesValue,
  onSearchValueChange, 
  filterByCategorie 
}: { 
  searchValue: string;
  categoriesValue: SearchCategories;
  onSearchValueChange: (value: string) => void;
  filterByCategorie: (text: SearchCategories) => void;
}) {
  
  return (
    <form action="" className='mb-6'>
      <search className='flex flex-col md:flex-row items-center gap-4'>
        <div 
          className='flex flex-1 items-center gap-1 bg-gray-200 p-2 rounded-md
          focus-within:ring-2 focus-within:ring-indigo-400 w-full md:w-auto'
        >
          <span>
            <Search size={20} className='text-gray-500'  />
          </span>
          <input 
            type="search" 
            name="taskSearch" 
            id="taskSearch" 
            placeholder='Rechercher des tâches...'
            className='w-full outline-none'
            value={searchValue}
            onChange={(e) => onSearchValueChange(e.target.value)}
          />
        </div>

        <div className='flex items-center gap-3 w-full md:w-auto'>
          <span>
            <Funnel size={20} className='text-gray-500' />
          </span>
          <select 
            name="filter" 
            id="filter" 
            className='p-1 border border-gray-400 rounded-md w-full md:w-auto'
            value={categoriesValue}
            onChange={(e) => filterByCategorie(e.target.value as SearchCategories)}
          >
            <option value="allCategorie">Toutes les categories</option>
            <option value="personal">Personnel</option>
            <option value="work">Travail</option>
            <option value="shopping">Courses</option>
            <option value="health">Santé</option>
          </select>
        </div>
      </search>
    </form>
  );
}


export default SearchForm;