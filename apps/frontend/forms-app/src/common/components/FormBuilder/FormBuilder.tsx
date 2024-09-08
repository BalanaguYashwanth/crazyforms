import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Integrations from '../Integrations/Integrations';
import StepFormEditor from '../StepFormEditor/StepFormEditor';
import './FormBuilder.scss'

//todo - refactoring by seperating components and react context
const FormBuilder = () => {
    const [formId, setFormId] = useState(0);
    const [formTitle, setFormTitle] = useState('');

    const handleSetFormId = (id: number) => {
        setFormId(id)
    }

    const handleSetFormTitle = (text: string) => {
        setFormTitle(text);
    }

    return (
        <main className="form-builder-container">
            <Toaster />
            <h1 className='align-self-center margin-top-spacing'>Form Builder</h1>
            <StepFormEditor handleSetFormId={handleSetFormId} handleSetFormTitle={handleSetFormTitle}/>
            <hr className='m16' />
            <h1 className='align-self-center'>Integrations</h1>
            <Integrations formId={formId} formTitle={formTitle} />
        </main>
    )
}

export default FormBuilder;