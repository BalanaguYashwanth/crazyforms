import { useEffect, useState } from "react";
import { fetchForms } from "../../common/api.service";
import { ObjectProps } from "../../common/types";
import './Forms.scss'

const Forms = () => {
    const [forms, setForms] = useState([]);

    const getForms = async () => {
        const dataPromise = await fetchForms();
        const data = await dataPromise.json();
        setForms(data);
    }

    useEffect(() => {
        getForms()
    }, [])

    return (
        <main className="forms-container">
            <h2 className="m16">Forms</h2>
            <table>
                <thead>
                    <tr>
                        <th>FormId</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Escrow</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                {
                    forms.map((form: ObjectProps, index) => (
                        <tbody key={`form-${index}`}>
                            <td> {form.id} </td>
                            <td> {form.title} </td>
                            <td> {form.description} </td>
                            <td> {'-'} </td>
                            <td> {form.createdAt} </td>
                        </tbody>
                    ))
                }
            </table>
        </main>
    )
}

export default Forms;