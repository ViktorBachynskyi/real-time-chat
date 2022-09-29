import { Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../routes';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useContext } from 'react';
import { Context } from '..';

const AppRouter: React.FC = () => {
  const context = useContext(Context);
  const [user] = useAuthState(context?.auth);

  console.log(user)

  return user ?
  (
    <Routes>
      {privateRoutes.map(({path, component: Component}) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path='*' element={<Navigate to={'/chat'} />} />
    </Routes>
  )
  :
  (
    <Routes>
      {publicRoutes.map(({path, component: Component}) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path='*' element={<Navigate to={'/login'} />} />
    </Routes>
  )
}

export default AppRouter;