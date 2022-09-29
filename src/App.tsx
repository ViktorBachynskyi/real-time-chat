import './App.css';
import { } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRouter from './components/AppRouter';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useContext } from 'react';
import { Context } from '.';
import Loader from './components/Loader';

function App() {
  const context = useContext(Context);
  const [user, loading, error] = useAuthState(context?.auth);

  return (
    <div>
      {loading ? 
      (<Loader />)
      :
      (
        <>
          <Navbar />
          <AppRouter />
        </>
      )}
    </div>
  );
}

export default App;
