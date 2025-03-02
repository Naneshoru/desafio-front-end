import { createContext } from "react";
import { Employee } from "../models/employee";

type EmployeesContextProps = {
  employees: Employee[] | null,
  setEmployees: (employess: Employee[] | null) => void,
  fetchEmployees: (params?: string) => Promise<Employee[]>
  getEmployees: (params?: string) => Promise<void>
  isLoading: boolean
  filter: { search: string }
  setFilter: ({ search }: { search: string }) => void
}

const initialValues = {
  employees: null,
  setEmployees: () => {},
  fetchEmployees: async () => [],
  getEmployees: async () => {},
  isLoading: false,
  filter: { search: '' },
  setFilter: () => {}
}

const EmployeesContext = createContext<EmployeesContextProps>(initialValues)

export default EmployeesContext