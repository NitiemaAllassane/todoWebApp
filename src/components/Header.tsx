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

export default Header;