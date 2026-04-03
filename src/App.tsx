import './App.css';


function Header() {
  
  return (
    <header>
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


function App() {
  

  return (
    <main className='bg-blue-50 min-h-dvh py-2'>
      <div className="container">
        <Header  />
      </div>
    </main>
  )
}

export default App;