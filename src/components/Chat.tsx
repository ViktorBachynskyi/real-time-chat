import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import Loader from './Loader';
import firebase from 'firebase/compat/app';

function Chat() {
  const context = useContext(Context);
  const [user] = useAuthState(context?.auth);
  const [value, setValue] = useState('');
  const [messages, loading] = useCollectionData(
    context?.firestore.collection('messages').orderBy('createdAt')
  )

  const sendMessage = async () => {
    if(value) {
      context?.firestore.collection('messages').add({
        uid: user?.uid,
        displayName: user?.displayName,
        photoURL: user?.photoURL,
        text: value,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
  
      setValue('');
    }
  }

  useEffect(() => {
    const chatScroll = document.querySelector('.chat__dialog');
    if (chatScroll) chatScroll.scrollTop = chatScroll?.scrollHeight;
  }, [messages])

  if (loading) {
    return <Loader />
  }

  return (
    <div className="flex justify-center">
      <div className="chat h-[80vh] w-3/4 flex flex-col mt-24">
        <div className="chat__dialog flex flex-col overflow-y-scroll scroll-smooth snap-end h-5/6 shadow-md border-2 bg-stone-100">
          {messages?.map(message => (
            <div
              key={message.createdAt}
              className={`
                message flex flex-col rounded-xl w-fit p-2 mt-2 mx-2
                ${user?.uid === message.uid ? 'bg-gradient-to-r from-cyan-500 to-blue-500 self-end' : 'bg-gradient-to-r from-gray-400 to-slate-400 self-start'} `}
            >
              <div className={`flex ${user?.uid === message.uid ? 'flex-row-reverse' : ''} items-center`}>
                <img className='rounded-full h-[30px] w-[30px]' src={message.photoURL} alt="user-photo" />
                <div
                  className={`${user?.uid === message.uid ? 'mr-2' : 'ml-2'} text-lg font-semibold text-stone-100`}
                >
                  {message.displayName}
                </div>
              </div>

              <div className="text-stone-100 mt-2 w-full">{message.text}</div>
            </div>
          ))}
        </div>
        <div className="chat__message-block shadow-md flex border-2 mt-5">
          <textarea
            value={value}
            onChange={(event) => setValue(event.target.value)}
            rows={2}
            className="w-5/6 resize-none outline-none border-none"
          />
          <button
            onClick={sendMessage}
            className="w-1/6 text-xl font-bold text-stone-100 hover:text-white bg-gradient-to-r from-cyan-500 to-blue-500 active:bg-violet-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>

  )
}

export default Chat;