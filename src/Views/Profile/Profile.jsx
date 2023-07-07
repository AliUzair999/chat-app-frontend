
import { useSelector, useDispatch } from 'react-redux'


export default function Profile() {
    const dispatch = useDispatch()
    const reduxState = useSelector((state) => state)
    console.log(reduxState)

    return <>
        <h1>
            This is Profile Page
        </h1>

    </>
}