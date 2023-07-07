
import { useSelector, useDispatch } from 'react-redux'


export default function Nothing() {
    const dispatch = useDispatch()
    const reduxState = useSelector((state) => state)
    console.log(reduxState)

    return <>
        <h1>
            This is Nothing Page
        </h1>

    </>
}