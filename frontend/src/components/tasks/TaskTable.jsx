import React, {useEffect, useState} from 'react'
import api from '../../services/api'
import TaskStatusDropdown from "../tasks/TaskStatusDropdown";

export default function TaskTable(){
  const [tasks, setTasks] = useState([])
  useEffect(()=>{ fetch() }, [])
  async function fetch(){
    try{ const res = await api.get('/tasks'); setTasks(res.data) }catch(e){ console.error(e) }
  }

  return (
    <div className="card">
      <table className="w-full text-left text-sm">
        <thead className="text-muted text-xs">
          <tr><th className="py-2">Title</th><th>Assignee</th><th>Due</th><th>Status</th><th>Id</th></tr>
        </thead>
        <tbody>
          {tasks.map(t=> (
            <tr key={t.id} className="border-t border-gray-800">
              <td className="py-3">{t.title}</td>
              <td className="py-3">{t.assignee_id}</td>
              <td className="py-3">{t.due_date ? new Date(t.due_date).toLocaleDateString(): '-'}</td>
              <td className="py-3"><TaskStatusDropdown task={t} /></td>
	      <td className="py-3">{t.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
