import React, { useContext, useEffect } from 'react';
import TableEmployees from '../components/table-employees';
import Input from '../components/input';
import EmployeesContext from '../contexts/employees-context';
import { Employee } from '../models/employee';

export default function Employees() {
  const { getEmployees, fetchEmployees, setEmployees } = useContext(EmployeesContext)

  useEffect(() => {
    getEmployees()
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('[Employees]', event.target.value);
    const input = event.target.value
    const query = `?q=${input}`

    fetchEmployees(query).then((employees: Employee[]) => {
      const byJobNameAdmission = (employees: Employee[]) => {
        const filteredEmployees = employees.filter((emp: Employee) => 
          emp.job.toLowerCase().includes(input.toLowerCase()) ||
          emp.name.toLowerCase().includes(input.toLowerCase()) ||
          emp.admission_date.toLowerCase().includes(input.toLowerCase()) 
        )
        console.log('filteredEmployees', filteredEmployees)
        setEmployees(filteredEmployees)
      } 
      void byJobNameAdmission(employees)
    })
  };

  return (
    <main>
      <div className='up-tb-head'>
        <h1>Funcionários</h1>
        <Input onChange={handleChange} />
      </div>
      <TableEmployees />
    </main>
  );
}
