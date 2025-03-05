import EmployeesPage from '@pages/employees/employees';
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import EmployeesContext from "@contexts/employees-context";
import employeesDb from '../../../../db.json';
import { isoToDDMMYYYY, phoneFormat } from '@utils/formatters';

const proccesedEmployees = employeesDb.employees.map(employee => ({
  ...employee,
  id: Number(employee.id),
  admission_date: isoToDDMMYYYY(employee.admission_date),
  phone: phoneFormat(employee.phone)
}))

const EmployessPageWithProvider = () => {
  const setEmployees = jest.fn();
  const fetchEmployees = jest.fn();
  const getEmployees = jest.fn();
  const setFilter = jest.fn();
  const filter = null;
  const employees = null;

  return (
    <EmployeesContext.Provider value={{ employees, setEmployees, fetchEmployees, getEmployees, filter, setFilter, proccesedEmployees }}>
      <EmployeesPage />
    </EmployeesContext.Provider>
  );
};

describe("Filtering functionality tests", () => {
  it("should test filtering in the 'name' column case insensitive", async () => {
    render(<EmployessPageWithProvider />)

    const inputElem = screen.getByRole('searchbox', { name: /Searchbar/i })

    await userEvent.type(inputElem, 'ma')
    
    const tdElemMaria = screen.getByText((content, element) => {
      return element?.parentElement?.tagName.toLowerCase() === 'td' && content === 'Maria';
    });
    expect(tdElemMaria).toBeInTheDocument();

    const tdElemMario = screen.getByText((content, element) => {
      return element?.parentElement?.tagName.toLowerCase() === 'td' && content === 'Mario';
    });
    expect(tdElemMario).toBeInTheDocument();
  })

  it("should test filtering in the 'job' column", async () => {
    render(<EmployessPageWithProvider />)

    const inputElem = screen.getByRole('searchbox', { name: /Searchbar/i })

    await userEvent.type(inputElem, 'Fr')
    
    const frontDevs = proccesedEmployees.filter(e => e.job === 'Front-end')

    const frontElems = screen.getAllByText((content, element) => {
      return element?.parentElement?.tagName.toLowerCase() === 'td' &&  content == 'Front-end';
    });
    expect(frontElems.length).toBe(frontDevs.length);
    expect(frontElems.length).toBe(5);
  })

  it("should test filtering the date of admission by the Year in the 'admission_date' column", async () => {
    render(<EmployessPageWithProvider />)

    const inputElem = screen.getByRole('searchbox', { name: /Searchbar/i })

    await userEvent.type(inputElem, '2020')

    const fromTwoThousandTwenty = proccesedEmployees.filter(e => e.admission_date.includes('2020'))
    console.log('2020', fromTwoThousandTwenty.map(c => c.admission_date))

    const yearElems = screen.getAllByText((content, element) => {
      return element?.parentElement?.tagName.toLowerCase() === 'td' && content.includes('2020');
    });
    
    expect(yearElems.length).toBe(fromTwoThousandTwenty.length)
    expect(yearElems.length).toBe(6)
  })

  it("should test filtering the date of admission by the Month in the 'admission_date' column", async () => { // or Day, Year(parcial)
    render(<EmployessPageWithProvider />)

    const inputElem = screen.getByRole('searchbox', { name: /Searchbar/i })

    await userEvent.type(inputElem, '03')

    const allRows = screen.getAllByRole("row"); 

    // Pega a 4ª coluna de <td> (index 3)
    const fourthColumnCells = allRows.filter(row => row.querySelectorAll("td")[3])
    
    const dateElemsCount = fourthColumnCells.filter(elem => elem.textContent?.includes('03'))

    expect(dateElemsCount.length).toBe(dateElemsCount.length)
    expect(dateElemsCount.length).toBe(2)
  })

  it("should test filtering the date of admission by the Day in the 'admission_date' column", async () => { // or Month, Year(parcial)
    render(<EmployessPageWithProvider />)

    const inputElem = screen.getByRole('searchbox', { name: /Searchbar/i })

    await userEvent.type(inputElem, '31')

    const allRows = screen.getAllByRole("row"); 

    // Pega a 4ª coluna de <td> (index 3)
    const fourthColumnCells = allRows.filter(row => row.querySelectorAll("td")[3])
    
    const dateElemsCount = fourthColumnCells.filter(elem => elem.textContent?.includes('31'))

    expect(dateElemsCount.length).toBe(dateElemsCount.length)
    expect(dateElemsCount.length).toBe(2)
  })

  it("should test filtering the date of admission by Part of the Date text in the 'admission_date' column", async () => { // or Month, Year(parcial)
    render(<EmployessPageWithProvider />)

    const inputElem = screen.getByRole('searchbox', { name: /Searchbar/i })

    await userEvent.type(inputElem, '27/04')

    const allRows = screen.getAllByRole("row"); 

    // Pega a 4ª coluna de <td> (index 3)
    const fourthColumnCells = allRows.filter(row => row.querySelectorAll("td")[3])
    
    const dateElemsCount = fourthColumnCells.filter(elem => elem.textContent?.includes('27/04'))

    expect(dateElemsCount.length).toBe(dateElemsCount.length)
    expect(dateElemsCount.length).toBe(1)
  })
})