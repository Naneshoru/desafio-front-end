/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import { Field, GenericItem } from './table';
import chevronDown from '../assets/charm_chevron-down.svg';

import './table-row.css'

type MobileRowProps<T extends GenericItem> = {
  fields: Field<T>[] | undefined;
  mainFields: Array<keyof T>;
  item: T;
};

export function MobileRow<T extends GenericItem>({ fields, mainFields, item }: MobileRowProps<T>): React.JSX.Element {
  const [open, setOpen] = useState(false);

  const notMainFields = fields?.filter((notMainKey) => !mainFields.includes(notMainKey.name));

  useEffect(() => {
    setOpen(false)
  }, [item])
  
  return (
    <>
      <tr className='mobile-row'>
       
          {mainFields.map((property, index) => {
            const isLastField = index === mainFields.length - 1;
            const field = fields?.find(field => field.name === property)

            return (<>
              
              <td key={`mr-${index}`} className='mobile-row-line'>
                <div className='flex justify-between align-center'>
                  {field?.isImage ? (
                    <img src={String(item[property])} alt={field?.alt} />
                  ) : (
                    <p>{String(item[property])}</p>
                  )}
                  {isLastField && <img src={chevronDown} alt="chevron-down" onClick={() => setOpen(prev => !prev)} />}
                </div>
              </td>

            </>);
          })}
       
      </tr>
      
      <tr className={`collapsible ${open ? 'open' : ''}`}>

        <td colSpan={mainFields.length}>
          <div className='collapsible-content pd-t2 pd-b2 gap1 flex-vertical'>

            {notMainFields?.map((field, index) => (
              <div className='flex justify-between' key={index}>
                {field.isImage ? (
                  <img src={String(item[field.name])} alt={field.alt} />
                ) : (
                  <>
                    <span>{field.displayName}</span>
                    <span>{item[field.name]}</span>
                  </>
                )}
              </div>
            ))}

          </div>
        </td>

      </tr>
  
    </>
  );
}

type WebRowProps<T extends GenericItem> = {
  item: T;
  fields?: Field<T>[] | undefined;
};

function WebRow<T extends GenericItem>({ item, fields }: WebRowProps<T>): React.JSX.Element {
  return (
    <>
      {fields
        ? fields.map((field, index) => (

          <td key={index}>
            {field.isImage ? (
              <img src={String(item[field.name])} />
            ) : (
              item[field.name]
            )}
          </td>
          
        ))
        : Object.values(item).map((value, index) => (
          <td key={index}>{String(value)}</td>
      ))}
    </>
  );
}

type TableRowProps<T extends GenericItem> = {
  item: T;
  fields?: Field<T>[] | undefined;
  mainFields: Array<keyof T>;
};

export default function TableRow<T extends GenericItem>({ item, fields, mainFields, ...props }: TableRowProps<T>) {
  const { width } = useWindowSize();
  const mobile = (width ?? 0) <= 375;

  return (
    !item ? <></> :
    <tr {...props}>
      {mobile
        ? <MobileRow item={item} fields={fields} mainFields={mainFields} />
        : <WebRow item={item} fields={fields} />}
    </tr>
  );
}


