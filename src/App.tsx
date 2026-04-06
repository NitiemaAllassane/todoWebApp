import { useState, } from 'react';
import './App.css';

import type { Todo, SearchCategories } from './types/types';

import Header from './components/Header';
import AddForm from './components/AddForm';
import SearchForm from './components/SearchForm';
import ProgressBar from './components/ProgressBar';
import Task from './components/Task';
import EmptySate from './components/EmptyState';
import Footer from './components/Footer';



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