import { Link } from "react-router-dom";

function NotFound() {

    return (

        <div
            className="d-flex flex-column align-items-center justify-content-center text-center"
            style={{ minHeight: "100vh" }}
        >

            <h1 className="display-4">404</h1>

            <p className="lead">
                Page not found.
            </p>

            <Link to="/dashboard" className="btn btn-primary mt-2">
                Back to Dashboard
            </Link>

        </div>

    );

}

export default NotFound;
