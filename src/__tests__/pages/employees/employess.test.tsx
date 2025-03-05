import EmployeesPage from '@pages/employees/employees';
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import EmployeesContext from "@contexts/employees-context";
import employeesDb from '../../../../db.json';

const proccesedEmployees = employeesDb.employees.map(employee => ({
  ...employee,
  id: Number(employee.id)
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
        return element?.parentElement?.tagName.toLowerCase() === 'td' && /maria/i.test(content);
      });
      expect(tdElemMaria).toBeInTheDocument();

      const tdElemMario = screen.getByText((content, element) => {
        return element?.parentElement?.tagName.toLowerCase() === 'td' && /mario/i.test(content);
      });
      expect(tdElemMario).toBeInTheDocument();
    })
})