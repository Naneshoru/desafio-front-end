import { render, screen, act, waitFor } from "@testing-library/react";
import employeesDb from '../../../db.json';
import { isoToDDMMYYYY, phoneFormat } from '@utils/formatters';
import { Field } from '@models/table';
import { Employee } from '@models/employee';
import Table from "@components/table";
import userEvent from "@testing-library/user-event";

export const proccesedEmployees = employeesDb.employees.map(employee => ({
  ...employee,
  id: Number(employee.id),
  admission_date: isoToDDMMYYYY(employee.admission_date),
  phone: phoneFormat(employee.phone)
}))

export const fields: Field<Employee>[] = [
  { name: 'image', displayName: 'Foto', isImage: true, alt: 'employee image' }, 
  { name: 'name', displayName: 'Nome', sortable: true }, 
  { name: 'job', displayName: 'Cargo', sortable: true }, 
  { name: 'admission_date', displayName: 'Data de admissão', sortable: true },
  { name: 'phone', displayName: 'Telefone', sortable: true }
]

export const mainFields: Array<keyof Employee> = ['image', 'name'];

export const mobileWidth = 540;

it("on mobile, the table row should have open class after clicking the button to toggle", async () => {
  render(
    <Table
      items={proccesedEmployees} 
      fields={fields} 
      mainFields={mainFields} 
      mobileWidth={mobileWidth}
    />
  )

  await act(async () => {
    window.innerWidth = 375;
    window.dispatchEvent(new Event('resize'));
  });

  const rows = screen.getAllByRole('row');

  const mobileRows = rows.filter(row => row.classList.contains('mobile-row'))

  mobileRows.forEach(async mobileRow => {
    const img = mobileRow.querySelector('[alt="chevron-down"]');
  
    expect(mobileRow.classList).not.toContain('open')
  
    if (img) {
      await userEvent.click(img);
      await waitFor(() => {
        expect(mobileRow.classList).toContain('open')
      })
    }
  });
});
