import Table, { Proccesed } from "@components/table"
import { act, getAllByRole, render } from "@testing-library/react"
import { fields, mainFields, mobileWidth } from "./table-row.test"
import { Employee } from "@models/employee"
import { SkeletonImage, SkeletonText } from "@components/table-body"
import { JSX } from "react"

describe('table body rendering the correct state', () => {
  it('for mobile, should render the loading state while there is no data at all', async () => { 
    render(
      <Table
        items={null} 
        fields={fields} 
        mainFields={mainFields} 
        mobileWidth={mobileWidth}
      />
    )
    await act(async () => {
      window.innerWidth = 375;
      window.dispatchEvent(new Event('resize'));
    });

    const cells = getAllByRole(document.body, 'cell')

    const textElems = cells.map(cell => cell.querySelectorAll('.skeleton-text'))

    expect(textElems.length).toBe(cells.length) // 10
    expect(textElems.length).toBe(10)
  })
  it('should render the loading state while there is no data at all', () => {
     render(
        <Table
          items={null} 
          fields={fields} 
          mainFields={mainFields} 
          mobileWidth={mobileWidth}
        />
      )

    const cells = getAllByRole(document.body, 'cell')

    const textElems = cells.map(cell => cell.querySelectorAll('.skeleton-text'))

    expect(textElems.length).toBe(cells.length) // 10
    expect(textElems.length).toBe(10)
  })
  it('for mobile custom rows, should render the loading state while there is no data at all', async () => {
    render(
      <Table
        items={null} 
        fields={fields} 
        mainFields={mainFields} 
        mobileWidth={mobileWidth}
        customRows={customRowsMobile}
      />
    )

    await act(async () => {
      window.innerWidth = 375;
      window.dispatchEvent(new Event('resize'));
    });

    const cells = getAllByRole(document.body, 'cell')

    const textLoaders = cells.filter(cell => Array.from(cell.querySelectorAll('.skeleton-text')).length > 0)

    const imgLoaders = cells.filter(cell => Array.from(cell.querySelectorAll('.skeleton-image')).length > 0)

    const textFields = fields.filter(f => !f.isImage && mainFields.includes(f.name))

    const imgFields = fields.filter(f => f.isImage && mainFields.includes(f.name))

    expect(textLoaders.length).toBe(textFields.length * 10) // 10 * T in MF
    expect(textLoaders.length).toBe(10)

    expect(imgLoaders.length).toBe(imgFields.length * 10) // 10 * I in MF
    expect(imgLoaders.length).toBe(10)
  })
  it('for web custom rows, should render the loading state while there is no data at all', () => {
    render(
      <Table
        items={null} 
        fields={fields} 
        mainFields={mainFields} 
        mobileWidth={mobileWidth}
        customRows={customRowsWeb}
      />
    )
    const cells = getAllByRole(document.body, 'cell')

    const textLoaders = cells.filter(cell => Array.from(cell.querySelectorAll('.skeleton-text')).length > 0)

    const imgLoaders = cells.filter(cell => Array.from(cell.querySelectorAll('.skeleton-image')).length > 0)

    const textFields = fields.filter(f => !f.isImage)

    const imgFields = fields.filter(f => f.isImage)

    expect(textLoaders.length).toBe(textFields.length * 10) // 10 * T in F
    expect(textLoaders.length).toBe(40)

    expect(imgLoaders.length).toBe(imgFields.length * 10) // 10 * I in F
    expect(imgLoaders.length).toBe(10)
  })
})

function customRowsMobile(employee: Employee | Proccesed<Employee>, _: number, isLoading: boolean): JSX.Element {
  const mobile = 'mobile';
  if (isLoading && mobile) return (
    <tr key={`loading-${employee.id}`}>
      {mainFields.map((field, i) => {
        const fieldObj = fields?.find(f => f.name === field);
        if (fieldObj?.isImage) {
          return (<SkeletonImage td key={`sk-${i}`} />);
        } else {
          return (<SkeletonText td key={`sk-${i}`} />);
        }
      })}
    </tr>
  );
  return <></>;
}

function customRowsWeb (employee: Employee | Proccesed<Employee>, _: number, isLoading: boolean) {
  const web = true;
  if (isLoading && web) return (
    <tr key={`loading-${employee.id}`}>
      {fields.map((field, i) => {
        if (field?.isImage) {
          return (<SkeletonImage td key={`sk-${i}`} />);
        } else {
          return (<SkeletonText td key={`sk-${i}`} />);
        }
      })}
    </tr>
  );
  return <></>;
}