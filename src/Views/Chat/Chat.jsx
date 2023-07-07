
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Avatar from '../../Components/Avatar/Avatar'
import Logo from '../../Components/Logo/Logo'
import { changeSelectedUser, logoutUser } from '../../Store/Slices/UserData'


export default function Chat() {
    const dispatch = useDispatch()
    const reduxState = useSelector((state) => state)
    const reduxUser = useSelector((state) => state.UserReducer.username)
    const reduxUserId = reduxState.UserReducer._id
    // console.log(reduxState)

    //SELECTING THE PERSON/CONTACT
    // const [selectedUserId, setSelectedUserId] = useState(null)

    const selectedUserId = useSelector(state => state.UserReducer.selectedUserId)
    // console.log("selectedUserId>>>", selectedUserId)


    // WEB SOCKET CONNECTION CODE
    const [ws, setWs] = useState(null)
    useEffect(() => {
        async function getAllUsers() {
            const res = await axios.get('http://localhost:5000/apis/user/getUsers')
            setAllUsers(res.data.allUsers)
            // console.log(res)
        }
        getAllUsers()
        connectToWS()


    }, [])

    function connectToWS() {

        const ws = new WebSocket('ws://localhost:5000')
        setWs(ws)
        ws.addEventListener('message', handleMessage)
        ws.addEventListener('close', () => {
            setTimeout(() => {
                console.log("disconnected, trying to reconnect.")
                connectToWS()
            }, 1000)
        })

    }



    function handleMessage(ev) {
        const messageData = JSON.parse(ev.data);
        console.log({ messageData });
        // console.log("message received")
        if ("text" in messageData) {
            // console.log("selectedUserId<<<", selectedUserId)
            // console.log(messageData.sender)
            setMessages(prev => [...prev, { ...messageData }])
        }





        // if ('online' in messageData) {
        //     showOnlinePeople(messageData.online);
        // } 
        // if ('text' in messageData) {
        //     if (messageData.sender === selectedUserId) {
        //         setMessages(prev => ([...prev, { ...messageData }]));
        //     }
        // }

    }



    //ALL USERS DATA 
    const [allUsers, setAllUsers] = useState([])
    // console.log(allUsers)
    let myUser
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].username === reduxState.UserReducer.username) {
            myUser = i
        }
    }

    const allUsersExceptMe = [...allUsers]
    allUsersExceptMe.splice(myUser, 1)






    // SENDING THE MESSAGE
    const [newMessageText, setNewMessageText] = useState("")
    const [messages, setMessages] = useState([])
    // console.log(messages)

    function sendMessage(ev) {
        ev.preventDefault()
        // console.log("send")
        ws.send(JSON.stringify({
            recipient: selectedUserId,
            text: newMessageText
        }))
        setNewMessageText("")
        setMessages(prev => ([...prev, {
            text: newMessageText,
            sender: reduxUserId,
            recipient: selectedUserId,
        }]))

    }


    //AUTO SCROLL MESSAGES
    const divUnderMessages = useRef()

    useEffect(() => {
        const div = divUnderMessages.current
        if (div) {
            div.scrollIntoView({ behavior: "smooth", block: "end" })
        }
    }, [messages])



    // FETCH PREVIOUS MESSAGES

    useEffect(() => {
        if (selectedUserId) {
            axios.get('http://localhost:5000/apis/message/' + selectedUserId).then(res => {
                // console.log(res)
                setMessages(res.data)
            })
        }
    }, [selectedUserId])


    // LOGOUT FUNCTION

    async function logout() {
        await axios.get('http://localhost:5000/apis/user/logout')
        setWs(null)
        dispatch(logoutUser())
        // console.log("axios working")
        // console.log("logged")
    }


    return (

        <div className='flex h-screen '>

            <div className='bg-white w-1/4 flex flex-col'  >

                <div className='flex flex-grow flex-col'>
                    <Logo />
                    {allUsersExceptMe.map((value, index) => {

                        return (
                            <div
                                onClick={() => dispatch(changeSelectedUser(value._id))}
                                key={index}
                                className={'border-b border-gray-200 flex gap-2 items-center cursor-pointer ' + (value._id === selectedUserId ? "bg-blue-50" : "")}
                            >
                                {selectedUserId === value._id && (
                                    <div className='w-1 bg-blue-500 h-12 rounded-r-md'> </div>
                                )}
                                <div className={'flex py-2 pl-5 gap-2 items-center ' + (selectedUserId !== value._id ? "pl-8" : "")}>
                                    <Avatar username={value.username} userIndex={index + 6} />
                                    <span className='text-gray-800'>
                                        {value.username}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className='flex justify-center mb-2 items-center '>
                    <svg className='h-6 w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                    {reduxUser.slice(0, 1).toUpperCase() + reduxUser.slice(1)}

                    <button className='ml-3 bg-gray-500 py-1 px-2 rounded-md border' onClick={logout}>
                        Logout
                    </button>

                </div>



            </div>



            <div className='bg-blue-50 w-3/4 p-2 flex flex-col '>
                <div
                    className='flex-grow'
                >
                    {!selectedUserId && (
                        <div className='flex h-full items-center justify-center text-gray-400'> &larr; Select the person to sart chat</div>
                    )}
                    <div className='relative h-full'>
                        <div className='overflow-y-scroll absolute top-0 left-0 right-0 bottom-2'>
                            {messages.map((message, ind) => (
                                <div key={ind} className={"pr-3 " + (message.sender === reduxUserId ? 'text-right' : 'text-left')}>
                                    <div className={"text-left inline-block p-2 my-2 rounded-md text-sm " + (message.sender === reduxUserId ? 'bg-blue-500 text-white' : 'bg-white text-gray-500')}>
                                        {message.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={divUnderMessages}></div>
                        </div>
                    </div>
                </div>
                {selectedUserId && (

                    <form className='flex gap-2 ' onSubmit={sendMessage} >
                        <input
                            value={newMessageText}
                            onChange={(ev) => setNewMessageText(ev.target.value)}
                            type="text"
                            className='bg-white border p-2 flex-grow rounded-sm  '
                            placeholder='Type your message here '
                        />
                        <button type='submit' className='bg-blue-500 p-2 text-white rounded-sm'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>

                        </button>
                    </form>
                )}

            </div>

        </div>
    )
}