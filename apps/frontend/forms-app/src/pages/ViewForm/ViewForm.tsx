import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import toast, { Toaster } from 'react-hot-toast';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import CustomTypeForm from '../../components/CustomTypeForm/CustomTypeForm';
import { decodeString } from '../../common/encodingDecoding';
import { FormAnswersProp, matchQuestionWithAnswersProps, ObjectProps, QuestionBlockProps } from '../../common/types';
import { createAnswers, createUser, fetchByFormIdUserId, fetchFormById, fetchQuestionsByFormId } from '../../common/api.service';
import './ViewForm.scss'

const ViewForm = () => {
    const { id } = useParams();
    const [formId, setFormId] = useState(0);
    const [contentBlocks, setContentBlocks] = useState([])
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<ObjectProps>({});

    const getByFormIdUserId = async (formId: number, userId: number) => {
        const dataPromise = await fetchByFormIdUserId({ formId, userId });
        const data = await dataPromise.json();
        return data.isExists;
    }

    const fetchFormDetails = async () => {
        const dataPromise = await fetchFormById(formId)
        const data = await dataPromise.json()
        return { escrowId: data[0]?.escrow?.escrowId, chainType: data[0]?.escrow?.type };
    }

    const matchQuestionWithAnswers = async ({ answers }: matchQuestionWithAnswersProps) => {
        try {
            const questionWithAnswers = contentBlocks.map((block: QuestionBlockProps) => {
                if (block?.attributes && answers[block.id]) {
                    return {
                        answer: answers[block.id].value,
                        question: block.key,
                        form: formId,
                        user: Number(user.userId),
                    }
                }
            })
            return questionWithAnswers;
        } catch {
            toast.error('Error in submitting, please try again')
        }
    }

    const handleSubmit = async (data: { answers: FormAnswersProp; }) => {
        try {
            const { escrowId, chainType } = await fetchFormDetails()
            let receiverAddress = null;
            if (chainType && escrowId) {
                receiverAddress = window.prompt(`To receieve rewards - Enter your ${chainType} wallet address`) || '';
            }
            if (data?.answers) {
                toast.loading('Loading');
                const answers = await matchQuestionWithAnswers({ answers: data.answers })
                await createAnswers({ answers, receiverAddress, escrowId, chainType });
                toast.dismiss();
                toast.success((escrowId && receiverAddress) ? 'Successfully recieved rewards, please check your wallet' : 'Successfully Submitted')
            } else {
                toast.error('Must fill all answers')
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.success(`Error occured ${error.message} please try again`)
            }
        }
    }

    const fetchQuestions = async (id: number) => {
        try {
            if (id) {
                setLoading(true)
                const promiseResponse = await fetchQuestionsByFormId({ id })
                const blocks = await promiseResponse.json();
                setContentBlocks(blocks);
                setLoading(false)
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(`An error occured ${error?.message}`);
            }
        }
    }

    const checkUserIsExists = useCallback(async (formUID: number) => {
        setLoading(true)
        const isExists = await getByFormIdUserId(Number(formUID), Number(user.userId))
        if (!isExists) {
            await fetchQuestions(formUID)
        } else {
            toast.success('Already submitted the form')
        }
        setLoading(false)
    }, [user.userId])

    const handleSuccessLogin = async (credentialResponse: CredentialResponse) => {
        const decoded = jwtDecode(credentialResponse?.credential || 'undefined');
        const { email, given_name } = decoded as { given_name: string, email: string, picture: string };
        const promise = await createUser({
            name: given_name,
            email,
            gender: 'F',
            age: '35',
        });
        const data = await promise.json()
        setUser({ userId: data?.id })
        localStorage.setItem('user', JSON.stringify({ ...data }))
    }

    const handleErrorLogin = () => {
        alert('failed to login')
    }

    useEffect(() => {
        if (id && user?.userId) {
            const formUID = decodeString(id)
            setFormId(Number(formUID))
            checkUserIsExists(formUID)
        }
    }, [checkUserIsExists, id, user?.userId])

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('user') && (JSON.parse(localStorage.getItem('user') || '')?.id))) {
            setUser({ userId: (JSON.parse(localStorage.getItem('user') || '')?.id) })
        }
    }, [])

    return user.userId ? (
        <main className="view-form-container">
            <Toaster />
            {
                !loading ? contentBlocks.length > 0 ?
                    <CustomTypeForm
                        blocks={contentBlocks}
                        handleSubmitExtraActions={handleSubmit}
                    />
                    :
                    <p className='center'>Form is either submitted or not found</p>
                    :
                    <p>Loading...</p>
            }
        </main>
    ) : (
        <main className='center'>
            <p className='m5'> To continue to fill form - Zk Login</p>
            <GoogleLogin
                onSuccess={handleSuccessLogin}
                onError={handleErrorLogin}
                text="continue_with"
                shape="square"
            />
        </main>
    )
}

export default ViewForm;