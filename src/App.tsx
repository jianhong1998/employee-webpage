import './App.scss';
import EmployeeList from './components/employeeList/employeeList.component';
import UpdateEmployeeForm from './components/forms/updateEmployeeForm.component';
import AddEmployeeButton from './components/ui/buttons/addEmployeeButton.component';
import Popup from './components/ui/popup/popup.component';

function App() {
  return (
    <>
      {/* <AddEmployeeButton />
      <EmployeeList pageNumber={1} />
      <Popup /> */}
      <UpdateEmployeeForm />
    </>
  );
}

export default App;
