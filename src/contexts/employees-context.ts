import { createContext } from "react";
import { Employee } from "../models/employee";
import { Proccesed } from "../components/table";

type EmployeesContextProps = {
  employees: Employee[] | null,
  setEmployees: (employess: Employee[] | null) => void,
  fetchEmployees: (params?: string) => Promise<Employee[]>
  getEmployees: (params?: string) => Promise<void>
  isLoading: boolean
  filter: { search: string } | null
  setFilter: ({ search }: { search: string }) => void
  proccesedEmployees: Employee[] | Proccesed<Employee>[]
}

const initialValues = {
  employees: null,
  setEmployees: () => {},
  fetchEmployees: async () => [],
  getEmployees: async () => {},
  isLoading: false,
  filter: { search: '' },
  setFilter: () => {},
  proccesedEmployees: []
}

const EmployeesContext = createContext<EmployeesContextProps>(initialValues)

export default EmployeesContext