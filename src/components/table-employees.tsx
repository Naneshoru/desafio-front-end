import React, { useEffect, useState } from 'react'
import Table from './table'

type Employee = {
  id: number
  name: string
  job: string
  admission_date: string
  phone: string
  image: string
}

async function fetchEmployees () {
  const data = await fetch('http://localhost:3000/employees?job=Front-end')
  const employees: Employee[] = await data.json()
  return employees
}

export default function TableEmployees() {
  const [employees, setEmployees] = useState<Employee[] | null>(null)

  useEffect(() => {
    try {
      fetchEmployees()
        .then((res) => {
          if (res) {
            setEmployees(res)
          } else {
            setEmployees(null)
          }
        })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const mainProps: Array<keyof Employee> = ['image', 'name']

  return (
    <Table items={employees} mainProps={mainProps} />
  )
}
