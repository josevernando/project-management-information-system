import React, {useState, useEffect} from 'react'
import Card from '../components/ui/Card'
import TaskTable from '../components/tasks/TaskTable'
import TaskForm from '../components/tasks/TaskForm'

export default function Tasks(){
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Tasks</h2>
        <div className="text-sm text-muted">Manage tasks and assignments</div>
      </div>

      <TaskForm />

      <TaskTable />
    </div>
  )
}
