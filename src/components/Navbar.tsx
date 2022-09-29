import { useAuthState } from 'react-firebase-hooks/auth'
import { useContext } from 'react';
import { Context } from '..';

const Navbar: React.FC = () => {
  const context = useContext(Context);
  const [user] = useAuthState(context?.auth);

  return(
    <nav className="fixed top-0 inset-x-0 flex items-center justify-between shadow-lg bg-gradient-to-r from-cyan-500 to-blue-500 h-[50px]">
      <div className="text-4xl font-bold text-stone-100 hover:text-white cursor-pointer ml-5">Chat</div>
      <div className="">
        {user ? (
          <button onClick={() => context?.auth.signOut()} className="text-stone-100 hover:text-white cursor-pointer mr-5">Logout</button>
        )
        :
        (
          <button className="text-stone-100 hover:text-white cursor-pointer mr-5">Login</button>
        )
        }
      </div>
    </nav>
  )
}

export default Navbar;