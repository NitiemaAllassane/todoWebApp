import { useState, type ChangeEvent } from "react";
import clsx from "clsx";
import type {
    Todo,
    TaskCategories,
    TaskPriority
} from "../types/types";

import { Plus } from "lucide-react";


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


export default AddForm;