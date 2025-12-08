import React from 'react'
export default function Chart(){
  const series = [40,60,30,80,50,70,90]
  return (
    <div className="card">
      <h3 className="text-sm text-muted mb-4">Weekly Activity</h3>
      <div className="h-40 flex items-end gap-3">
        {series.map((v,i)=> (
          <div key={i} className="w-6 bg-accent rounded-t" style={{height: `${v}%`}}></div>
        ))}
      </div>
    </div>
  )
}
