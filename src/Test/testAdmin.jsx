import { Link } from "react-router-dom";
import TestUsers from "./testUsers";

const TestAdmin = () => {
    return(
        <div>
            <h1>Admin Page</h1>
            <br />
            <TestUsers/>
            <br />
            <div>
                <Link to='/testHome'></Link>
            </div>
        </div>
    );
};

export default TestAdmin;