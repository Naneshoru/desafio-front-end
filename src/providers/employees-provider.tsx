import React, { useState, useCallback, useEffect } from "react";
import { Employee } from "../models/employee";
import EmployeesContext from "../contexts/employees-context";

function EmployeesProvider({ children }: { children: React.ReactElement | React.ReactElement[] }) {
  const [employees, setEmployees] = useState<Employee[] | null>(null);
  const [filter, setFilter] = useState<{ search: string }>({ search: '' });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchEmployees = useCallback(async (params?: string) => {
    let employees: Employee[] = [];
    setIsLoading(true);
    try {
      const queryParams = params ?? '';
      const data = await fetch(`http://localhost:3000/employees?${queryParams}`);
      employees = await data.json();
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
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

  const filterbyJobNameAdmission = useCallback((employees: Employee[], filter: { search: string }): Employee[] => {
    const { search } = filter;
    if (!search) return employees;
    const filteredEmployees = employees.filter((emp: Employee) =>
      emp.job.toLowerCase().includes(search.toLowerCase()) ||
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.admission_date.includes(search)
    );
    return filteredEmployees;
  }, []);

  useEffect(() => {
    if (employees) {
      const filteredEmployees = filterbyJobNameAdmission(employees, filter);
      setEmployees(filteredEmployees);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, filterbyJobNameAdmission]);

  return (
    <EmployeesContext.Provider value={{ getEmployees, fetchEmployees, employees, setEmployees, isLoading, filter, setFilter }}>
      {children}
    </EmployeesContext.Provider>
  );
}

export default EmployeesProvider;