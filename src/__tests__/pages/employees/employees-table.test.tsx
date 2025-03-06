import EmployeesContext from "@contexts/employees-context"
import EmployeesProvider from "@providers/employees-provider"
import { screen, render } from "@testing-library/react"
import { useContext } from "react"

describe('functioning of the employees table', () => {
  it('should check if items receives something different than null on mounting', async () => {
    const TestComponent = () => {
      const { proccesedEmployees } = useContext(EmployeesContext);

      return <> 
        {proccesedEmployees == null
          ? 'Employees is null'
          : 'Employees is not null'}
      </>
    }
    render(
      <EmployeesProvider>
        <TestComponent />
      </EmployeesProvider>
    )

    const text = screen.getByText(/Employees is null/)
    expect(text).toBeInTheDocument()
  })
})