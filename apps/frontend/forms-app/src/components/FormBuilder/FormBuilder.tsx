import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Integrations from '../Integrations/Integrations';
import StepFormEditor from '../StepFormEditor/StepFormEditor';
import CustomButton from '../CustomButton/CustomButton';
import { FormBuilderContextProvider } from '../../common/centralizeStore/FormBuilderContext/FormBuilderContext';
import { encodeNumber } from '../../common/encodingDecoding';
import { REDIRECTION_ROUTES } from '../../common/constants';
import './FormBuilder.scss'

//todo - refactoring by seperating components and react context
const FormBuilder = () => {
    const navigate = useNavigate()
    const [formId, setFormId] = useState(0);
    const [formTitle, setFormTitle] = useState('');

    const handleSetFormId = (id: number) => {
        setFormId(id)
    }

    const handleSetFormTitle = (text: string) => {
        setFormTitle(text);
    }

    const handlePublish = () => {
        const encodedURL = encodeNumber(Number(formId));
        navigate(`/${REDIRECTION_ROUTES.FORM}/${encodedURL}`,);
    }

    return (
        <main className="form-builder-container">
            <Toaster />
            <h1 className='align-self-center margin-top-spacing'>Form Builder</h1>
            <StepFormEditor handleSetFormId={handleSetFormId} handleSetFormTitle={handleSetFormTitle} />
            <hr className='m16' />
            <h1 className='align-self-center'>Integrations</h1>
            <FormBuilderContextProvider value={{ formId, formTitle }} >
                <Integrations />
            </FormBuilderContextProvider>
            {formId > 0 && <CustomButton handleSubmit={handlePublish} title='Publish' />}
        </main>
    )
}

export default FormBuilder;