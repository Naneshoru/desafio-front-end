import React, { useContext, useEffect } from 'react';

import './employees.css'

import TableEmployees from './table-employees';
import EmployeesContext from '../../contexts/employees-context';
import HeaderEmployees from './employees-header';


export default function Employees() {
  const { getEmployees } = useContext(EmployeesContext);

  useEffect(() => {
    getEmployees()
  }, []);

  return (
    <main>
      <HeaderEmployees />
      <TableEmployees />
    </main>
  );
}
