import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';
import { encodeNumber } from "../../common/encodingDecoding";
import CustomButton from "../../components/CustomButton/CustomButton";
import { ObjectProps } from "../../common/types";
import { REDIRECTION_ROUTES } from "../../common/constants";
import { fetchFormByUserId } from "../../common/api.service";
import './Forms.scss'

const Forms = () => {
    const navigate = useNavigate();
    const [forms, setForms] = useState([]);

    const getForms = async (userId: number) => {
        toast.loading('Fetching...')
        const dataPromise = await fetchFormByUserId(userId);
        const data = await dataPromise.json();
        setForms(data);
        toast.dismiss();
    }

    const handleSubmit = () => {
        navigate('/'+REDIRECTION_ROUTES.EDIT_FORM)
    }

    const handleEdit = () => {
        alert('This feature is coming soon')
    }
    
    const handleResponses = (id: number) => {
        navigate(`/responses/${id}`)
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if(user?.id){
            getForms(user?.id)
        }else{
            console.log('hello')
            navigate(REDIRECTION_ROUTES.HOME);
        }
    }, [navigate])

    return (
        <main className="forms-container">
            <Toaster />
            <div className="forms-header">
                <h1></h1>
                <h2 className="text-center">Forms</h2>
                <CustomButton title="Add form" handleSubmit={handleSubmit} />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>FormId</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Created At</th>
                        <th>Actions</th>
                        <th>URL</th>
                    </tr>
                </thead>
                {
                    forms.length ? forms.map((form: ObjectProps, index) => (
                        <tbody key={`form-${index}`}>
                            <td> {form.id} </td>
                            <td> {form.title} </td>
                            <td> {form?.description ? form?.description : '-'} </td>
                            <td> {form.createdAt} </td>
                            <td className="spacing-between-buttons">
                                <CustomButton title="Edit" handleSubmit={handleEdit}/>
                                <CustomButton title="Responses" handleSubmit={()=>handleResponses(Number(form.id))}/>
                            </td>
                            <td> <Link to={`/${REDIRECTION_ROUTES.FORM}/${encodeNumber(Number(form.id))}`} target="_blank">Link</Link></td>
                        </tbody>
                    )) : <p className="center">No forms found</p>
                }
            </table>
        </main>
    )
}

export default Forms;