import React from 'react'
import { useWindowSize } from '@uidotdev/usehooks'
import { Field } from './table'
import useFieldsMap from '../hooks/fields-map'

import './table-header.css'

type GenericItem = { [key: string]: string | number | boolean }

type MobileHeaderProps<T extends GenericItem> = {
  mainFields: Array<keyof T>
  fields?: Field<T>[]
}

function MobileHeader<T extends GenericItem>({ fields, mainFields }: MobileHeaderProps<T>) {

  const fieldsMap = useFieldsMap(fields)
  return (
    <>
      {fields 
        ? mainFields.map((key, index) => {
          const isLastField = index === mainFields.length - 1
          return (
            <th key={`mh-${index}`}>
              <div className='header-cell flex justify-between align-center'>
                <h2>{fieldsMap[String(key)]}</h2>
                {isLastField && <div className='white-dot' />}
              </div>
            </th>
          )
        }) : mainFields.map((key, index) => (
          <th key={`mh-${index}`}><h2>{String(key)}</h2></th>
        ))
      }
    </>
  )
}

type WebHeaderProps<T extends GenericItem> = {
  item: T
  fields: Field<T>[] | undefined
}

function WebHeader<T extends GenericItem>({ item, fields }: WebHeaderProps<T>) {
  return (
    <>
      {fields 
        ? fields.map((key, index) => (
          <th key={`wh-f-${index}`}><h2>{String(key.displayName)}</h2></th>
        )) : 
        (Object.keys(item).map((key, index) => (
          <th key={`wh-${index}`}><h2>{String(key)}</h2></th>
        )))}
    </>
  )
}

type TableHeaderProps<T extends GenericItem> = {
  item: T | null
  fields: Field<T>[] | undefined
  mainFields: Array<keyof T>
  mobileWidth?: number
}

export default function TableHeader<T extends GenericItem>({ item, fields, mainFields, mobileWidth = 375 }: TableHeaderProps<T>) {
  const { width } = useWindowSize()
  const mobile = (width ?? 0) <= mobileWidth

  return item == null ? <></> : (
    <thead>
      <tr>
        {mobile 
          ? <MobileHeader mainFields={mainFields} fields={fields} /> 
          : <WebHeader item={item} fields={fields} />}
      </tr>
    </thead>
  )
}
