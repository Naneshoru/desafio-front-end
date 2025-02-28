import React, { JSX, useCallback, useContext, useMemo } from 'react';

import './table-employees.css';
import '../styles/table.css';

import Table, { Field } from '../components/table';
import EmployeesContext from '../contexts/employees-context';
import { isoToDDMMYYYY, phoneFormat } from '../utils/formatters';
import { useWindowSize } from '@uidotdev/usehooks';
import { MobileRow } from './table-row';
import { Employee } from '../models/employee';

export default function TableEmployees() {
  const { employees } = useContext(EmployeesContext);
  const { width } = useWindowSize();
  const mobileWidth = 540;
  const mobile = useMemo(() => (width ?? 0) <= mobileWidth, [width]);

  const fields: Field<Employee>[] = [
    { name: 'image', displayName: 'Foto', isImage: true, alt: 'employee image' }, 
    { name: 'name', displayName: 'Nome' }, 
    { name: 'job', displayName: 'Cargo' }, 
    { name: 'admission_date', displayName: 'Data de admissão' },
    { name: 'phone', displayName: 'Telefone' }
  ];
  const mainFields: Array<keyof Employee> = ['image', 'name'];

  const formattedEmployees = useMemo(() => {
    return employees?.map(employee => ({
      ...employee,
      admission_date: isoToDDMMYYYY(employee.admission_date),
      phone: phoneFormat(employee.phone)
    })) ?? null;
  }, [employees]);

  const customRows = useCallback((index: number) => {
    if (formattedEmployees?.[index] == null) return [];

    const currentEmployee: Employee = formattedEmployees[index];

    const template: JSX.Element[] = [
      <td key={`cr-t1`}><img src={currentEmployee?.image} alt="employee" className="employee-image" /></td>,
      <td key={`cr-t2`}><h3>{currentEmployee.name}</h3></td>,
      <td key={`cr-t3`}><h3>{currentEmployee.job}</h3></td>,
      <td key={`cr-t4`}><h3>{currentEmployee.admission_date}</h3></td>,
      <td key={`cr-t5`}><h3>{wordBreakOpportunity(currentEmployee.phone)}</h3></td>
    ];
    
    const customWebRows = <tr key={`cr-${index}`}>{template}</tr>;
    
    return mobile ? 
      <MobileRow item={currentEmployee} fields={fields} mainFields={mainFields} key={`cmr-${index}`} />
      : customWebRows;
  }, [formattedEmployees, mobile]);

  const wordBreakOpportunity = (text: string): JSX.Element => {
    const [countryCode, areaCode, phone] = text.split(' ');
 
    return (
      <>
        {countryCode} {areaCode}
        <wbr />
        <span> {phone} </span>
      </>
    );
  };

  return (
    <div className='table-wrapper'>
      <Table 
        items={formattedEmployees} 
        fields={fields} 
        mainFields={mainFields} 
        customRows={customRows}
        mobileWidth={mobileWidth}
      />
    </div>
  );
}
