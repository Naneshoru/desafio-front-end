/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import employeesDb from '../../../../db.json'
import EmployeesProvider from "@providers/employees-provider";
import EmployeesPage from "@pages/employees/employees";
import React from "react";
import { isoToDDMMYYYY, phoneFormat } from "@utils/formatters";

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
      statusText: 'OK'
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
    
    await waitFor( () => {
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

    await waitFor( () => {
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

    await waitFor( () => {
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

    await waitFor( () => {
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

    await waitFor( () => {
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

    await waitFor( () => {
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
    render (< EmployeesPageWithProvider />);

    const columnheaders = screen.getAllByRole('columnheader');
    const sortableFields = columnheaders.filter(h => h.classList.contains("sortable"));

    await userEvent.click(sortableFields[0]);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('_sort=name&_order=desc'));
    });

    await userEvent.click(sortableFields[0]);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('_sort=name&_order=asc'));
    });

    await userEvent.click(sortableFields[1]);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('_sort=job&_order=desc'));
    });

    await userEvent.click(sortableFields[1]);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('_sort=job&_order=asc'));
    });

    await userEvent.click(sortableFields[2]);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('_sort=admission_date&_order=desc'));
    });

    await userEvent.click(sortableFields[2]);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('_sort=admission_date&_order=asc'));
    });

    await userEvent.click(sortableFields[3]);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('_sort=phone&_order=desc'));
    });

    await userEvent.click(sortableFields[3]);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('_sort=phone&_order=asc'));
    });
  });
});

describe("Filtering and Sorting functionality combined tests", () => {
  global.fetch = jest.fn()
  beforeEach(() => {
    const mockedResponses: { [key: string]: any } = {
      '_sort=name&_order=desc': [{
        "id": "6",
        "name": "Mario",
        "job": "Front-end",
        "admission_date": "2020-10-01T00:00:00.000Z",
        "phone": "5551234567890",
        "image": "https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png"
      }, {
        "id": "3",
        "name": "Maria",
        "job": "Front-end",
        "admission_date": "2020-03-15T00:00:00.000Z",
        "phone": "5557894561230",
        "image": "https://www.clipartmax.com/png/middle/277-2772117_user-profile-avatar-woman-icon-avatar-png-profile-icon.png"
      },],
      '_sort=name&_order=asc': [{
        "id": "3",
        "name": "Maria",
        "job": "Front-end",
        "admission_date": "2020-03-15T00:00:00.000Z",
        "phone": "5557894561230",
        "image": "https://www.clipartmax.com/png/middle/277-2772117_user-profile-avatar-woman-icon-avatar-png-profile-icon.png"
      }, {
        "id": "6",
        "name": "Mario",
        "job": "Front-end",
        "admission_date": "2020-10-01T00:00:00.000Z",
        "phone": "5551234567890",
        "image": "https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png"
      }],
      '_sort=job&_order=desc': employeesDb.employees.sort((a, b) => b.job.localeCompare(a.job))
    }
    global.fetch = jest.fn((input: RequestInfo | URL) => {
      const url = typeof input === 'string' ? input : input.toString();
      const params = new URLSearchParams(url.split('?')[1]);
      const sortParam = params.get('_sort') && params.get('_order') ? `_sort=${params.get('_sort')}&_order=${params.get('_order')}` : '';

      const response = mockedResponses[sortParam] || employees;
      return Promise.resolve({
        json: () => Promise.resolve(response),
        headers: new Headers(),
        ok: true,
        status: 200,
        statusText: 'OK'
      } as Response);
    });
  });

  it("should filter for 'ma' string and sort by name after it", async () => {
    render(<EmployeesPageWithProvider />);

    const inputElem = screen.getByRole("searchbox");

    await userEvent.type(inputElem, 'ma');

    await waitFor(() => {
      expect(screen.getByText(/Maria/)).toBeInTheDocument();
      expect(screen.getByText(/Mario/)).toBeInTheDocument();
      expect(screen.queryByText(/Ricardo/)).not.toBeInTheDocument();
    });

    const columnheaders = screen.getAllByRole('columnheader');
    const sortableFields = columnheaders.filter(h => h.classList.contains("sortable"));

    await userEvent.click(sortableFields[0]);
    
    await waitFor(() => {
      const rows = screen.getAllByRole('row').slice(1);
      expect(within(rows[0]).getByRole('cell', { name: /Mario/ })).toBeInTheDocument();
      expect(within(rows[1]).getByRole('cell', { name: /Maria/ })).toBeInTheDocument();
    });
    
    await userEvent.click(sortableFields[0]);

    await waitFor(() => {
      const rows = screen.getAllByRole('row').slice(1);
      expect(within(rows[0]).getByRole('cell', { name: /Maria/ })).toBeInTheDocument();
      expect(within(rows[1]).getByRole('cell', { name: /Mario/ })).toBeInTheDocument();
    });
  });

  it("should sort by job and filter for 2020", async () => {
    render(<EmployeesPageWithProvider />)

    const columnheaders = screen.getAllByRole("columnheader")
    const sortableFields = columnheaders.filter(h => h.classList.contains("sortable"))

    await userEvent.click(sortableFields[1])
    
    
    await waitFor(() => {
      const rows = screen.getAllByRole("row").slice(1)

      for (let i = 0; i < 5; i++) {
        expect(within(rows[i]).getByText("Front-end")).toBeInTheDocument();
      }

      expect(within(rows[5]).getByText("Designer")).toBeInTheDocument()

      for (let i = 6; i < 10; i++) {
        expect(within(rows[i]).getByText("Back-end")).toBeInTheDocument();
      }
    })

    const inputElem = screen.getByRole("searchbox");

    await userEvent.type(inputElem, '2020');
    
    await waitFor(() => {
      const rows = screen.getAllByRole("row").slice(1)

      for (let i = 0; i < rows.length; i++) {
        expect(within(rows[i]).getByText((content) => /2020/.test(content))).toBeInTheDocument()
      }
    });
  })
});