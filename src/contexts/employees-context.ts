import { createContext } from "react";
import { Employee } from "../models/employee";
import { Proccesed } from "../components/table";

type EmployeesContextProps = {
  employees: Employee[] | null,
  setEmployees: (employess: Employee[] | null) => void,
  fetchEmployees: (params?: string) => Promise<Employee[]>
  getEmployees: (params?: string) => Promise<void>
  filter: { search: string } | null
  setFilter: ({ search }: { search: string }) => void
  proccesedEmployees: Employee[] | Proccesed<Employee>[] | null
}

const initialValues = {
  employees: null,
  setEmployees: () => {},
  fetchEmployees: async () => [],
  getEmployees: async () => {},
  filter: { search: '' },
  setFilter: () => {},
  proccesedEmployees: null
}

const EmployeesContext = createContext<EmployeesContextProps>(initialValues)

export default EmployeesContext