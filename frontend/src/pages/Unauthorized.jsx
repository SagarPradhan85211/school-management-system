import { Link } from "react-router-dom";

function Unauthorized() {

    return (

        <div
            className="d-flex flex-column align-items-center justify-content-center text-center"
            style={{ minHeight: "100vh" }}
        >

            <h1 className="display-4 text-danger">403</h1>

            <p className="lead">
                You don't have permission to view this page.
            </p>

            <Link to="/dashboard" className="btn btn-primary mt-2">
                Back to Dashboard
            </Link>

        </div>

    );

}

export default Unauthorized;
