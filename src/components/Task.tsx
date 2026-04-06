import { useState } from "react";
import clsx from "clsx";
import type { TaskProps } from "../types/types";
import { Pencil, X } from "lucide-react";
import TaskEditor from "./TaskEditor";


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


export default Task;