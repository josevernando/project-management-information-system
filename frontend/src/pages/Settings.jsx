import React from 'react'
import Card from '../components/ui/Card'

export default function Settings(){
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Settings</h2>
      <Card title="Appearance">
        <div className="flex items-center gap-3"><button className="px-3 py-1 bg-gray-800 rounded">Dark</button></div>
      </Card>
    </div>
  )
}
