import React, { useEffect, useState } from 'react';
import { customAlphabet } from 'nanoid';
import Header from './Header';
import { useSelector } from 'react-redux';
import InputPopUpForm from './InputPopUpForm';
import {
    getDocumentFromFireStore,
    getMultipleDocsFromFirestore,
    getChatsFromFireStore,
    isUsernameExist,
    updateDocField,
    sendMessage,
    chatListener,
} from '../services/firebaseService';
import ChatShimmer from './ChatShimmer';
import { formatTimestamp } from '../services/timeConvertors';

function Chat() {
    const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmonpqrstuvwxyz0123456789', 20);
    const [friendList, setFriendList] = useState([]); // [{uid,username,status,imgurl}]
    const [messages, setMessages] = useState(null); // {message,time,senderId}
    const [chatUser, setChatUser] = useState(null); // {uid,username,status,imgurl}
    const [addFriendPopUp, setAddFriendPopUp] = useState(false);
    const [loading, setLoading] = useState(true);
    const [chatLoading, setChatLoading] = useState(false);
    const userData = useSelector((state) => state.auth.userData); // {uid,username,email}
    const [myImgUrl, setMyImgUrl] = useState(null);


    useEffect(() => {
        async function getFriends() {
            setLoading(true);
            const { chatfriends, pic } = await getDocumentFromFireStore('users', userData.uid);
            setMyImgUrl(pic);
            const friends = await getMultipleDocsFromFirestore('users', chatfriends);
            setFriendList(friends);
            setLoading(false);
        }
        getFriends();
    }, []);

    const loadChat = (messageArr) => {
        messageArr.sort((a, b) => a.time - b.time);
        setMessages(messageArr);
        setChatLoading(false);
    };

    useEffect(() => {
        if (chatUser) {
            const senderRoom = userData.uid + chatUser.uid;
            chatListener(senderRoom, loadChat);
        }
    }, [JSON.stringify(chatUser)]);

    const closePopUp = () => {
        setAddFriendPopUp(false);
    };

    const isPresent = (oldFriendList, user) => {
        let isExist = false;
        oldFriendList.forEach((ele) => {
            isExist = isExist || ele.uid == user.uid;
        });
        return isExist;
    };

    const sendMeggase = async (e) => {
        if (e.key && (e.key !== 'Enter' && e.keyCode !== 13)) return;
        const inputBox = document.getElementById('message');
        const message = inputBox.value;
        inputBox.value = '';
        if (message) {
            const id = nanoid();
            const chatObj = {
                message,
                time: Date.now(),
                senderId: userData.uid,
            };
            const senderRoom = userData.uid + chatUser.uid;
            const receiverRoom = chatUser.uid + userData.uid;
            await sendMessage(senderRoom, id, chatObj);
            await sendMessage(receiverRoom, id, chatObj);
        }
    };

    const addFriend = async (username) => {
        try {
            if (username === userData.username) {
                throw new Error(`You can not add your username.`);
            }
            const user = await isUsernameExist(username);
            if (user?.uid) {
                if (!isPresent(friendList, user)) {
                    const newFriendUidList = friendList.map((ele) => ele.uid);
                    newFriendUidList.push(user.uid);
                    user.chatfriends?.push(userData.uid);
                    await updateDocField('users', userData.uid, { chatfriends: newFriendUidList });
                    await updateDocField('users', user.uid, { chatfriends: user.chatfriends });
                    user.chatfriends = null;
                    let newFriendList = [...friendList];
                    newFriendList.push(user);
                    setFriendList(newFriendList);
                }
                setAddFriendPopUp(false);
            } else {
                throw new Error(`Username ${username} does not exist.`);
            }
        } catch (err) {
            throw err;
        }
    };

    const openChat = async (user) => {
        try {
            setMessages(null);
            setChatLoading(true);
            // setChatLoading(false);
            setChatUser(user);
        } catch (err) {}
    };

    return (
        <div className='h-screen flex flex-col'>
            <Header />
            <div className='h-screen p-10 text-white flex items-center justify-center lg:hidden'>
                <p className='text-lg'>
                    This feature is not compatible with small screens. Download our Android app for a seamless
                    experience.{' '}
                    <a
                        className='text-blue cursor-pointer'
                        href='https://play.google.com/store/apps/details?id=com.parsanatech.crazycoder&hl=en&gl=US'
                    >
                        Click Here
                    </a>
                </p>
            </div>

            {loading && (
                < div className='hidden lg:block'>
                    <ChatShimmer loading={loading} chatLoading={chatLoading} />
                </div>
            )}
            {!loading && (
                <div className='hidden lg:grow lg:flex overflow-hidden'>
                    <div className='w-1/4 h-full flex flex-col overflow-hidden bg-bgcolor'>
                        {/* <!-- Sidebar Header --> */}
                        <header className='p-4 flex bg-bgl mx-3 rounded-md justify-between items-center text-white'>
                            <h1 className='text-2xl font-semibold'>Chat Section</h1>
                            <div className='relative'>
                                <button
                                    id='menuButton'
                                    className='focus:outline-none '
                                    onClick={() => {
                                        setAddFriendPopUp(true);
                                    }}
                                >
                                    <img className='h-8' src='./add-user.svg' />
                                </button>
                            </div>
                        </header>

                        {/* <!-- Contact List --> */}
                        <div className='overflow-y-auto p-4 h-full'>
                            {friendList?.map((user, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center mb-4 ${
                                        user.username == chatUser?.username ? 'bg-blue' : 'bg-bgl'
                                    } cursor-pointer hover:bg-blue p-2 rounded-md`}
                                    onClick={() => {
                                        openChat(user);
                                    }}
                                >
                                    <div className='w-12 h-12 bg-gray-300 rounded-full mr-3'>
                                        <img
                                            src={user.imgurl ?? './user.svg'}
                                            alt='User Avatar'
                                            className='w-12 h-12 rounded-full'
                                        />
                                    </div>
                                    <div className='flex-1'>
                                        <h2 className='text-lg text-white font-semibold'>{user.username}</h2>
                                        <p className={`${user.status ? 'text-green' : 'text-ywhite'} text-xs`}>
                                            {user.status ? 'Online' : 'Offline'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {!friendList?.length && (
                                <div className='h-full flex flex-col bg-bgl rounded-md justify-center items-center'>
                                    <p className='text-white text-2xl'>Start Chat with friends.</p>
                                    <p className='text-white text-md'>Add your friends by crazyCoder username.</p>
                                </div>
                            )}
                        </div>
                    </div>
                    {chatLoading && <ChatShimmer loading={loading} chatLoading={chatLoading} />}
                    {chatUser && messages && (
                        <div className='w-3/4 flex flex-col'>
                            {/* <!-- Chat Header --> */}
                            <div className='bg-bgl p-4 grow-0 text-white flex items-center rounded-md mb-4 mr-4'>
                                <img
                                    src={chatUser.imgurl ?? './user.svg'}
                                    alt='User Avatar'
                                    className='w-12 h-12 rounded-full'
                                />
                                <div className='mx-4'>
                                    <h1 className='text-2xl font-semibold mb-2'>{chatUser.username}</h1>
                                    <p className={`${chatUser.status ? 'text-green' : 'text-ywhite'} text-xs`}>
                                        {chatUser.status ? 'Online' : 'Offline'}
                                    </p>{' '}
                                </div>
                            </div>
                            {/* <!-- Chat Messages --> */}
                            <div id='chatContainer' className='grow bg-bgl overflow-y-auto p-4 rounded-md mr-4'>
                                {messages?.map((message, index) => {
                                    return message.senderId == userData.uid ? (
                                        <div key={index} className='flex mb-4 cursor-pointer justify-end'>
                                            <div className='flex items-center max-w-96 bg-bgcolor rounded-lg p-3 gap-3 mr-2'>
                                                <p className='text-white'>{message.message}</p>
                                            </div>
                                            <div className='w-9 h-9 rounded-full flex items-center justify-center'>
                                                <img
                                                    src={`${myImgUrl ?? './user.svg'}`}
                                                    alt='User Avatar'
                                                    className='w-8 h-8 rounded-full'
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div key={index} className='flex mb-4 cursor-pointer'>
                                            <div className='w-9 h-9 rounded-full flex items-center justify-center mr-2'>
                                                <img
                                                    src={`${chatUser.imgurl ?? './user.svg'}`}
                                                    alt='User Avatar'
                                                    className='w-8 h-8 rounded-full'
                                                />
                                            </div>
                                            <div className='flex max-w-96 bg-blue rounded-lg p-3 gap-3'>
                                                <p className='text-white'>{message.message}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {/* <!-- Chat Input --> */}
                            <div className='py-4 mr-4'>
                                <div className='flex items-center'>
                                    <input
                                        id='message'
                                        type='text'
                                        autoComplete='off'
                                        placeholder='Type a message...'
                                        className='bg-bgl text-white text-lg w-full px-3 py-2 rounded-md mr-2'
                                        onKeyUp={sendMeggase}
                                    />
                                    <img className='h-6 cursor-pointer' src='./send.svg' onClick={sendMeggase} />
                                </div>
                            </div>
                        </div>
                    )}

                    {addFriendPopUp && (
                        <div className='w-2/3 flex flex-col'>
                            <InputPopUpForm
                                title={"Enter your friend's CrazyCoder username"}
                                element={{ label: 'CrazyCoder Username', placeholder: ' ', field: 'username' }}
                                optionManu={false}
                                btnClick={addFriend}
                                closeBtn={closePopUp}
                                showCloseBtn={true}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Chat;
