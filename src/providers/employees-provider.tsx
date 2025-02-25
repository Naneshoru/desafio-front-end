import { useState } from "react";
import { Employee } from "../models/employee";
import EmployeesContext from "../contexts/employees-context";

function EmployeesProvider({ children }: { children: React.ReactElement | React.ReactElement[] }) {
  const [employees, setEmployees] = useState<Employee[] | null>(null);

  async function getEmployees (params?: string) {
    try {
      const employees = await fetchEmployees(params)
      if (employees) {
        setEmployees(employees)
      } else {
        setEmployees(null)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchEmployees (params?: string) {
    const queryParams = params ?? ''
    const data = await fetch(`http://localhost:3000/employees${queryParams}`)
    const employees: Employee[] = await data.json()
    return employees
  }

  return (
    <EmployeesContext.Provider value={{ getEmployees, fetchEmployees, employees, setEmployees }}>
      {children}
    </EmployeesContext.Provider>
  )
}

export default EmployeesProvider;