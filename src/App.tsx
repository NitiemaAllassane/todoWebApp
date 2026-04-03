import './App.css';
import { Plus, Search, Funnel } from 'lucide-react';


function Header() {
  
  return (
    <header className='mb-8'>
      <div className='text-center'>
        <h1 
          className='text-4xl font-bold bg-linear-to-r from-indigo-500 to-purple-700 
          bg-clip-text text-transparent mb-1'
        >
          Ma liste de tâches
        </h1>
        <p className='text-gray-500 text-lg mb-1'>
          Organisez-vous et restez productif
        </p>
        <p className='text-gray-500 text-lg'>
          <span>1 tâche terminée <span className='font-extrabold'>.</span> 2 tâches au total </span>
        </p>
      </div>
    </header>
  )
}


function AddForm() {
  

  return (
    <form 
      action=""
      className='bg-white border border-gray-400 p-6 rounded-xl mb-8'
    >
      <div>
        <div className='flex items-center gap-4 mb-4'>
          <input 
            type="text" 
            name="task" 
            id="task" 
            required
            placeholder='Ajouter une nouvelle tache...'
            className='flex-1 bg-gray-200 p-2 rounded-md focus:outline-indigo-400 focus:outline-3'
          />
          <button 
            type="submit"
            disabled
            className='flex items-center gap-2 bg-gray-400 text-white py-1.5 px-2 rounded-md
            cursor-pointer'
          >
            <Plus  />
            Ajouter
          </button>
        </div>

        <div className='flex items-center gap-6'>
          {/* Categories des taches */}
          <div>
            <label 
              htmlFor="taskCategories"
              className='font-semibold text-black'
            >
                Catégorie
              </label>
            <select 
              name="taskCategories" 
              id="taskCategories"
              className='p-1 border border-gray-400 rounded-md'
            >
              <option value="personal">Personnel</option>
              <option value="work">Travail</option>
              <option value="shopping">Courses</option>
              <option value="health">Santé</option>
            </select>
          </div>

          {/* Priorité des taches */}
          <div>
            <label 
              htmlFor="taskPriorities"
              className='font-semibold text-black'
            >
              Priorité
            </label>
            <select 
              name="taskPriorities" 
              id="taskPriorities"
              className='p-1 border border-gray-400 rounded-md'
            >
              <option value="low">Faible</option>
              <option value="medium">Moyenne</option>
              <option value="high">Élevée</option>
            </select>
          </div>

        </div>
      </div>
    </form>
  )
}


function SearchForm() {
  
  return (
    <form action="">
      <search className='flex items-center gap-4'>
        <div 
          className='flex items-center gap-1 flex-1 bg-gray-200 p-2 rounded-md
          focus-within:ring-2 focus-within:ring-indigo-400'
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
          />
        </div>

        <div className='flex items-center gap-3'>
          <span>
            <Funnel size={20} className='text-gray-500' />
          </span>
          <select name="filter" id="filter" className='p-1 border border-gray-400 rounded-md'>
            <option value="allCategories">Toutes les categories</option>
            <option value="personal">Personnel</option>
            <option value="work">Travail</option>
            <option value="shopping">Courses</option>
            <option value="health">Santé</option>
          </select>
        </div>
      </search>
    </form>
  )
}


function App() {
  

  return (
    <main className='bg-slate-50 min-h-dvh py-6'>
      <div className="container">
        <Header  />
        <AddForm  />
        <SearchForm  />
      </div>
    </main>
  )
}

export default App;