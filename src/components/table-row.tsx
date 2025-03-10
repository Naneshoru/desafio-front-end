import React, { Fragment, JSX, useEffect, useMemo,  useState } from 'react';
import ChevronDownSvg from '/assets/charm_chevron-down.svg';
import useScreenSize from '../hooks/screen-size';
import { Field, GenericItem } from '../models/table';

import './table-row.css'
import { Proccesed } from './table';
import useObjectFit from '@hooks/object-fit';
import { getInitials } from '@utils/formatters';

type MobileRowProps<T extends GenericItem> = {
  fields: Field<T>[];
  mainFields: Array<keyof T>;
  item: T | Proccesed<T>
};

export function MobileRow<T extends GenericItem>({ fields, mainFields, item }: MobileRowProps<T>): React.JSX.Element {
  const [open, setOpen] = useState(false);

  const moreFields = useMemo(() => fields.filter((notMainKey) => !mainFields.includes(notMainKey.name)), [fields, mainFields]);

  useEffect(() => {
    setOpen(false)
  }, [item])

  const toggleOpen = () => {
    setOpen(prev => !prev);
  }

  const imageUrls = useMemo(() => fields.filter((field) => field.isImage).map(field => String(item[field.name])), [fields, item]);
  
  const objectFit = useObjectFit(imageUrls);
  
  const renderMainFields = (item: T | Proccesed<T>, property: keyof T, isLastField: boolean, index: number): JSX.Element => {
    const field: Field<T> | undefined = fields.find(f => f.name === property);
    
    return (
      <td className='mobile-row-cell'>
        <div className='flex justify-between align-center gap1'>
          {
            field?.isImage ? (
              <div className='ball'>
              {(item[property]) ?
                <img src={String(item[property])} alt={field?.alt} style={{ objectFit: objectFit[index] }} /> 
                : <div className='ball'>{getInitials(String(item[fields[1].name]))}</div>}
              </div>
            ) : (
              <h3>{item[property]}</h3>
            )
          }
          {isLastField && ChevronDownSvg &&
            <div className='img-box'>
              <img src={ChevronDownSvg} alt="chevron-down" onClick={toggleOpen} />
            </div>
          }
        </div>
      </td>
    )
  }
 
  const renderMoreFields = (field: Field<T>, item: T | Proccesed<T>, index: number) => {
    const src = String(item[field.name])
    return (
      <div className='flex justify-between gap1 dashed'>
        {
          field.isImage ? (
            <>
              <h2>{field.displayName}</h2>
              {item[field.name] 
                ? <img src={src} alt={field.alt} style={{ objectFit: objectFit[index] }} /> 
                : <div className='ball'>{getInitials(String(item[fields[1].name]))}</div>}
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
    <Fragment key={item.id + '-fragment'}>
      <tr
        className={`mobile-row ${open ? 'open' : ''}`}  
        key={String(item.id)+'-mb'}
      >
        {mainFields.map((property, index) => {
          const isLastField = index === mainFields.length - 1;

          return (
            <Fragment key={`mr-mf-${String(property)}`} >
              {renderMainFields(item, property, isLastField, index)}
            </Fragment>
          )
        })}
      </tr>
      <tr 
        className={`collapsible-row `}
        role={'row'} key={String(item.id) + '-cr'}
      >
        <td colSpan={mainFields.length}>
          <div className={`collapsible-row-content pd-t2 pd-b2 gap1 flex-col`}>
            
            {moreFields?.map((field, index) =>
              <Fragment key={`mr-nmf-${String(field.name)}`}>
                {renderMoreFields(field, item, index)}
              </Fragment>
            )}
          </div>
        </td>
      </tr>
    </Fragment>
  );
}

type WebRowProps<T extends GenericItem> = {
  item: T | Proccesed<T>;
  fields: Field<T>[];
};

function WebRow<T extends GenericItem>({ item, fields }: WebRowProps<T>): React.JSX.Element {
  const imageUrls = useMemo(() => fields.filter((field) => field.isImage).map(field => String(item[field.name])), [item, fields]);
  const objectFit = useObjectFit(imageUrls);

  return (
    <tr>
      {fields.map((field, index) => {
        return (
          <td key={`wr-f-${String(field.name)}`}>
            {field.isImage ? (
              <div className='ball'>
                {item[field.name] 
                  ? <img 
                    src={String(item[field.name])} 
                    style={{ objectFit: objectFit[index] }} 
                  /> 
                  : <div className='ball'>
                    {getInitials(String(item[fields[1].name]))}</div>}
              </div>
            ) : (
              <h3>{item[field.name]}</h3>
            )}
          </td>
        );
      })}
    </tr>
  );
}

type TableRowProps<T extends GenericItem> = {
  item: T | Proccesed<T>;
  fields: Field<T>[];
  mainFields: Array<keyof T>;
  mobileWidth?: number
};

function TableRow<T extends GenericItem>({ item, fields, mainFields, mobileWidth }: TableRowProps<T>) {
  const { size } = useScreenSize(mobileWidth)
  const mobile = useMemo(() => size === 'mobile', [size])

  return (<>
    {mobile
      ? <MobileRow item={item} fields={fields} mainFields={mainFields} />
      : <WebRow item={item} fields={fields} />}
  </>
  );
}

export default TableRow
