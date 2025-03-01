import React, { Fragment, JSX, useCallback, useEffect,  useState } from 'react';
import { Field, GenericItem } from './table';
import ChevronDownSvg from '../assets/charm_chevron-down.svg';

import './table-row.css'
import useScreenSize from '../hooks/screen-size';

type MobileRowProps<T extends GenericItem> = {
  fields: Field<T>[];
  mainFields: Array<keyof T>;
  item: T
};

export function MobileRow<T extends GenericItem>({ fields, mainFields, item }: MobileRowProps<T>): React.JSX.Element {
  const [open, setOpen] = useState(false);

  const moreFields = fields.filter((notMainKey) => !mainFields.includes(notMainKey.name));

  useEffect(() => {
    setOpen(false)
  }, [item])

  const toggleOpen = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const renderMainFields = (item: T, property: keyof T, isLastField: boolean): JSX.Element => {
    const field: Field<T> | undefined = fields.find(f => f.name === property);
    
    return (
      <td className='mobile-row-line'>
        <div className='flex justify-between align-center'>
          {
            field?.isImage ? (
              <img src={String(item[property])} alt={field?.alt} />
            ) : (
              <h3>{item[property]}</h3>
            )
          }
          {isLastField && 
            <div className='img-box'>
              <img src={ChevronDownSvg} alt="chevron-down" onClick={toggleOpen} />
            </div>
          }
        </div>
      </td>
    )
  }
 
  const renderMoreFields = (field: Field<T>, item: T) => {
    return (
      <div className='flex justify-between gap1 dashed'>
        {
          field.isImage ? (
            <>
              <h2>{field.displayName}</h2>
              <img src={String(item[field.name])} alt={field.alt} />
            </>
          ) : (
            <>
              <h2>{field.displayName}</h2>
              <h3>{item[field.name]}</h3>
            </>
          )
        }
      </div>
    )
  }

  return (
    <>
      <tr className={`mobile-row ${open ? 'open' : ''}`}>
        {mainFields.map((property, index) => {
          const isLastField = index === mainFields.length - 1;
          return (
            <Fragment key={`mr-mf-${String(property)}`} >
              {renderMainFields(item, property, isLastField)}
            </Fragment>
          )
        })}
      </tr>
      <tr className={`collapsible-row`} >
        <td colSpan={mainFields.length}>
          <div className='collapsible-row-content pd-t2 pd-b2 gap1 flex-vertical'>
            {moreFields?.map((field) =>
              <Fragment key={`mr-nmf-${String(field.name)}`}>
                {renderMoreFields(field, item)}
              </Fragment>
            )}
          </div>
        </td>
      </tr>
    </>
  );
}

type WebRowProps<T extends GenericItem> = {
  item: T;
  fields: Field<T>[];
};

function WebRow<T extends GenericItem>({ item, fields }: WebRowProps<T>): React.JSX.Element {
  return (
    <tr>
      {fields.map((field) => (
        <td key={`wr-f-${String(field.name)}`}>
          {field.isImage ? (
            <img src={String(item[field.name])} />
          ) : (
            <h3>{item[field.name]}</h3>
          )}
        </td>
      ))}
    </tr>
  );
}

type TableRowProps<T extends GenericItem> = {
  item: T;
  fields: Field<T>[];
  mainFields: Array<keyof T>;
  mobileWidth?: number
};

export default function TableRow<T extends GenericItem>({ item, fields, mainFields, mobileWidth }: TableRowProps<T>) {
  const { size } = useScreenSize(mobileWidth)
  const mobile = size === 'mobile' 

  return (<>
    {mobile
      ? <MobileRow item={item} fields={fields} mainFields={mainFields} />
      : <WebRow item={item} fields={fields} />}
  </>
  );
}


