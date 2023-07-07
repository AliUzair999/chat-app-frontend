
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import axios from 'axios'
import { loginUser } from '../../Store/Slices/UserData'
import { useNavigate } from 'react-router-dom';


export default function RegisterAndLoginForm() {

  //making redux variables
  const dispatch = useDispatch()
  const reduxState = useSelector((state) => state)
  // console.log(reduxState)
  const navigate = useNavigate();


  //MAKING LOGIN AND SIGNUP DIFFERENT
  const [isLoginOrRegister, setIsLoginOrRegister] = useState("login")


  // making states for the input fields
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  })
  // console.log("daya:", data)

  const updateUserData = (key, value) => {
    setUserData({ ...userData, [key]: value })
  }


  // SUBMIT BUTTON FUNCTION
  async function handleSubmit(ev) {

    try {
      ev.preventDefault()
      // console.log("daya:", data)
      const url = isLoginOrRegister == "register" ? "http://localhost:5000/apis/user/register" : "http://localhost:5000/apis/user/login"
      // console.log("url >>>", url)
      const { data } = await axios.post(url, userData)
      // console.log(data)
      if (data.status === 500) {
        alert("no user found")
      }
      else if (data.status === 401) {
        alert("invalid credentials")
      }
      else if (data.status === 409) {
        alert(data.message)
      }
      else {
        const abc = { ...data.newUserRes, }
        abc.token = data.token
        // console.log(abc)
        dispatch(loginUser(abc))
      }
    }

    catch (err) {
      console.log(err)
    }

    //     // navigate('/chat');




    // const tokenCookie = document.cookie
    //     .split(';')
    //     .find(cookie => cookie.trim().startsWith('token='));

    // if (tokenCookie) {
    //     console.log('Token cookie found:', tokenCookie);
    // } else {
    //     console.log('Token cookie not found');
    // }

    // setLoggedInUsername(username);
    // setId(data.id);



    // if (res.data.status === 200) {
    //     console.log(res.data.message)
    //     console.log("res >>>", {...res.data.newUserRes, token: res.data.token})
    //     dispatch(loginUser({ ...res.data.loggedInUser, token: res.data.token }))
    //     // navigate('/chat');
    // }
    // else {
    //     console.log(res.data.message)
    // }

  }

  return (
    <div className="bg-blue-50 min-h-screen flex items-center justify-center">
      <form className="w-64 mx-auto p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="block w-full rounded-sm p-2 mb-4 border focus:outline-none focus:border-blue-500"
          value={userData.username}
          onChange={(e) => updateUserData("username", e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) => updateUserData("password", e.target.value)}
          className="block w-full rounded-sm p-2 mb-4 border focus:outline-none focus:border-blue-500"
        />

        <button className="bg-blue-500 block w-full text-white rounded-sm p-2" onClick={handleSubmit}>
          {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
        </button>

        <div className="text-center mt-2">
          {isLoginOrRegister === 'register' && (
            <div>
              Already a member?{' '}
              <button
                className="ml-2 text-blue-500 font-bold focus:outline-none"
                onClick={() => setIsLoginOrRegister('login')}
              >
                Login Here
              </button>
            </div>
          )}

          {isLoginOrRegister === 'login' && (
            <div>
              Don't have an account?{' '}
              <button
                className="ml-2 text-blue-500 font-bold focus:outline-none"
                onClick={() => setIsLoginOrRegister('register')}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </form>
    </div>




    // <div className="bg-blue-50 h-screen flex items-center  ">
    //     <form className='w-64 mx-auto mb-12'>

    //         <input
    //             type='text' placeholder='Username'
    //             className='block w-full rounded-sm p-2 mb-2 border'
    //             value={userData.username}
    //             onChange={(e) => updateUserData("username", e.target.value)}
    //         />

    //         <input type='password' placeholder='Password'
    //             value={userData.password}
    //             onChange={(e) => updateUserData("password", e.target.value)}
    //             className='block w-full rounded-sm p-2 mb-2 border'
    //         />

    //         <button className='bg-blue-500 block w-full text-white rounded-sm p-2' onClick={handleSubmit}>
    //             {isLoginOrRegister === 'register' ? "Register" : "Login"}
    //         </button>

    //         <div className='text-center mt-2'>
    //             {isLoginOrRegister === 'register' && (
    //                 <div>
    //                     Already a member?
    //                     <button
    //                         className='ml-2'
    //                         onClick={() => setIsLoginOrRegister('login')}
    //                     >
    //                         Login Here
    //                     </button>
    //                 </div>
    //             )}

    //             {isLoginOrRegister === 'login' && (
    //                 <div>
    //                     Don't have an account?
    //                     <button
    //                         className='ml-2'
    //                         onClick={() => setIsLoginOrRegister('register')}
    //                     >
    //                         Register
    //                     </button>
    //                 </div>
    //             )}


    //         </div>
    //     </form>

    // </div>

  )

}




{/* <form className="w-64 mx-auto mb-12">
<input value={data.username}
    onChange={ev => updateData("username", ev.target.value)}
    type="text" placeholder="username"
    className="block w-full rounded-sm p-2 mb-2 border" />
<input value={password}
    onChange={ev => updateData("username", ev.target.value)}
    type="password"
    placeholder="password"
    className="block w-full rounded-sm p-2 mb-2 border" />
<button className="bg-blue-500 text-white block w-full rounded-sm p-2">
    {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
</button>
<div className="text-center mt-2">
    {isLoginOrRegister === 'register' && (
        <div>
            Already a member?
            <button className="ml-1" onClick={() => setIsLoginOrRegister('login')}>
                Login here
            </button>
        </div>
    )}
    {isLoginOrRegister === 'login' && (
        <div>
            Dont have an account?
            <button className="ml-1" onClick={() => setIsLoginOrRegister('register')}>
                Register
            </button>
        </div>
    )}
</div>
</form> */}











