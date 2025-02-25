import React, { useCallback, useContext } from 'react';

import './table-employees.css'
import '../styles/table.css'

import Table from '../components/table';
import EmployeesContext from '../contexts/employees-context';
import { Employee } from '../models/employee';

export default function TableEmployees() {
  const { employees } = useContext(EmployeesContext)

  const fields: Array<{ name: keyof Employee, displayName: string }> = [
    { name: 'image', displayName: 'Foto' }, 
    { name: 'name', displayName: 'Nome' }, 
    { name: 'job', displayName: 'Cargo' }, 
    { name: 'admission_date', displayName: 'Data de admissão' },
    { name: 'phone', displayName: 'Telefone' }
  ]
  const mainFields: Array<keyof Employee> = ['image', 'name'];

  const customRows = useCallback((index: number) => {
    if (employees?.[index] == null) return []
    const employDaVez = employees[index]
    const templates = [
      <td>{<img src={employDaVez?.image} alt="employee"></img>}</td>,
      <td>{employDaVez.name}</td>,
      <td>{employDaVez.job}</td>,
      <td>{employDaVez.admission_date}</td>,
      <td>{employDaVez.phone}</td>
    ]
    return <tr>{templates}</tr>
  }, [employees])

  if (employees == null) return <></>


  return (
    <>
    {/* <Debug value={customRows} /> */}
    <Table 
      items={employees} 
      fields={fields} 
      mainFields={mainFields} 
      customRows={customRows}
    />
    </>
  );
}
