import React, { useCallback, useContext } from 'react';

import './table-employees.css';
import '../styles/table.css';

import Table, { Field } from '../components/table';
import EmployeesContext from '../contexts/employees-context';
import { Employee } from '../models/employee';
import { isoToDDMMYYYY, phoneFormat } from '../utils/formatters';
import { useWindowSize } from '@uidotdev/usehooks';

export default function TableEmployees() {
  const { employees } = useContext(EmployeesContext);
  const { width } = useWindowSize();
  const mobileWidth = 540
  const mobile = (width ?? 0) <= mobileWidth;

  const fields: Field<Employee>[] = [
    { name: 'image', displayName: 'Foto' }, 
    { name: 'name', displayName: 'Nome' }, 
    { name: 'job', displayName: 'Cargo' }, 
    { name: 'admission_date', displayName: 'Data de admissão' },
    { name: 'phone', displayName: 'Telefone' }
  ];
  const mainFields: Array<keyof Employee> = ['image', 'name'];

  const customRows = useCallback((index: number) => {
    if (employees?.[index] == null) return [];
    const currentEmployee = employees[index];
    const templates = 
      mobile ? [
        <td key={`cr-t1`}><img src={currentEmployee?.image} alt="employee" className="employee-image" /></td>,
        <td key={`cr-t2`}>{currentEmployee.name}</td>,
      ]
      : [
        <td key={`cr-t1`}><img src={currentEmployee?.image} alt="employee" className="employee-image" /></td>,
        <td key={`cr-t2`}>{currentEmployee.name}</td>,
        <td key={`cr-t3`}>{currentEmployee.job}</td>,
        <td key={`cr-t4`}>{isoToDDMMYYYY(currentEmployee.admission_date)}</td>,
        <td key={`cr-t5`}>{wordBreakOpportunity(phoneFormat(currentEmployee.phone))}</td>
      ];
    return <tr key={`cr-${index}`}>{templates}</tr>;
  }, [employees, mobile]);

  const wordBreakOpportunity = (text: string) => {
    const [countryCode, areaCode, phone] = text.split(' ');
 
    return (
      <>
        {countryCode} {areaCode}
        <wbr />
        <span> {phone} </span>
      </>
    );
  };

  if (employees == null) return <></>;

  return (
    <div className='table-wrapper'>
      <Table 
        items={employees} 
        fields={fields} 
        mainFields={mainFields} 
        customRows={customRows}
        mobileWidth={mobileWidth}
      />
    </div>
  );
}
