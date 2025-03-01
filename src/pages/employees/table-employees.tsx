import React, { JSX, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import './table-employees.css';
import '../../styles/table.css';

import Table from '../../components/table';
import EmployeesContext from '../../contexts/employees-context';
import { isoToDDMMYYYY, phoneFormat } from '../../utils/formatters';
import { MobileRow } from '../../components/table-row';
import { Employee } from '../../models/employee';
import useScreenSize from '../../hooks/screen-size';
import { SkeletonImage, SkeletonText } from '../../components/table-body';
import { Field, GenericItem } from '../../models/table';

export default function TableEmployees() {
  const { employees, getEmployees } = useContext(EmployeesContext);
  const mobileWidth = 540
  const { size } = useScreenSize(mobileWidth)
  const mobile = size === 'mobile' 

  useEffect(() => {
    return () => window.history.replaceState({}, document.title, window.location.pathname);
  }, [])

  const [fields, setFields] = useState<Field<Employee>[]> (() => [
    { name: 'image', displayName: 'Foto', isImage: true, alt: 'employee image' }, 
    { name: 'name', displayName: 'Nome', sortable: true }, 
    { name: 'job', displayName: 'Cargo', sortable: true }, 
    { name: 'admission_date', displayName: 'Data de admissão', sortable: true },
    { name: 'phone', displayName: 'Telefone', sortable: true }
  ])

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

  function sortByField <T extends GenericItem> (field: keyof T) {
    const fieldIndex = fields.findIndex(f => f.name === field)
    const theField = fields[fieldIndex]

    const newOrder = theField?.order === 'asc' ? 'desc' : 'asc'
    
    const query = new URLSearchParams(window.location.search)
    query.set('_sort', String(field))
    query.set('_order', newOrder)
    const newUrl = `${window.location.pathname}?${query.toString()}`;
    window.history.pushState({}, '', newUrl)

    getEmployees(query.toString())
      .then(() => {
        setFields(prev => {
          const updatedFields = [...prev]
          updatedFields[fieldIndex] = {
            ...theField, order: newOrder
          }
          return updatedFields
        })
      })
  }

  return (
    <div className='table-wrapper'>
      <Table 
        items={formattedEmployees} 
        fields={fields} 
        mainFields={mainFields} 
        customRows={customRows}
        mobileWidth={mobileWidth}
        onClick={sortByField}
      />
    </div>
  );
}
