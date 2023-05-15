import './App.scss';
import EmployeeList from './components/employeeList/employeeList.component';
import AddEmployeeButton from './components/ui/addEmployeeButton.component';

function App() {
  return (
    <>
      <AddEmployeeButton />
      <EmployeeList pageNumber={1} />
    </>
  );
}

export default App;
