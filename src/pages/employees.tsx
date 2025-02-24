import React from 'react'
import TableEmployees from '../components/table-employees'
import Input from '../components/input'

export default function Employees() {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('[Employees]', event.target.value)
  }

  return (
    <main>
      <div className='up-tb-head'>
        <h1>Funcionários</h1>
        <Input onChange={handleChange} />
      </div>
      <TableEmployees />
    </main>
  )
}
