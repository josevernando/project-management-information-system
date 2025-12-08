import React from 'react'
import EmployeeTable from '../components/employees/EmployeeTable'

export default function Employees(){
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Employees</h2>
      <EmployeeTable />
    </div>
  )
}
