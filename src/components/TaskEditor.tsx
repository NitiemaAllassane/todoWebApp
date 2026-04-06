import { useState } from "react";
import clsx from "clsx";
import type { TaskEditorProps } from "../types/types";
import { Check, X } from "lucide-react";


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


export default TaskEditor;