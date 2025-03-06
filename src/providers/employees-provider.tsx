import React, { useState, useCallback, useMemo } from "react";
import { Employee } from "@models/employee";
import EmployeesContext from "@contexts/employees-context";
import { isoToDDMMYYYY, phoneFormat } from "@utils/formatters";
import { Proccesed } from "@components/table";
 
function EmployeesProvider({ children }: { children: React.ReactElement | React.ReactElement[] }) {
  const [employees, setEmployees] = useState<Employee[] | null>(null);
  const [filter, setFilter] = useState<{ search: string } | null>(null);

  const fetchEmployees = useCallback(async (params?: string) => {
    let employees: Employee[] = [];
    try {
      const queryParams = params ?? '';
      const data = await fetch(`http://localhost:3000/employees?${queryParams}`);
      employees = await data.json();
    } catch (error) {
      alert(error);
    }
    return employees;
  }, []);

  const getEmployees = useCallback(async (params?: string): Promise<void> => {
    const employees = await fetchEmployees(params);
    if (employees) {
      setEmployees(employees);
    } else {
      setEmployees([]);
    }
  }, [fetchEmployees]);

  const formatEmployees = useCallback((employees: Array<Employee | Proccesed<Employee>>) => {
    return employees?.map(employee => ({
        ...employee,
        admission_date: isoToDDMMYYYY(employee.admission_date),
        phone: phoneFormat(employee.phone)
      })) ?? null;
  }, []);

  const filterbyJobNameAdmission = useCallback((employees: Array<Employee | Proccesed<Employee>>): Array<Employee | Proccesed<Employee>> => {
    const search = filter?.search;
    if (!search) return employees;
    const filteredEmployees: Array<Employee | Proccesed<Employee>> = employees?.filter((emp: Employee | Proccesed<Employee>) => {
      const date = (emp.admission_date)

      const [day, month, year] = date.split('/')
    
      return (
        emp.job.toLowerCase().includes(search.toLowerCase()) ||
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.admission_date.includes(search) ||
        year.toString().includes(search) ||
        month.toString().includes(search) || 
        day.toString().includes(search) ||
        emp.phone.includes(search) 
      )}
    ) ?? [];
    return filteredEmployees;
  }, [filter]);

  const proccesedEmployees = useMemo(() => {
    let proccesed: Proccesed<Employee>[] | null = null;

    if (employees) {
      // '2019-12-02T00:00:00.000Z' → '11/02/2020'
      proccesed = formatEmployees(employees)
      proccesed = filterbyJobNameAdmission(proccesed);
    }
    return proccesed
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, employees, filterbyJobNameAdmission]);

  return (
    <EmployeesContext.Provider value={{ getEmployees, fetchEmployees, employees, setEmployees, proccesedEmployees, filter, setFilter }}>
      {children}
    </EmployeesContext.Provider>
  );
}

export default EmployeesProvider;