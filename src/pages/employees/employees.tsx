import { useContext, useEffect } from 'react';

import './employees.css'

import TableEmployees from './employees-table';
import EmployeesContext from '../../contexts/employees-context';
import HeaderEmployees from './employees-header';


export default function Employees() {
  const { getEmployees } = useContext(EmployeesContext);

  useEffect(() => {
    getEmployees()
  }, [getEmployees]);

  return (
    <main>
      <HeaderEmployees />
      <TableEmployees />
    </main>
  );
}
