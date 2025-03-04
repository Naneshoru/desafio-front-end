import { Fragment, JSX } from "react"
import TableRow from "./table-row"

import useScreenSize from "../hooks/screen-size"
import { Field, GenericItem } from "../models/table"

import './table-body.css'
import { Proccesed } from "./table"

type TableBodyProps <T extends GenericItem> = {
  fields: Field<T>[]
  mainFields: Array<keyof T>
  items: T[] | Proccesed<T>[] | null
  customRows?: (
    item: T | Proccesed<T>,
    index: number,
    isLoading: boolean
  ) => JSX.Element
  mobileWidth?: number
}

const TableBody = <T extends GenericItem>({ fields, mainFields, items, customRows, mobileWidth }: TableBodyProps<T>) => {
  const { size } = useScreenSize(mobileWidth)
  const mobile = size === 'mobile' 

  const render = () => {
    if (items == null) return renderLoading()

    if (items != null && items.length > 0) {
      return customRows ? (
        items.map((item, index) => (
          customRows(item, index, false)
      )))
      : items.map((item) => (
        <TableRow item={item} fields={fields} mainFields={mainFields} mobileWidth={mobileWidth} />
      ))
    }

    return renderEmpty(mobile ? mainFields.length : fields.length)
  }

  return <tbody>{render()}</tbody>

  function renderLoading() {
    const arr: JSX.Element[] = []
    for (let i = 0; i < 10; i++) {
      const element = customRows?.({} as T, i, true);
      if (element) arr.push(
        <Fragment key={`tb-rl-${i}`}>
          {element}
        </Fragment>
      );
    }
    return arr
  }

  function renderEmpty (colSpan: number) {
    return <tr>
      <td colSpan={colSpan} className="gray-05-bg">
        <div className="render-empty flex flex-center gap05">
          <h2>Nenhum resultado encontrado</h2>
          <p>Tente procurar por outro termo de nome, cargo ou data de admissão.</p>
        </div>
      </td>
    </tr>
  }
}

type SkeletonProps = { td?: boolean }

export function SkeletonText ({ td }: SkeletonProps): JSX.Element {
  return (
    td ? (<>
      <td>
        <span className='skeleton-text'></span>
      </td>
    </>)
    : <span className='skeleton-text'></span>
  )
}

export function SkeletonImage ({ td }: SkeletonProps): JSX.Element {
  return (
    td ? (<>
      <td>
        <span className='skeleton-image'></span>
      </td>
    </>)
    : <span className='skeleton-image'></span>
  )
}

export default TableBody