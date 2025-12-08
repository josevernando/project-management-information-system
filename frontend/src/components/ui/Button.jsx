import React from 'react'
export default function Button({ children, onClick, variant='primary' }){
  const base = 'px-3 py-1 rounded-md text-sm font-medium';
  const styles = variant==='primary' ? 'bg-accent text-white' : 'bg-gray-800 text-white';
  return <button onClick={onClick} className={`${base} ${styles}`}>{children}</button>
}
