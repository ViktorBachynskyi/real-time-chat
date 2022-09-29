import { useContext } from "react";
import { Context } from "..";
import firebase from 'firebase/compat/app';

function Login() {
  const context = useContext(Context)

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await context?.auth.signInWithPopup(provider);
    console.log(user);
  }

  return(
    <div className="h-screen flex justify-center items-center">
      <div className="flex justify-center items-center h-[200px] sm:h-[250px] w-[350px] sm:w-[500px] bg-gradient-to-r from-cyan-500 to-blue-500 drop-shadow-xl">
        <button onClick={login} className="text-xl sm:text-3xl border-2 border-stone-100 hover:bg-stone-50 text-stone-100 hover:text-blue-400 font-semibold p-7">
          Login with Google
        </button>
      </div>
    </div>
  )
}

export default Login;