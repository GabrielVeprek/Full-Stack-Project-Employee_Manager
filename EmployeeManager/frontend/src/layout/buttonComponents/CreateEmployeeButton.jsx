import {Link} from "react-router-dom";
export function CreateEmployeeButton() {
    return (
        <Link
            className="btn btn-outline-light border-light  bg-success shadow"
            to="/createEmployee"
            type="submit"
        >
            Create Employee
        </Link>
    )
}