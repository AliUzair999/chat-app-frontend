
import { useSelector, useDispatch } from 'react-redux'

import {logoutUser, loginUser} from '../../Store/Slices/UserData'

export default function Dashboard() {
    const dispatch = useDispatch()
    const reduxState = useSelector((state) => state)
    console.log(reduxState)

    return <>
        <h1>
            This is Dashboard Page
        </h1>

        <button onClick={() => dispatch(loginUser())}>
            Login User State
        </button>

        <button onClick={() => dispatch(logoutUser())}>
            Log Out User State
        </button>

    </>
}