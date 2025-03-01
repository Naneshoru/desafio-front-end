import React from 'react'

import useFieldsMap from '../hooks/fields-map'
import useScreenSize from '../hooks/screen-size'
import { Field, GenericItem } from '../models/table'

import './table-header.css'

type MobileHeaderProps<T extends GenericItem> = {
  mainFields: Array<keyof T>
  fields: Field<T>[]
  onClick?: (field: keyof T) => void
}

function MobileHeader<T extends GenericItem>({ fields, mainFields, onClick }: MobileHeaderProps<T>) {

  const fieldsMap = useFieldsMap(fields)

  return (
    <>
      {mainFields.map((key, index) => {
          const isLastField = index === mainFields.length - 1
          const field = fields.find(f => f.name === key)
          return (
            <th key={`mh-mf-${index}`} onClick={() => onClick?.(key)} className={`${field?.sortable ? 'sortable' : ''}`}>
              <div className='header-cell flex justify-between align-center'>
                <h2>{fieldsMap[key]}</h2>
                {isLastField && <div className='white-dot' />}
              </div>
            </th>
          )
        })
      }
    </>
  )
}

type WebHeaderProps<T extends GenericItem> = {
  fields: Field<T>[]
  onClick?: (field: keyof T) => void
}

function WebHeader<T extends GenericItem>({ fields, onClick }: WebHeaderProps<T>) {
  return (
    <>
      {fields.map((key, index) => (
        <th key={`wh-f-${index}`} onClick={() => onClick?.(key.name)} className={`${key?.sortable ? 'sortable' : ''}`}><h2>{key.displayName}</h2></th>
      ))} 
    </>
  )
}

type TableHeaderProps<T extends GenericItem> = {
  fields: Field<T>[]
  mainFields: Array<keyof T>
  mobileWidth?: number
  onClick?: (field: keyof T) => void
}

export default function TableHeader<T extends GenericItem>({ fields, mainFields, mobileWidth = 375, onClick }: TableHeaderProps<T>) {
  const { size } = useScreenSize(mobileWidth)
  const mobile = size === 'mobile' 

  return (
    <thead>
      <tr>
        {mobile 
          ? <MobileHeader mainFields={mainFields} fields={fields} onClick={onClick} /> 
          : <WebHeader fields={fields} onClick={onClick} />}
      </tr>
    </thead>
  )
}
