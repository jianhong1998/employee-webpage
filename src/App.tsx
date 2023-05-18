import { Routes, Route } from 'react-router-dom';

import Header from './components/header/header.component';
import HomePage from './pages/home.page';

import EmployeeFormPage from './pages/employeeForm.page';
import EmployeeFormMode from './models/employeeFormMode.enum';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Header />}>
        <Route index element={<HomePage />} />
        <Route path='/new-employee' element={<EmployeeFormPage mode={EmployeeFormMode.CREATE} />} />
        <Route path='/edit-employee' element={<EmployeeFormPage mode={EmployeeFormMode.UPDATE} />} />
      </Route>
    </Routes>
  );
}

export default App;
