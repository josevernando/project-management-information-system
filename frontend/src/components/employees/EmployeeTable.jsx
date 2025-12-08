import React, { useEffect, useState } from 'react'
import api from '../../services/api'

export default function EmployeeTable() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchEmployees()
  }, [])

  async function fetchEmployees() {
    try {
      const res = await api.get("/employees")   // ✅ Correct endpoint
      setUsers(res.data)
    } catch (e) {
      console.error("Failed to load employees", e)
    }
  }

  return (
    <div className="card">
      <table className="w-full text-left text-sm">
        <thead className="text-muted text-xs">
          <tr>
            <th>Name</th>
            <th>Dept</th>
            <th>Position</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t border-gray-800">
              <td className="py-3">{u.name}</td>
              <td>{u.department}</td>
              <td>{u.position}</td>
              <td>{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

