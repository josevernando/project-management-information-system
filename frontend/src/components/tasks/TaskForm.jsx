import React, {useState, useEffect} from 'react'
import Button from '../ui/Button'
import api from '../../services/api'

export default function TaskForm(){
  const [payload, setPayload] = useState({title:'', description:'', assignee_id:'', due_date:'', status:'To Do'})

  async function submit(e){
    e.preventDefault()

    try{
      await api.post('/tasks', payload)
      alert('Task created')
      setPayload({title:'', description:'', assignee_id:'', due_date:'', status:'To Do'})
    }catch(err){ 
      console.error("API ERROR:", err.response?.data || err.message);
      alert("Failed: " + JSON.stringify(err.response?.data || err.message));
    }
  }

  return (
    <form className="card" onSubmit={submit}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input className="bg-[#071017] border border-gray-800 rounded p-2" placeholder="Title" value={payload.title} onChange={e=>setPayload({...payload,title:e.target.value})} />
        <input className="bg-[#071017] border border-gray-800 rounded p-2" placeholder="Assignee ID" value={payload.assignee_id} onChange={e=>setPayload({...payload,assignee_id:e.target.value})} />
        <input type="date" className="bg-[#071017] border border-gray-800 rounded p-2" value={payload.due_date} onChange={e=>setPayload({...payload,due_date:e.target.value})} />
      </div>
      <textarea className="mt-3 bg-[#071017] border border-gray-800 rounded p-2 w-full" placeholder="Description" value={payload.description} onChange={e=>setPayload({...payload,description:e.target.value})} />
      <div className="mt-3 flex justify-end">
        <Button>Save Task</Button>
      </div>
    </form>
  )
}
