import './App.css';
import Header from './components/header';
import EmployeesPage from './pages/employees/employees';
import EmployeesProvider from './providers/employees-provider';

function App() {
  return (
    <div className='app'>
      <Header />
      <EmployeesProvider>
        <EmployeesPage />
      </EmployeesProvider>
    </div>
  );
}

export default App;
