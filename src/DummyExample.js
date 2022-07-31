import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Outlet,
    useParams,
    useNavigate
} from "react-router-dom";


function Layout() {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link> |{" "}
                <Link to="invoices">Invoices</Link> |{" "}
                <Link to="dashboard">Dashboard</Link> |{" "}
                <Link to="profile">profile</Link>
            </nav>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}

function HomePage(){
    return <div><h1>Welcome To React Router World :)</h1></div>;
}

function ErrorPage(){
    return <div>Error !</div>;
}

function ProfilePage(){
    let navigate = useNavigate();
    let UserId = 10;
    return(
        <div>
            This is General Profile Page !
            
            <button onClick={()=>{navigate(`/profile/${UserId}`);}}>
                {"   "} Sam's Profile
            </button>
            <Link to={`${UserId}`}>{" ___ "} Sam's Profile</Link>
        </div>
    );
}

function UserProfilePage(){
    let navigate = useNavigate();
    let {id} = useParams();
    // navigate(-1) => same as hitting back button
    return(
        <div>
            Welcome {id} !!
            <button onClick={()=>{navigate(-1);}}>
                Back
            </button>
        </div>
    );
}

function Invoices() {
    return <h1>Invoices</h1>;
}

function Dashboard() {
    return <h1>Dashboard</h1>;
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="invoices" element={<Invoices />} />
                    <Route index element={ <HomePage /> } />
                    <Route path="dashboard" element={<Dashboard />} />

                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="profile/:id" element={<UserProfilePage />} />
                </Route>
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </Router>
    );
}

export default App;