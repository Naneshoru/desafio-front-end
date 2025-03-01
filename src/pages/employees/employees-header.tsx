import React, { useContext, useEffect, useState } from 'react'
import EmployeesContext from '../../contexts/employees-context';
import { UncontrolledInput } from '../../components/input'
import { Employee } from '../../models/employee';
import { useDebounce } from '../../hooks/debounce';
import SearchSvg from '../../assets/search.svg'

export default function HeaderEmployees() {
  const { fetchEmployees, setEmployees } = useContext(EmployeesContext);

  const [debouncedInput, setDebouncedInput] = useState<string | null>(null);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    debouncedCallback(input);
  };

  const debouncedCallback = useDebounce((value: string) => {
    setDebouncedInput(value);
  }, 300);
    
  useEffect(() => {
    if (debouncedInput == null) return

    const query = new URLSearchParams(window.location.search);

    query.set('q', debouncedInput)
    const newUrl = `${window.location.pathname}?${query.toString()}`;
    window.history.pushState({}, '', newUrl);

    fetchEmployees(query.toString()).then((employees: Employee[]) => {
      const byJobNameAdmission = (employees: Employee[]) => {
        const filteredEmployees = employees.filter((emp: Employee) =>
          emp.job.toLowerCase().includes(debouncedInput.toLowerCase()) ||
          emp.name.toLowerCase().includes(debouncedInput.toLowerCase()) ||
          emp.admission_date.includes(debouncedInput)
        );
        console.log('filteredEmployees', filteredEmployees);
        
        setEmployees(filteredEmployees);
      };
      void byJobNameAdmission(employees);
    });
  }, [debouncedInput]);

  return (
    <section className='up-tb-head'>
      <header className='flex justify-between gap2'>
        <h1>Funcionários</h1>
        <div className='input-wrapper'>
          <UncontrolledInput onChange={handleChange} placeholder='Pesquisar' />
          <img src={SearchSvg} alt="Seach icon" />
        </div>
      </header>
    </section>
  )
}
