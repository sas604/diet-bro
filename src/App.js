import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import Landing from './components/Landing';
import PasswordRestore from './components/PasswordRestore';
import SignInPage from './components/SignIn';
import SignUp from './components/SignUp';
import { AuthProvider } from './Auth';
import MealDash from './components/MealDash';
import Dashboard from './components/Dashboard';
import { GlobalStyles } from './styles/GlobalStyles';
import Typography from './styles/Typography';
function App() {
  return (
    <AuthProvider>
      <>
        <GlobalStyles />
        <Typography />
        <Router>
          <Routes>
            <Route path={'/dashboard'} element={<Dashboard />}>
              <Route path={'/dashboard'} element={<MealDash />} />
            </Route>
            <Route
              path={ROUTES.PASSWORD_FORGET}
              element={<PasswordRestore />}
            />
            <Route path={'/'} element={<Landing />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTES.SIGN_IN} element={<SignInPage />} />
          </Routes>
        </Router>
      </>
    </AuthProvider>
  );
}

export default App;
