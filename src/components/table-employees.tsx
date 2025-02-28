import React, { JSX, useCallback, useContext, useMemo } from 'react';

import './table-employees.css';
import '../styles/table.css';

import Table, { Field } from '../components/table';
import EmployeesContext from '../contexts/employees-context';
import { isoToDDMMYYYY, phoneFormat } from '../utils/formatters';
import { MobileRow } from './table-row';
import { Employee } from '../models/employee';
import useScreenSize from '../hooks/screen-size';
import { SkeletonImage, SkeletonText } from './table-body';

export default function TableEmployees() {
  const { employees } = useContext(EmployeesContext);
  const mobileWidth = 540
  const { size } = useScreenSize(mobileWidth)
  const mobile = size === 'mobile' 

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

  const customRows = useCallback((
    employee: Employee,
    index: number,
    isLoading: boolean
  ) => {
    const web = !mobile
    if (isLoading && mobile) return (
      <tr key={`loading-${index}`}>
        {mainFields.map((field, i) => {
          const fieldObj = fields?.find(f => f.name === field);
          if (fieldObj?.isImage) {
            return (<SkeletonImage td key={`sk-${i}`} />)
          } else {
            return (<SkeletonText td key={`sk-${i}`} />)
          }  
        })}
      </tr>
    )
    if (isLoading && web) return (
      <tr key={`loading-${index}`}>
        {fields.map((field, i) => {
          if (field?.isImage) {
            return (<SkeletonImage td key={`sk-${i}`} />)
          } else {
            return (<SkeletonText td key={`sk-${i}`} />)
          }  
        })}
      </tr>
    )
    if (!isLoading && mobile) return (
      <MobileRow 
        item={employee} 
        fields={fields}
        mainFields={mainFields} 
        key={`cr-mr-${employee.id}`}
      />
    )
    if (!isLoading && web) return (
      <tr key={`cr-wr-${employee.id}`}>
        <td key={`cr-f-1`}><img src={employee.image} alt="employee" /></td>
        <td key={`cr-f-2`}><h3>{employee.name}</h3></td>
        <td key={`cr-f-3`}><h3>{employee.job}</h3></td>
        <td key={`cr-f-4`}><h3>{employee.admission_date}</h3></td>
        <td key={`cr-f-5`}><h3>{wordBreakOpportunity(employee.phone)}</h3></td>
      </tr>
    )
    return <></>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
