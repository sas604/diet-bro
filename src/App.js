import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import Landing from './components/Landing';
import PasswordRestore from './components/PasswordRestore';
import SignInPage from './components/SignIn';
import SignUp from './components/SignUp';
import MealDash from './components/MealDash';
import Dashboard from './components/Dashboard';
import Account from './components/Account';
import AddMeal from './components/AddMeal';
import { GlobalStylesHOC } from './styles/GlobalStyles';
import Typography from './styles/Typography';
import WeightDashboard from './components/WeightDashboard';
import { Provider } from 'react-redux';
import { store } from './store/store';
import BackButton from './components/BackButton';

function App() {
  return (
    <Provider store={store}>
      <GlobalStylesHOC />
      <Typography />
      <Router>
        <Routes>
          <Route path={ROUTES.DASH} element={<Dashboard />}>
            <Route path={ROUTES.DASH} element={<MealDash />} />
            <Route
              path={ROUTES.DASH + ROUTES.WEIGHT}
              element={<WeightDashboard />}
            />
            <Route
              path={ROUTES.DASH + ROUTES.ADD_MEAL}
              element={
                <>
                  <BackButton route={ROUTES.DASH} text="Back to Dashboard" />
                  <AddMeal />
                </>
              }
            />
            <Route path={ROUTES.DASH + ROUTES.ACCOUNT} element={<Account />} />
          </Route>
          <Route path={ROUTES.PASSWORD_FORGET} element={<PasswordRestore />} />
          <Route path={'/'} element={<Landing />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
          <Route path={ROUTES.SIGN_IN} element={<SignInPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
