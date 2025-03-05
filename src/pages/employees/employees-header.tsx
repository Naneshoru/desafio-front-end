import React, { useContext, useEffect, useState } from 'react'
import EmployeesContext from '@contexts/employees-context';
import { UncontrolledInput } from '@components/input'
import { useDebounce } from '@hooks/debounce';
import SearchSvg from '/assets/search.svg'

export default function HeaderEmployees() {
  const { getEmployees, setFilter } = useContext(EmployeesContext);

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

    // query.set('q', debouncedInput)
    const newUrl = `${window.location.pathname}?${query.toString()}`;
    window.history.pushState({}, '', newUrl);

    void getEmployees(query.toString()).then(() => {
      setFilter({ search: debouncedInput })
    })
  }, [debouncedInput, getEmployees, setFilter]);

  return (
    <section className='up-tb-head'>
      <header className='flex justify-between gap2'>
        <h1>Funcionários</h1>
        <div className='input-wrapper'>
          <UncontrolledInput type="search" onChange={handleChange} placeholder='Pesquisar' />
          {SearchSvg && <img src={SearchSvg} alt="Seach icon" />}
        </div>
      </header>
    </section>
  )
}
