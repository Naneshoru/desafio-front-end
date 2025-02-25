import { createContext } from "react";
import { Employee } from "../models/employee";

type EmployeesContextProps = {
  employees: Employee[] | null,
  setEmployees: (employess: Employee[] | null) => void,
  fetchEmployees: (params?: string) => Promise<Employee[]>
  getEmployees: (params?: string) => Promise<void>
}

const initialValues = {
  employees: null,
  setEmployees: () => {},
  fetchEmployees: async () => [],
  getEmployees: async () => {}
}

const EmployeesContext = createContext<EmployeesContextProps>(initialValues)

export default EmployeesContext