import { Toaster } from 'react-hot-toast';
import Integrations from '../Integrations/Integrations';
import StepFormEditor from '../StepFormEditor/StepFormEditor';
import './FormBuilder.scss'

//todo - refactoring by seperating components and react context
const FormBuilder = () => {

    return (
        <main className="form-builder-container">
            <Toaster />
            <h1 className='align-self-center'>Form Builder</h1>
            <StepFormEditor />
            <hr className='m16' />
            <h1 className='align-self-center'>Integrations</h1>
            <Integrations />
        </main>
    )
}

export default FormBuilder;