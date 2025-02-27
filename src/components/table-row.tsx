/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect, useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import { Field, GenericItem } from './table';
import ChevronDownSvg from '../assets/charm_chevron-down.svg';

import './table-row.css'

type MobileRowProps<T extends GenericItem> = {
  fields: Field<T>[] | undefined;
  mainFields: Array<keyof T>;
  item: T;
  rowKey: string
};

export function MobileRow<T extends GenericItem>({ fields, mainFields, item, rowKey }: MobileRowProps<T>): React.JSX.Element {
  const [open, setOpen] = useState(false);

  const notMainFields = fields?.filter((notMainKey) => !mainFields.includes(notMainKey.name));

  useEffect(() => {
    setOpen(false)
  }, [item])
  
  return (
    <Fragment key={rowKey}>
    
      <tr className='mobile-row'>
       
          {mainFields.map((property, index) => {
            const isLastField = index === mainFields.length - 1;
            const field = fields?.find(field => field.name === property)

            return (
              
              <td key={`mr-${rowKey}-${index}`} className='mobile-row-line'>
                <div className='flex justify-between align-center'>
                  {field?.isImage ? (
                    <img src={String(item[property])} alt={field?.alt} />
                  ) : (
                    <h3>{String(item[property])}</h3>
                  )}
                  {isLastField && <img src={ChevronDownSvg} alt="chevron-down" onClick={() => setOpen(prev => !prev)} />}
                </div>
              </td>

            );
          })}
       
      </tr>
      
      <tr className={`collapsible ${open ? 'open' : ''}`} >

        <td colSpan={mainFields.length}>
          <div className='collapsible-content pd-t2 pd-b2 gap1 flex-vertical'>

            {notMainFields?.map((field, index) => (
              <div className='flex justify-between gap1' key={`nmr-${rowKey}-${index}`}>
                {field.isImage ? (
                  <img src={String(item[field.name])} alt={field.alt} />
                ) : (
                  <>
                    <h2>{field.displayName}</h2>
                    <h3>{item[field.name]}</h3>
                  </>
                )}
              </div>
            ))}

          </div>
        </td>

      </tr>
  
    </Fragment>
  );
}

type WebRowProps<T extends GenericItem> = {
  item: T;
  fields?: Field<T>[] | undefined;
  rowKey: string
};

function WebRow<T extends GenericItem>({ item, fields, rowKey }: WebRowProps<T>): React.JSX.Element {
  return (
    <Fragment key={rowKey}>
      {fields
        ? fields.map((field, index) => (

          <td key={`wr-f-${rowKey}-${index}`}>
            {field.isImage ? (
              <img src={String(item[field.name])} />
            ) : (
              <h3>{item[field.name]}</h3>
            )}
          </td>

        ))
        : Object.values(item).map((value, index) => (
          <td key={`wr-${rowKey}-${index}`}>
            <h3>{String(value)}</h3>
          </td>
      ))}
    </Fragment>
  );
}

type TableRowProps<T extends GenericItem> = {
  item: T;
  fields?: Field<T>[] | undefined;
  mainFields: Array<keyof T>;
  rowKey: string
};

export default function TableRow<T extends GenericItem>({ item, fields, mainFields, rowKey }: TableRowProps<T>) {
  const { width } = useWindowSize();
  const mobile = (width ?? 0) <= 375;

  return (
    !item ? <></> :
    <tr>
      {mobile
        ? <MobileRow item={item} fields={fields} mainFields={mainFields} rowKey={rowKey} />
        : <WebRow item={item} fields={fields} rowKey={rowKey} />}
    </tr>
  );
}


