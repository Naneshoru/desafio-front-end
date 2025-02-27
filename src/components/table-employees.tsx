import React, { useCallback, useContext } from 'react';

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
  const mobile = (width ?? 0) <= mobileWidth;

  const fields: Field<Employee>[] = [
    { name: 'image', displayName: 'Foto', isImage: true, alt: 'employee image' }, 
    { name: 'name', displayName: 'Nome' }, 
    { name: 'job', displayName: 'Cargo' }, 
    { name: 'admission_date', displayName: 'Data de admissão' },
    { name: 'phone', displayName: 'Telefone' }
  ];
  const mainFields: Array<keyof Employee> = ['image', 'name'];

  const customRows = useCallback((index: number) => {
    if (employees?.[index] == null) return [];

    const currentEmployee = employees[index];

    const template = [
      <td key={`cr-t1`}><img src={currentEmployee?.image} alt="employee" className="employee-image" /></td>,
      <td key={`cr-t2`}><h3>{currentEmployee.name}</h3></td>,
      <td key={`cr-t3`}><h3>{currentEmployee.job}</h3></td>,
      <td key={`cr-t4`}><h3>{isoToDDMMYYYY(currentEmployee.admission_date)}</h3></td>,
      <td key={`cr-t5`}><h3>{wordBreakOpportunity(phoneFormat(currentEmployee.phone))}</h3></td>
    ];
    
    const customWebRows = <tr key={`cr-${index}`}>{template}</tr>
    
    return mobile ? 
      <MobileRow item={currentEmployee} fields={fields} mainFields={mainFields} rowKey={`cmr-${index}`} key={`cmr-${index}`} />
      : customWebRows;
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
