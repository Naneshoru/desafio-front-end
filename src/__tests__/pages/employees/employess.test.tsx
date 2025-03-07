/* eslint-disable @typescript-eslint/no-explicit-any */
// import EmployeesPage from '@pages/employees/employees';
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import employeesDb from '../../../../db.json'
import EmployeesProvider from "@providers/employees-provider";
import EmployeesPage from "@pages/employees/employees";
import React from "react";
import { isoToDDMMYYYY, phoneFormat } from "@utils/formatters";
import EmployeesContext from "@contexts/employees-context";

const employees = employeesDb.employees.map(employee => ({
  ...employee,
  id: Number(employee.id),
}))

const proccesedEmployees = employeesDb.employees.map(employee => ({
    ...employee,
    id: Number(employee.id),
    admission_date: isoToDDMMYYYY(employee.admission_date),
    phone: phoneFormat(employee.phone)
  }))

const EmployeesPageWithProvider: React.FC<any> = () => {
  return (
    <EmployeesProvider>
      <EmployeesPage />
    </EmployeesProvider>
  )
};

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(employees),
      headers: new Headers(),
      ok: true,
      status: 200,
      statusText: 'OK',
    } as Response)
  );
})

describe("Filtering functionality tests", () => {
  it("should test filtering in the 'name' column case insensitive", async () => {
    render(<EmployeesPageWithProvider />)

    const inputElem = screen.getByRole('searchbox', { name: /Searchbar/i })

    await userEvent.type(inputElem, 'ma')

    await waitFor(() => {
      expect(screen.getByText('Maria')).toBeInTheDocument();
      expect(screen.getByText('Mario')).toBeInTheDocument();
      expect(screen.queryByText("Ricardo")).not.toBeInTheDocument();
    })
  })

  it("should test filtering in the 'job' column", async () => {
    render(<EmployeesPageWithProvider />)

    const inputElem = screen.getByRole('searchbox', { name: /Searchbar/i })

    await userEvent.type(inputElem, 'Fr')
    
    await waitFor(async () => {
      const frontDevs = proccesedEmployees.filter(e => e.job === 'Front-end')
  
      const frontElems = screen.getAllByText((content, element) => {
        return !!element?.closest('td') &&  content == 'Front-end';
      });

      expect(frontElems.length).toBe(frontDevs.length);
      expect(frontElems.length).toBe(5);
  
      const rows = screen.getAllByRole('row').slice(1) // Sem o header row
  
      // Garantir que todas as linhas exibidas tenham o texto
      for (let i = 0; i < rows.length; i++) {
        expect(within(rows[i]).getByText('Front-end')).toBeInTheDocument();
      }
    })
  })

  it("should test filtering the date of admission by the Year in the 'admission_date' column", async () => {
    render(<EmployeesPageWithProvider />)

    const inputElem = screen.getByRole('searchbox', { name: /Searchbar/i })

    await userEvent.type(inputElem, '2020')

    await waitFor(async () => {
      const fromTwoThousandTwenty = proccesedEmployees.filter(e => e.admission_date.includes('2020'))
  
      const yearElems = screen.getAllByText((content, element) => {
        return !!element?.closest('td') && content.includes('2020');
      });
      
      expect(yearElems.length).toBe(fromTwoThousandTwenty.length)
      expect(yearElems.length).toBe(6)

      const rows = screen.getAllByRole('row').slice(1) // Sem o header row
  
      // Garantir que todas as linhas exibidas tenham o texto
      for (let i = 0; i < rows.length; i++) {
        expect(within(rows[i]).getByText((content) => /2020/.test(content))).toBeInTheDocument();
      }
    })
  })

  it("should test filtering the date of admission by the Month in the 'admission_date' column", async () => { // or Day, Year(parcial)
    render(<EmployeesPageWithProvider />)

    const inputElem = screen.getByRole('searchbox', { name: /Searchbar/i })

    await userEvent.type(inputElem, '03')

    await waitFor(async () => {
      const foundEmployees = proccesedEmployees.filter(e => e.admission_date.includes('03'))

      const foundElems = screen.getAllByText((content, element) => {
        return !!element?.closest('td') && content.includes('03');
      });
      
      expect(foundElems.length).toBe(foundEmployees.length)
      expect(foundElems.length).toBe(2)

      const rows = screen.getAllByRole('row').slice(1) // Sem o header row

      // Garantir que todas as linhas exibidas tenham o texto
      for (let i = 0; i < rows.length; i++) {
        expect(within(rows[i]).getByText((content) => /03/.test(content))).toBeInTheDocument();
      }
    })
  })

  it("should test filtering the date of admission by the Day in the 'admission_date' column", async () => { // or Month, Year(parcial)
    render(<EmployeesPageWithProvider />)

    const inputElem = screen.getByRole('searchbox', { name: /Searchbar/i })

    await userEvent.type(inputElem, '31')

    await waitFor(async () => {
      const foundEmployees = proccesedEmployees.filter(e => e.admission_date.includes('31'))

      const foundElems = screen.getAllByText((content, element) => {
        return !!element?.closest('td') && content.includes('31');
      });

      expect(foundElems.length).toBe(foundEmployees.length)
      expect(foundElems.length).toBe(2)

      const rows = screen.getAllByRole('row').slice(1) // Sem o header row

      // Garantir que todas as linhas exibidas tenham o texto
      for (let i = 0; i < rows.length; i++) {
        expect(within(rows[i]).getByText((content) => /31/.test(content))).toBeInTheDocument();
      }
    })
  })

  it("should test filtering the date of admission by Part of the Date text in the 'admission_date' column", async () => { // or Month, Year(parcial)
    render(<EmployeesPageWithProvider />)

    const inputElem = screen.getByRole('searchbox', { name: /Searchbar/i })

    await userEvent.type(inputElem, '27/04')

    await waitFor(async () => {
      const foundEmployees = proccesedEmployees.filter(e => e.admission_date.includes('27/04'))
  
      const foundElems = screen.getAllByText((content, element) => {
        return !!element?.closest('td') && content.includes('27/04');
      });
  
      expect(foundElems.length).toBe(foundEmployees.length)
      expect(foundElems.length).toBe(1)
  
      const rows = screen.getAllByRole('row').slice(1) // Sem o header row
  
      // Garantir que todas as linhas exibidas tenham o texto
      for (let i = 0; i < rows.length; i++) {
        expect(within(rows[i]).getByText((content) => /27\/04/.test(content))).toBeInTheDocument();
      }
    })
  })

  it("should test filtering the phone column", async () => {
    render(<EmployeesPageWithProvider />)

    const inputElem = screen.getByRole('searchbox', { name: /Searchbar/i })

    await userEvent.type(inputElem, '99464')

    await waitFor(async () => {
      const foundEmployees = proccesedEmployees.filter(e => e.phone.includes('99464'))
  
      const foundElems = screen.getAllByText((content, element) => {
        return !!element?.closest('td') && content.includes('99464');
      });
  
      expect(foundElems.length).toBe(foundEmployees.length)
      expect(foundElems.length).toBe(1)

      const rows = screen.getAllByRole('row').slice(1) // Sem o header row

      // Garantir que todas as linhas exibidas tenham o texto
      for (let i = 0; i < rows.length; i++) {
        expect(within(rows[i]).getByText((content) => /99464/.test(content))).toBeInTheDocument();
      }
    })
  })
})

describe("Sorting functionality tests", () => {
  it("should call getEmployees with the correct params when sorting by a field", async () => {
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