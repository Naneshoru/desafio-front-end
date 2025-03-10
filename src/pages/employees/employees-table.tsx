import { JSX, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import './employees-table.css';
import '../../styles/table.css';

import Table, { Proccesed } from '@components/table';
import EmployeesContext from '@contexts/employees-context';
import { MobileRow } from '@components/table-row';
import { Employee } from '@models/employee';
import useScreenSize from '@hooks/screen-size';
import { SkeletonImage, SkeletonText } from '@components/table-body';
import { Field, GenericItem } from '@models/table';
import useObjectFit from '@hooks/object-fit';
import { abbreviateMiddleNames, getInitials } from '@utils/formatters';
import { useWindowSize } from '@uidotdev/usehooks';

export default function TableEmployees() {
  const { proccesedEmployees, getEmployees, filter, setFilter } = useContext(EmployeesContext);
  const mobileWidth = useMemo(() => 540, []);
  const { size } = useScreenSize(mobileWidth);
  const mobile = useMemo(() => size === 'mobile', [size]);

  useEffect(() => {
    return () => window.history.replaceState({}, document.title, window.location.pathname);
  }, []);

  const [fields, setFields] = useState<Field<Employee>[]>(() => [
    { name: 'image', displayName: 'Foto', isImage: true, alt: 'employee image' }, 
    { name: 'name', displayName: 'Nome', sortable: true }, 
    { name: 'job', displayName: 'Cargo', sortable: true }, 
    { name: 'admission_date', displayName: 'Data de admissão', sortable: true },
    { name: 'phone', displayName: 'Telefone', sortable: true }
  ]);

  const mainFields: Array<keyof Employee> = useMemo(() => ['image', 'name'], []);

  const imageUrls = useMemo(() => proccesedEmployees?.map(employee => employee.image) ?? [], [proccesedEmployees]);
  const objectFit = useObjectFit(imageUrls);

  const employeesAbvrev = useMemo(() => proccesedEmployees?.map((e) => ({
    ...e,
    name: abbreviateMiddleNames(e.name)
  })), [proccesedEmployees]);
    
  const customRows = useCallback((employee: Employee | Proccesed<Employee>, index: number, isLoading: boolean) => {
    
    const web = !mobile;
    if (isLoading && mobile) return (
      <tr key={`loading-${employee.id}`}>
        {mainFields.map((field, i) => {
          const fieldObj = fields?.find(f => f.name === field);
          if (fieldObj?.isImage) {
            return (<SkeletonImage td key={`sk-${i}`} />);
          } else {
            return (<SkeletonText td key={`sk-${i}`} />);
          }
        })}
      </tr>
    );
    if (isLoading && web) return (
      <tr key={`loading-${employee.id}`}>
        {fields.map((field, i) => {
          if (field?.isImage) {
            return (<SkeletonImage td key={`sk-${i}`} />);
          } else {
            return (<SkeletonText td key={`sk-${i}`} />);
          }
        })}
      </tr>
    );
    if (!isLoading && mobile) return (
      <MobileRow 
        item={employeesAbvrev?.[index] ?? employee} 
        fields={fields}
        mainFields={mainFields} 
        key={`cr-mr-${employee.id}`}
      />
    );
    if (!isLoading && web) return (
      <tr key={`cr-wr-${employee.id}`}>
        <td key={`cr-f-1`}>
          <div className='ball'>
          {employee.image
            ? <img src={employee.image} alt="employee" style={{ objectFit: objectFit[index] }} />
            : getInitials(employee.name)}
          </div>
        </td>
        <td key={`cr-f-2`}>
          <div className='clamp' title={employee.name}>
            <h3>{abbreviateMiddleNames(employee.name)}</h3>
          </div>
        </td>
        <td key={`cr-f-3`}><h3>{employee.job}</h3></td>
        <td key={`cr-f-4`}><h3>{employee.admission_date}</h3></td>
        <td key={`cr-f-5`}><h3>{wordBreakOpportunity(employee.phone)}</h3></td>
      </tr>
    );
    return <></>;
  }, [mobile, fields, mainFields, objectFit, employeesAbvrev]);

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

  function sortByField<T extends GenericItem>(field: keyof T) {
    const fieldIndex = fields.findIndex(f => f.name === field);
    const theField = fields[fieldIndex];

    const newOrder = theField?.order === 'desc' ? 'asc' : 'desc';

    const query = new URLSearchParams(window.location.search);
    query.set('_sort', String(field));
    query.set('_order', newOrder);
    const newUrl = `${window.location.pathname}?${query.toString()}`;
    window.history.pushState({}, '', newUrl);

    getEmployees(query.toString()).then(() => {
      setFields(prev => {
        const updatedFields = [...prev];
        updatedFields[fieldIndex] = {
          ...theField, order: newOrder
        };
        return updatedFields;
      });
      setFilter({ search: filter?.search || '' })
    });
  }

  const { width } = useWindowSize()
  const admissionBreakPoint = useMemo(() => width && width < 800, [width]);
  
  useEffect(() => {
    setFields(prev => {
      const newFields = [ ...prev ]
      newFields[3].displayName = width && width < 800 ? "Admissão" : 'Data de admissão'
      return newFields
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admissionBreakPoint])

  return (
    <div className='table-wrapper'>
      <Table 
        items={proccesedEmployees} 
        fields={fields} 
        mainFields={mainFields} 
        customRows={customRows}
        mobileWidth={mobileWidth}
        onClick={sortByField}
      />
    </div>
  );
}