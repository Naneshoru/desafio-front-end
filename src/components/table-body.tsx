import { Fragment, JSX, useMemo } from "react"
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
  const mobile = useMemo(() => size === 'mobile', [size])

  const render = () => {
    const colSpan = mobile ? mainFields.length : fields.length
    if (items == null) return renderLoading(colSpan)

    if (items != null && items.length > 0) {
      return customRows ? (
        items.map((item, index) => (
          customRows(item, index, false)
      )))
      : items.map((item) => (
        <TableRow item={item} fields={fields} mainFields={mainFields} mobileWidth={mobileWidth} key={`tb-tr-${item.id}`} />
      ))
    }
    return renderEmpty(colSpan)
  }

  return <tbody>{render()}</tbody>

  function renderLoading(colSpan?: number) {
    const arr: JSX.Element[] = []
    if (customRows) {
      for (let i = 0; i < 10; i++) {
        const element = customRows({} as T, i, true);
        arr.push(
          <Fragment key={`tb-rl-${i}`}>
            {element}
          </Fragment>
        );
      }
    } else {
      for (let i = 0; i < 10; i++) {
        arr.push(<tr key={`tb-rl-${i}`}>
          <SkeletonText td key={`tb-rl-sk`} colSpan={colSpan} />
        </tr>)
      }
    }
    return arr;
  }

  function renderEmpty (colSpan: number) {
    return <tr key={'tb-re'}>
      <td colSpan={colSpan} className="gray-05-bg">
        <div className="render-empty flex flex-center gap05">
          <h2>Nenhum resultado encontrado</h2>
          <p>Tente procurar por outro termo de nome, cargo ou data de admissão.</p>
        </div>
      </td>
    </tr>
  }
}

type SkeletonProps = { td?: boolean, colSpan?: number }

export function SkeletonText ({ td, ...props }: SkeletonProps): JSX.Element {
  return (
    td ? (<>
      <td {...props}>
        <span className='skeleton-text'></span>
      </td>
    </>)
    : <span className='skeleton-text'></span>
  )
}

export function SkeletonImage ({ td, ...props }: SkeletonProps): JSX.Element {
  return (
    td ? (<>
      <td {...props}>
        <span className='skeleton-image'></span>
      </td>
    </>)
    : <span className='skeleton-image'></span>
  )
}

export default TableBody