import { useState } from "react";
import { Employee } from "../models/employee";
import EmployeesContext from "../contexts/employees-context";

function EmployeesProvider({ children }: { children: React.ReactElement | React.ReactElement[] }) {
  const [employees, setEmployees] = useState<Employee[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function getEmployees (params?: string) {
    try {
      const employees = await fetchEmployees(params)
      if (employees) {
        setEmployees(employees)
      } else {
        setEmployees([])
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchEmployees (params?: string) {
    setIsLoading(true)
    const data = await fetch(`http://localhost:3000/employees?${params}`)
    const employees: Employee[] = await data.json()
    setIsLoading(false)
    return employees
  }

  return (
    <EmployeesContext.Provider value={{ getEmployees, fetchEmployees, employees, setEmployees, isLoading }}>
      {children}
    </EmployeesContext.Provider>
  )
}

export default EmployeesProvider;