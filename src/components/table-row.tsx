import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import { Field, GenericItem } from './table';
import ChevronDownSvg from '../assets/charm_chevron-down.svg';

import './table-row.css'

type MobileRowProps<T extends GenericItem> = {
  fields: Field<T>[];
  mainFields: Array<keyof T>;
  item: T;
};

export function MobileRow<T extends GenericItem>({ fields, mainFields, item }: MobileRowProps<T>): React.JSX.Element {
  const [open, setOpen] = useState(false);

  const notMainFields = fields.filter((notMainKey) => !mainFields.includes(notMainKey.name));

  useEffect(() => {
    setOpen(false)
  }, [item])

  const toggleOpen = useCallback(() => {
    setOpen(prev => !prev);
  }, []);
  
  return (
    <>
      <tr className={`mobile-row ${open ? 'open' : ''}`}>
        {mainFields.map((property, index) => {
          const isLastField = index === mainFields.length - 1;
          const field = fields?.find(field => field.name === property);

          return (
            <td key={`mr-${index}`} className='mobile-row-line'>
              <div className='flex justify-between align-center'>
                {field?.isImage ? (
                  <img src={String(item[property])} alt={field?.alt} />
                ) : (
                  <h3>{item[property]}</h3>
                )}
                {isLastField && 
                  <div className='img-box'>
                    <img src={ChevronDownSvg} alt="chevron-down" onClick={toggleOpen} />
                  </div>}
              </div>
            </td>
          );
        })}
      </tr>
      <tr className={`collapsible`} >
        <td colSpan={mainFields.length}>
          <div className='collapsible-content pd-t2 pd-b2 gap1 flex-vertical'>
            {notMainFields?.map((field, index) => (
              <div className='flex justify-between gap1 dashed' key={`nmr-${index}`}>
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
    </>
  );
}

type WebRowProps<T extends GenericItem> = {
  item: T;
  fields: Field<T>[];
};

function WebRow<T extends GenericItem>({ item, fields }: WebRowProps<T>): React.JSX.Element {
  return (
    <>
      {fields.map((field, index) => (
        <td key={`wr-f-${index}`}>
          {field.isImage ? (
            <img src={String(item[field.name])} />
          ) : (
            <h3>{item[field.name]}</h3>
          )}
        </td>
      ))}
    </>
  );
}

type TableRowProps<T extends GenericItem> = {
  item: T;
  fields: Field<T>[];
  mainFields: Array<keyof T>;
};

export default function TableRow<T extends GenericItem>({ item, fields, mainFields }: TableRowProps<T>) {
  const { width } = useWindowSize();
  const mobile = useMemo(() => (width ?? 0) <= 375, [width])

  return (
    <tr>
      {mobile
        ? <MobileRow item={item} fields={fields} mainFields={mainFields} />
        : <WebRow item={item} fields={fields} />}
    </tr>
  );
}


