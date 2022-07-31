import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";
import Header from "./Header";

function ErrorPage(){
    return <div>404 Error!</div>
}

function App() {
    return (
        <div className="ui container">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<StreamList />} />
                    <Route path="/streams/new" element={<StreamCreate />} />
                    <Route path="/streams/edit" element={<StreamEdit />} />
                    <Route path="/streams/delete" element={<StreamDelete />} />
                    <Route path="/streams/show" element={<StreamShow />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;