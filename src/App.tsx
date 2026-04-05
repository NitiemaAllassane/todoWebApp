import { useState, type ChangeEvent } from 'react';
import './App.css';
import { 
  Plus, 
  Search, 
  Funnel,
  Pencil,
  X,
  Check
} from 'lucide-react';
import clsx from 'clsx';


type TaskCategories = "personal" | "work" | "shopping" | "health";
type TaskPriority = "low" | "medium" | "high";
type SearchCategories = "allCategorie" | "personal" | "work" | "shopping" | "health";

interface Todo {
  id: number;
  isDone: boolean;
  text: string;
  category: TaskCategories;
  priority: TaskPriority;
}

interface TaskProps extends Todo {
  onTaskfinish: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
}


interface TaskEditorProps {
  taskId: number;
  isTaskDone: boolean;
  taskText: string;
  handleTaskFinish: (id: number) => void;
  editTask: (id: number, text: string) => void;
  onCancel: () => void;
}

function Header({ 
  completedTaskNumber, 
  totalTasksNumber
}: { completedTaskNumber: number, 
  totalTasksNumber: number
}) {
  
  return (
    <header className='mb-8'>
      <div className='text-center'>
        <h1 
          className='text-3xl md:text-4xl font-bold bg-linear-to-r from-indigo-500 to-purple-700 
          bg-clip-text text-transparent mb-1'
        >
          Ma liste de tâches
        </h1>
        <p className='text-gray-500 md:text-lg mb-1'>
          Organisez-vous et restez productif
        </p>
        <p className='text-gray-500 md:text-lg'>
          <span>
            {`${completedTaskNumber} ${completedTaskNumber <= 1 ? "tâche terminée" : "tâches terminées"}`} 
            <span className='font-extrabold mx-2'>.</span>   
            {`${totalTasksNumber} ${totalTasksNumber <= 1 ? "tâche au total " : "tâches au total "}`} 
          </span>
        </p>
      </div>
    </header>
  )
}


function AddForm({ onAddingTask } : { onAddingTask: (task: Omit<Todo, 'id'>) => void }) {
  const [taskText, setTaskText ] = useState("");
  const [category, setCatogory ] = useState<TaskCategories>("personal");
  const [priority, setPriority ] = useState<TaskPriority>("medium");

  const handleAdding = (e: ChangeEvent) => {
    e.preventDefault();
    onAddingTask({
      isDone: false,
      text: taskText,
      category: category,
      priority: priority,
    });

    setTaskText("");
  }

  const isInputValueEmpty = taskText.trim() === "";

  return (
    <form 
      action=""
      className='bg-white border border-gray-400 p-6 rounded-xl mb-8'
      onSubmit={handleAdding}
    >
      <div>
        <div className='flex flex-col md:flex-row items-center gap-4 mb-4'>
          <input 
            type="text" 
            name="task" 
            id="task" 
            required
            placeholder='Ajouter une nouvelle tache...'
            className='md:flex-1 w-full md:w-auto bg-gray-200 p-2 rounded-md focus:outline-indigo-400 focus:outline-3'
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
          <button 
            type="submit"
            disabled={isInputValueEmpty}
            className={clsx(
              `flex items-center gap-2 bg-black text-white w-full md:w-auto py-1.5 px-2 rounded-md`,
            isInputValueEmpty ? "bg-gray-400 cursor-not-allowed" : "cursor-pointer"
            )}
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
              value={category}
              onChange={(e) => setCatogory(e.target.value as TaskCategories)}
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
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
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


function Task({
  id,
  isDone,
  text,
  category,
  priority,
  onTaskfinish,
  onDelete,
  onEdit,
}: TaskProps) {

  const [isOnEdit, setIsOnEdit] = useState(false);

  let priorityText: string;
  let categorieText: string;

  function switchToEdit() {
    if (isOnEdit) return;
    setIsOnEdit(true);
  }

  function switchToDisplay() {
    if (!isOnEdit) return;
    setIsOnEdit(false);
  }

  // Restriction des priorité
  switch (priority) {
    case "high":
      priorityText = "elevée";
      break;

    case "low":
      priorityText = "faible";
      break;
    
    case "medium":
      priorityText = "moyenne";
      break;
  
    default:
      priorityText = "";
      break;
  }

  // Restriction des categories
  switch (category) {
    case "health":
      categorieText = "Santé";
      break;

    case "personal":
      categorieText = "Personnel";
      break;
    
    case "shopping":
      categorieText = "Course";
      break;

    case "work":
      categorieText = "Travail";
      break;
  
    default:
      categorieText = "";
      break;
  }
  
  return (
    <>
      <form 
        action=""
        className='bg-white border border-gray-400 px-2 py-3 md:px-3 md:py-6 rounded-xl'
        onSubmit={(e) => e.preventDefault()}
      >
        {!isOnEdit 
        ? <article className={clsx(
          `flex justify-between items-center transition-opacity duration-200`,
          isDone && "opacity-55"
        )}>
          <div className='flex items-center gap-3 md:gap-6'>
            <div>
              <input 
                type="checkbox" 
                name="doneTask" 
                id="doneTask" 
                checked={isDone}
                onChange={() => onTaskfinish(id)}
                className='w-5 h-5'
              />
            </div>

            <div>
              <p 
                className={clsx(
                'mb-3',
                isDone && "line-through text-gray-400"
              )}>
                {text}
              </p>
              <div className='flex items-center gap-4'>
                <span 
                  className='text-xs font-semibold border 
                  border-gray-300 px-2 py-1 rounded-2xl'
                >
                  {categorieText}
                </span>
                <span 
                  className={clsx(
                    `text-xs font-semibold border px-2 py-1 rounded-2xl`,
                    priority === "medium" && "text-yellow-900 bg-yellow-100 border-yellow-300",
                    priority === "low" && "text-green-900 bg-green-100 border-green-300",
                    priority === "high" && "text-red-900 bg-red-100 border-red-300",
                  )}
                >
                  {priorityText}
                </span>
              </div>
            </div>
          </div>

          <div className='flex items-center gap-0.5 md:gap-2'>
            <button 
              className='p-1 md:p-2 rounded-sm hover:bg-gray-300 cursor-pointer'
              onClick={switchToEdit}
            >
              <Pencil size={20} className='font-semibold'  />
            </button>
            <button 
              className='p-1 md:p-2 rounded-sm hover:bg-gray-300 cursor-pointer'
              onClick={() => onDelete(id)}
            >
              <X size={20} className='font-semibold text-red-600' />
            </button>
          </div>
        </article>
        : <TaskEditor  
          taskId={id}
          isTaskDone={isDone}
          taskText={text}
          handleTaskFinish={onTaskfinish}
          onCancel={switchToDisplay}
          editTask={onEdit}
        />}
      </form>
    </>
  )
}


function TaskEditor({ taskId, isTaskDone, taskText, handleTaskFinish, editTask, onCancel}: TaskEditorProps) {
  const [newTaskText, setNewTaskText] = useState(taskText)
  
  return (
    <article className={clsx(
          `transition-opacity duration-200`,
          isTaskDone && "opacity-55"
        )}>
      <div className='flex items-center gap-3'>
        <div>
          <input 
            type="checkbox" 
            name="doneTask" 
            id="doneTask" 
            checked={isTaskDone}
            onChange={() => handleTaskFinish(taskId)}
            className='w-5 h-5'
          />
        </div>
        
        <div className='flex flex-1 items-center gap-2 md:gap-5'>
          <input 
            type="text" 
            name="editTask" 
            id="editTask" 
            className='w-full py-1 px-2 bg-gray-200 rounded-md focus:outline-3 focus:outline-indigo-400'
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
          />

          <div className='flex items-center gap-2 md:gap-3'>
            <button 
              className='p-1 md:p-2 rounded-lg bg-black cursor-pointer'
              onClick={() => {
                editTask(taskId, newTaskText);
                onCancel();
              }}
            >
              <Check size={20} className='font-semibold text-white'  />
            </button>
            <button 
              className='p-1 md:p-2 rounded-lg border border-gray-300 hover:bg-gray-300 cursor-pointer'
              onClick={onCancel}
            >
              <X size={20} className='font-semibold text-black' />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}


function ProgressBar({ progress = 0 }: { progress: number | string}) {
  
  return (
    <form 
      action="" 
      className='bg-white border border-gray-400 px-3 py-6 rounded-xl'
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-600">
            Avancement
          </span>
          <span className="text-sm font-semibold text-gray-800">
            {progress}%
          </span>
        </div>

        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-indigo-500 to-pink-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </form>
  )
}

function EmptySate({ 
  message }: { message: string}
) {
  
  return (
    <div 
      className='bg-white border border-gray-400 rounded-xl 
      flex flex-col items-center justify-center gap-2 py-12'
    >
      <div className='bg-gray-300 w-20 h-20 rounded-full flex items-center justify-center'>
        <Check size={48} className='text-gray-500'  />
      </div>
      <h3 className='text-gray-600'>Aucune tâche trouvée</h3>
      <p className='text-gray-600 text-center'>{message}</p>
    </div>
  )
}

function Footer() {
  return (
  <footer className='bg-gray-300 text-center py-4 '>
    <div className="container">
      <p>
        &copy;2026 
        <span 
          className='font-bold bg-linear-to-r from-indigo-500 to-purple-700 
          bg-clip-text text-transparent'
        >Ma liste des taches</span>. Tous droit réservés.
      </p>
      <p>
        Développé par 
        <a 
          href="https://nitiema-allassane.vercel.app/about" 
          target="_blank" 
          rel="noopener noreferrer"
          className='underline'
        >Nitiema Allassane
        </a>
      </p>
    </div>
  </footer>
  )
}



function App() {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [categoryValue, setCategoryValue] = useState<SearchCategories>("allCategorie");
  
  const finishedTasks = tasks.filter((task) => task.isDone === true);
  const progressValue =(finishedTasks.length/tasks.length)*100;

  // Filtre des taches
  const searchResults =  tasks.filter(task => {
    // filtre texte
    if (searchValue.trim() !== "") {
      return task.text.toLowerCase().includes(searchValue.toLowerCase());
    }
    return true;
  }).filter(task => {
    // filtre catégorie
    if (categoryValue !== "allCategorie") {
      return task.category === categoryValue;
    }
    return true;
  });

  const isEmpty = tasks.length === 0;
  const noResults = searchResults.length === 0;


  // Ajout d'une tache
  function addTask( task: Omit<Todo, 'id'>) {
    const newTask: Todo = {
      ...task,
      id: Date.now(),
    }
    setTasks([...tasks, newTask]);
  }

  // Gerer l'etat de finission d'une tache
  function handleFinishTask(id: number) {
    const editedTasks = tasks.map( task => {
      if (task.id === id) {
        return {...task, isDone: !task.isDone};
      } else {
        return task;
      }
    });

    setTasks(editedTasks)
  }

  // Supprimer une tache
  function deleteTask(id: number) {
    const newTasks = tasks.filter( task => task.id !== id);
    setTasks(newTasks);
  }

  // Modifier une tache
  function editTask(id: number, text: string) {
    const newTasks = tasks.map( task => {
      if (task.id === id) {
        return {...task, text}
      }

      return task;
    });

    setTasks(newTasks);
  }

  return (
    <>
      <main className='bg-slate-50 min-h-dvh py-6 mb-12'>
        <div className="container">
          <div>
            <Header 
              completedTaskNumber={finishedTasks.length} 
              totalTasksNumber={tasks.length}
            />
            <AddForm onAddingTask={addTask}  />
            <SearchForm  
              searchValue={searchValue}
              categoriesValue={categoryValue}
              onSearchValueChange={setSearchValue}
              filterByCategorie={setCategoryValue}
            />
          </div>

          {isEmpty ? (
            <EmptySate message="Ajoutez votre première tâche pour commencer !" />
          ) : noResults ? (
            <>
              <div className='mb-6'>
                <EmptySate message="Essayez de modifier votre recherche." />
              </div>
              <ProgressBar progress={Math.round(progressValue)} />
            </>
          ) : (
            <>
              <ul className='flex flex-col gap-3 mb-6'>
                {searchResults.map(task => (
                  <li key={task.id}>
                    <Task  
                      id={task.id}
                      isDone={task.isDone}
                      text={task.text}
                      category={task.category}
                      priority={task.priority}
                      onTaskfinish={handleFinishTask}
                      onDelete={deleteTask}
                      onEdit={editTask}
                    />
                  </li>
                ))}
              </ul>

              <ProgressBar progress={Math.round(progressValue)} />
            </>
          )}
        </div>
      </main>

      <Footer  />
    </>
  );
}

export default App;