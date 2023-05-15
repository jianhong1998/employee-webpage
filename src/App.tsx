import './App.scss';
import EmployeeCard from './components/employeeList/employeeCard.component';
import DeleteButton from './components/ui/deleteButton.component';
import EditButton from './components/ui/editButton.component';
import DepartmentType from './models/departmentType.enum';
import EmployeeDataModel from './models/employeeData.model';

function App() {
  return (
    <div className="App">
      <EmployeeCard
        employee={{
          id: 1,
          name: "Jian Hong",
          department: DepartmentType.PS,
          salary: 1200
        } as EmployeeDataModel}
      />
    </div>
  );
}

export default App;
