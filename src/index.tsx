import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { createContext } from 'react';

firebase.initializeApp({
  apiKey: "AIzaSyAMAxwge-RctKV7CzOfTwLnfIo_-DldOjs",
  authDomain: "chat-react-c079d.firebaseapp.com",
  projectId: "chat-react-c079d",
  storageBucket: "chat-react-c079d.appspot.com",
  messagingSenderId: "120923056380",
  appId: "1:120923056380:web:dc10929c0d97b053bbcf79",
  measurementId: "G-8SVSJGXGHZ"
})

interface IFirebase123 {
  firebase: any,
  auth: any,
  firestore: any,
}

interface AppContextInterface {
  firebase: any,
  auth: any,
  firestore: any,
}

export const Context = createContext<AppContextInterface | null>(null);

const auth = firebase.auth();
const firestore = firebase.firestore();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Context.Provider value={{
        firebase,
        auth,
        firestore
      }}
    >
      <App />
    </Context.Provider>
  </BrowserRouter>
);
