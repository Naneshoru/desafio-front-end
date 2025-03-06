import EmployeesPage from '@pages/employees/employees';
import { render, screen, waitFor } from "@testing-library/react";
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

const EmployeesPageWithProvider = () => {
  const setEmployees = jest.fn();
  const fetchEmployees = jest.fn();
  const getEmployees = jest.fn().mockResolvedValue(Promise.resolve());
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
    render(<EmployeesPageWithProvider />)

    const inputElem = screen.getByRole('searchbox', { name: /Searchbar/i })

    await userEvent.type(inputElem, 'ma')
    
    const tdElemMaria = screen.getByText((content, element) => {
      return !!element?.closest('td') && content === 'Maria';
    });
    expect(tdElemMaria).toBeInTheDocument();

    const tdElemMario = screen.getByText((content, element) => {
      return !!element?.closest('td') && content === 'Mario';
    });
    expect(tdElemMario).toBeInTheDocument();
  })

  it("should test filtering in the 'job' column", async () => {
    render(<EmployeesPageWithProvider />)

    const inputElem = screen.getByRole('searchbox', { name: /Searchbar/i })

    await userEvent.type(inputElem, 'Fr')
    
    const frontDevs = proccesedEmployees.filter(e => e.job === 'Front-end')

    const frontElems = screen.getAllByText((content, element) => {
      return !!element?.closest('td') &&  content == 'Front-end';
    });
    expect(frontElems.length).toBe(frontDevs.length);
    expect(frontElems.length).toBe(5);
  })

  it("should test filtering the date of admission by the Year in the 'admission_date' column", async () => {
    render(<EmployeesPageWithProvider />)

    const inputElem = screen.getByRole('searchbox', { name: /Searchbar/i })

    await userEvent.type(inputElem, '2020')

    const fromTwoThousandTwenty = proccesedEmployees.filter(e => e.admission_date.includes('2020'))

    const yearElems = screen.getAllByText((content, element) => {
      return !!element?.closest('td') && content.includes('2020');
    });
    
    expect(yearElems.length).toBe(fromTwoThousandTwenty.length)
    expect(yearElems.length).toBe(6)
  })

  it("should test filtering the date of admission by the Month in the 'admission_date' column", async () => { // or Day, Year(parcial)
    render(<EmployeesPageWithProvider />)

    const inputElem = screen.getByRole('searchbox', { name: /Searchbar/i })

    await userEvent.type(inputElem, '03')

    const foundEmployees = proccesedEmployees.filter(e => e.admission_date.includes('03'))

    const foundElems = screen.getAllByText((content, element) => {
      return !!element?.closest('td') && content.includes('03');
    });
    
    expect(foundElems.length).toBe(foundEmployees.length)
    expect(foundElems.length).toBe(2)
  })

  it("should test filtering the date of admission by the Day in the 'admission_date' column", async () => { // or Month, Year(parcial)
    render(<EmployeesPageWithProvider />)

    const inputElem = screen.getByRole('searchbox', { name: /Searchbar/i })

    await userEvent.type(inputElem, '31')

    const foundEmployees = proccesedEmployees.filter(e => e.admission_date.includes('31'))

    const foundElems = screen.getAllByText((content, element) => {
      return !!element?.closest('td') && content.includes('31');
    });

    expect(foundElems.length).toBe(foundEmployees.length)
    expect(foundElems.length).toBe(2)
  })

  it("should test filtering the date of admission by Part of the Date text in the 'admission_date' column", async () => { // or Month, Year(parcial)
    render(<EmployeesPageWithProvider />)

    const inputElem = screen.getByRole('searchbox', { name: /Searchbar/i })

    await userEvent.type(inputElem, '27/04')

    const foundEmployees = proccesedEmployees.filter(e => e.admission_date.includes('27/04'))

    const foundElems = screen.getAllByText((content, element) => {
      return !!element?.closest('td') && content.includes('27/04');
    });

    expect(foundElems.length).toBe(foundEmployees.length)
    expect(foundElems.length).toBe(1)
  })

  it("should test filtering the phone column", async () => {
    render(<EmployeesPageWithProvider />)

    const inputElem = screen.getByRole('searchbox', { name: /Searchbar/i })

    await userEvent.type(inputElem, '99464')

    const foundEmployees = proccesedEmployees.filter(e => e.phone.includes('99464'))

    const foundElems = screen.getAllByText((content, element) => {
      return !!element?.closest('td') && content.includes('99464');
    });

    expect(foundElems.length).toBe(foundEmployees.length)
    expect(foundElems.length).toBe(1)
  })
})

describe("Sorting functionality tests", () => {
  fit("should call getEmployees with the correct params when sorting by a field", async () => {
    const setEmployees = jest.fn();
    const fetchEmployees = jest.fn();
    const getEmployees = jest.fn().mockResolvedValue(Promise.resolve());
    const setFilter = jest.fn();
    const filter = null;
    const employees = null;

    render (
      <EmployeesContext.Provider value={{ employees, setEmployees, fetchEmployees, getEmployees, filter, setFilter, proccesedEmployees }}>
        <EmployeesPage />
      </EmployeesContext.Provider>
    );

    const columnheaders = screen.getAllByRole('columnheader');
    const sortableFields = columnheaders.filter(h => h.classList.contains("sortable"));

    await userEvent.click(sortableFields[0]);

    await waitFor(() => {
      expect(getEmployees).toHaveBeenCalledWith(expect.stringContaining('_sort=name&_order=desc'));
    });

    await userEvent.click(sortableFields[0]);

    await waitFor(() => {
      expect(getEmployees).toHaveBeenCalledWith(expect.stringContaining('_sort=name&_order=asc'));
    });

    await userEvent.click(sortableFields[1]);

    await waitFor(() => {
      expect(getEmployees).toHaveBeenCalledWith(expect.stringContaining('_sort=job&_order=desc'));
    });

    await userEvent.click(sortableFields[1]);

    await waitFor(() => {
      expect(getEmployees).toHaveBeenCalledWith(expect.stringContaining('_sort=job&_order=asc'));
    });

    await userEvent.click(sortableFields[2]);

    await waitFor(() => {
      expect(getEmployees).toHaveBeenCalledWith(expect.stringContaining('_sort=admission_date&_order=desc'));
    });

    await userEvent.click(sortableFields[2]);

    await waitFor(() => {
      expect(getEmployees).toHaveBeenCalledWith(expect.stringContaining('_sort=admission_date&_order=asc'));
    });

    await userEvent.click(sortableFields[3]);

    await waitFor(() => {
      expect(getEmployees).toHaveBeenCalledWith(expect.stringContaining('_sort=phone&_order=desc'));
    });

    await userEvent.click(sortableFields[3]);

    await waitFor(() => {
      expect(getEmployees).toHaveBeenCalledWith(expect.stringContaining('_sort=phone&_order=asc'));
    });
  });
});