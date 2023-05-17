import { Routes, Route } from 'react-router-dom';

import Header from './components/header/header.component';
import HomePage from './pages/home.page';
import NewEmployeePage from './pages/newEmployee.page';
import EditEmployeePage from './pages/editEmployee.page';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Header />}>
        <Route index element={<HomePage />} />
        <Route path='/new-employee' element={<NewEmployeePage />} />
        <Route path='/edit-employee' element={<EditEmployeePage />} />
      </Route>
    </Routes>
  );
}

export default App;
