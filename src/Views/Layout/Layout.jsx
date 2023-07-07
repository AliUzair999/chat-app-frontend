import { Link, Outlet } from "react-router-dom"




export default function Layout() {

    return <>
        {/* <div>
            <header>
                <h3> This is Header</h3>

                <nav>
                    <ul>
                        <li>
                            <Link to="/">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/signup">Signup</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/my-profile">Profile</Link>
                        </li>
                        <li>
                            <Link to="/nothing">Nothing</Link>
                        </li>
                    </ul>
                </nav>


            </header>
        </div> */}


        <div id="body">
            <Outlet />
        </div>

        {/* <div id="footer">
            <footer>
                <h3>This is Footer</h3>
            </footer>
        </div> */}
    </>
}