import React, { useContext } from 'react';
import Table from '../components/table';
import EmployeesContext from '../contexts/employees-context';

type Employee = {
  id: number;
  name: string;
  job: string;
  admission_date: string;
  phone: string;
  image: string;
};

export default function TableEmployees() {
  const { employees } = useContext(EmployeesContext)

  const mainProps: Array<keyof Employee> = ['image', 'name'];

  return (
    <Table items={employees} mainProps={mainProps} />
  );
}
