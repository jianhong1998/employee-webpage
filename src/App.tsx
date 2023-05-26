import { Routes, Route } from 'react-router-dom';

import Header from './components/header/header.component';
import HomePage from './pages/home.page';

import EmployeeFormPage from './pages/employeeForm.page';
import EmployeeFormMode from './models/employeeFormMode.enum';
import UserFormPage from './pages/userForm.page';
import UserFormMode from './models/userFormMode.enum';
import { useEffect } from 'react';
import { useAppDispatch } from './store/index.store';
import TokenHandler from './services/tokenService/tokenHandler.service';
import { loggedInUserActions } from './store/loggedInUser.slice';

function App() {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    try {
      const token = TokenHandler.getToken();

      const { userId, username, departmentId } = TokenHandler.decodeToken(token);

      dispatch(loggedInUserActions.setLoggedInUserState({
        token,
        user: {
          userId,
          username,
          departmentId
        }
      }));
    } catch (error) {
      return;
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Header />}>
        <Route index element={<HomePage />} />
        <Route path='/new-employee' element={<EmployeeFormPage mode={EmployeeFormMode.CREATE} />} />
        <Route path='/edit-employee' element={<EmployeeFormPage mode={EmployeeFormMode.UPDATE} />} />
      </Route>
      <Route path='/user'>
        <Route path='login' element={<UserFormPage mode={UserFormMode.LOGIN} />} />
        <Route path='sign-up' element={<UserFormPage mode={UserFormMode.SIGNUP} />} />
      </Route>
    </Routes>
  );
}

export default App;
