import React from 'react'

export default function Navbar({ onToggleTasks, showTasks }) {
  return (
    <nav style={{ padding: '12px', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 20 }}>🚗</span>
          <strong>Premium Rentals</strong>
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button onClick={onToggleTasks}>
            {showTasks ? 'Close Tasks' : 'Tasks'}
          </button>
        </div>
      </div>
    </nav>
  )
}
