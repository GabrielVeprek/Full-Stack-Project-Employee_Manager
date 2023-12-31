import {EmployeePersonalInfos} from "../../employee/view/component/EmployeePersonalInfos.jsx"
import {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom"
import {deleteAuthenticatedResult, getAuthenticatedResult} from "../../utils/getToken.js"
import {ConfirmDeleteButton} from "../../buttonComponent/ConfirmDeleteButton.jsx"
import {ButtonCancel} from "./component/ButtonCancel.jsx"
import {employeeURL} from "../../URLs/EmployeeStatsURL.js"
import {DefaultMask} from "../../component/DefaultMask.jsx";

export function DeletePage() {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        firstName: "",
        lastName: "",
        mail: "",
        entryDate: "",
        position: "",
        salary: 0,
        holiday: {amount: 0, nextHoliday: ""},
        task: "",
        overtime: 0,
    })

    const {id} = useParams()

    useEffect(() => {
        loadEmployee()
    }, [])

    const deleteEmployee = async () => {
        await deleteAuthenticatedResult(`${employeeURL}/${employee.id}`)
        navigate("/")
    }

    const loadEmployee = async () => {
        const result = await getAuthenticatedResult(`${employeeURL}/${id}`)
        setEmployee(result.data)
    }
    return (
        <DefaultMask>
            <h4 className="text-primary"> Confirm delete of Employee : </h4>
            <EmployeePersonalInfos employee={employee}/>
            <ConfirmDeleteButton deleteEmployee={deleteEmployee}/>
            <ButtonCancel/>
        </DefaultMask>
    )
}