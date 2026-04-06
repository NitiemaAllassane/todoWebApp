

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


export default ProgressBar;