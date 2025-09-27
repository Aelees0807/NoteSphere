import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="p-4 bg-white/5 backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-charcoal-blue dark:text-white tracking-wider">NoteSphere</h1>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/10 dark:bg-white/10 text-charcoal-blue dark:text-white hover:bg-black/20 dark:hover:bg-white/20 transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </nav>
  );
}