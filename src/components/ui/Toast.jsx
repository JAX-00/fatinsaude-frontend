import { Warning } from 'postcss';
import {useEffect} from 'react'

export default function Toast({message, type = "success", onClose}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
  };
  
  return (
    <div className='fixed top-5 right-5 z-50'>
      <div className={`${colors[type]}  text-white px-5 py-3 rounded-lg shadow-lg animate-slideIn`}>
        {message}
      </div>
    </div>
  ); 
}
