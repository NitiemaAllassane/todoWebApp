
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

export default Footer;
