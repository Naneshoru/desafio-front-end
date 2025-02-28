import React, { useContext, useEffect, useState } from 'react';

import './employees.css'

import TableEmployees from '../components/table-employees';
import { UncontrolledInput } from '../components/input';
import EmployeesContext from '../contexts/employees-context';
import { Employee } from '../models/employee';
import { useDebounce } from '../hooks/debounce';
import SearchSvg from '../assets/search.svg'

export default function Employees() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { getEmployees, fetchEmployees, setEmployees } = useContext(EmployeesContext);

  useEffect(() => {
    getEmployees();
  }, []);

  const [debouncedInput, setDebouncedInput] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    debouncedCallback(input);
  };

  const debouncedCallback = useDebounce((value: string) => {
    setDebouncedInput(value);
  }, 300);

  useEffect(() => {
    if (debouncedInput == null) return
    const query = `?q=${debouncedInput}`;

    fetchEmployees(query).then((employees: Employee[]) => {
      const byJobNameAdmission = (employees: Employee[]) => {
        const filteredEmployees = employees.filter((emp: Employee) =>
          emp.job.toLowerCase().includes(debouncedInput.toLowerCase()) ||
          emp.name.toLowerCase().includes(debouncedInput.toLowerCase()) ||
          emp.admission_date.includes(debouncedInput)
        );
        console.log('filteredEmployees', filteredEmployees);
        
        setEmployees(filteredEmployees);
      };
      void byJobNameAdmission(employees);
    });
  }, [debouncedInput]);

  return (
    <main>
      <div className='up-tb-head'>
        <h1>Funcionários</h1>
        <div className='input-wrapper'>
          <UncontrolledInput onChange={handleChange} placeholder='Pesquisar' />
          <img src={SearchSvg} alt="Seach icon" />
        </div>
      </div>
      <TableEmployees />
    </main>
  );
}
