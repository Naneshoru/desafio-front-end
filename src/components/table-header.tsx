import React from 'react'
import { Field } from './table'
import useFieldsMap from '../hooks/fields-map'

import './table-header.css'
import useScreenSize from '../hooks/screen-size'

type GenericItem = { [key: string]: string | number | boolean }

type MobileHeaderProps<T extends GenericItem> = {
  mainFields: Array<keyof T>
  fields: Field<T>[]
}

function MobileHeader<T extends GenericItem>({ fields, mainFields }: MobileHeaderProps<T>) {

  const fieldsMap = useFieldsMap(fields)

  return (
    <>
      {mainFields.map((key, index) => {
          const isLastField = index === mainFields.length - 1
          return (
            <th key={`mh-mf-${index}`}>
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
}

function WebHeader<T extends GenericItem>({ fields }: WebHeaderProps<T>) {
  return (
    <>
      {fields.map((key, index) => (
        <th key={`wh-f-${index}`}><h2>{key.displayName}</h2></th>
      ))} 
    </>
  )
}

type TableHeaderProps<T extends GenericItem> = {
  fields: Field<T>[]
  mainFields: Array<keyof T>
  mobileWidth?: number
}

export default function TableHeader<T extends GenericItem>({ fields, mainFields, mobileWidth = 375 }: TableHeaderProps<T>) {
  const { size } = useScreenSize(mobileWidth)
  const mobile = size === 'mobile' 

  return (
    <thead>
      <tr>
        {mobile 
          ? <MobileHeader mainFields={mainFields} fields={fields} /> 
          : <WebHeader fields={fields} />}
      </tr>
    </thead>
  )
}
