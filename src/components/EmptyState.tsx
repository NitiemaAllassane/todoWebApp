import { Check } from "lucide-react";


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


export default EmptySate