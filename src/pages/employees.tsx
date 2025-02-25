import React, { useContext, useEffect, useState } from 'react';

import './employees.css'

import TableEmployees from '../components/table-employees';
import { UncontrolledInput } from '../components/input';
import EmployeesContext from '../contexts/employees-context';
import { Employee } from '../models/employee';
import { useDebounce } from '../hooks/debounce';

export default function Employees() {
  const { getEmployees, fetchEmployees, setEmployees } = useContext(EmployeesContext);

  useEffect(() => {
    getEmployees();
  }, []);

  const [debouncedInput, setDebouncedInput] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    debouncedCallback(input);
  };

  const debouncedCallback = useDebounce((value: string) => {
    setDebouncedInput(value);
  }, 300);

  useEffect(() => {
    const query = `?q=${debouncedInput}`;

    fetchEmployees(query).then((employees: Employee[]) => {
      const byJobNameAdmission = (employees: Employee[]) => {
        const filteredEmployees = employees.filter((emp: Employee) =>
          emp.job.toLowerCase().includes(debouncedInput.toLowerCase()) ||
          emp.name.toLowerCase().includes(debouncedInput.toLowerCase()) ||
          emp.admission_date.toLowerCase().includes(debouncedInput.toLowerCase())
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
        <UncontrolledInput onChange={handleChange} placeholder='Pesquisar' />
      </div>
      <TableEmployees />
    </main>
  );
}
