import {Link} from "react-router-dom";

export function JuniorEmployee({id, slicedID, firstName, lastName}) {
    return (
        <>
            <b>Junior Employee : </b>
            <Link to={`/viewEmployee/${id}`}>
                {"ID  " +
                    slicedID}
            </Link>
            {", " +
                firstName +
                " " +
                lastName}
        </>
    )
}