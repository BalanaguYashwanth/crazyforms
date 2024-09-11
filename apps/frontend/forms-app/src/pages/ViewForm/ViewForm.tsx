import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { decodeString } from '../../common/encodingDecoding';
import CustomTypeForm from '../../common/components/CustomTypeForm/CustomTypeForm';
import { FormAnswersProp, matchQuestionWithAnswersProps, QuestionBlockProps } from '../../common/types';
import { createAnswers, fetchByFormIdUserId, fetchFormById, fetchQuestionsByFormId } from '../../common/api.service';
import './ViewForm.scss'

const ViewForm = () => {
    const userId = 2;
    const { id } = useParams();
    const [formId, setFormId] = useState(0);
    const [contentBlocks, setContentBlocks] = useState([])
    const [loading, setLoading] = useState(false);

    const getByFormIdUserId = async (formId: number, userId: number) => {
        const dataPromise = await fetchByFormIdUserId({ formId, userId });
        const data = await dataPromise.json();
        return data.isExists;
    }

    const fetchFormDetails = async () => {
        const dataPromise = await fetchFormById(formId)
        const data = await dataPromise.json()
        return data[0].escrow.id;
    }

    const matchQuestionWithAnswers = async ({ answers, receiverAddress, escrowId }: matchQuestionWithAnswersProps) => {
        try {
            const questionWithAnswers = contentBlocks.map((block: QuestionBlockProps) => {
                if (block?.attributes && answers[block.id]) {
                    return {
                        answer: answers[block.id].value,
                        question: block.key,
                        form: formId,
                        user: userId,
                    }
                }
            })
            await createAnswers({ answers: questionWithAnswers, receiverAddress, escrowId });
        } catch {
            toast.error('Error in submitting, please try again')
        }
    }

    const handleSubmit = async (data: { answers: FormAnswersProp; }) => {
        try {
            const receiverAddress = window.prompt("Enter your wallet address") || '';
            const escrowId = await fetchFormDetails()
            if (data?.answers) {
                matchQuestionWithAnswers({ answers: data.answers, receiverAddress, escrowId })
                toast.success('successfully submitted')
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
        const isExists = await getByFormIdUserId(Number(formUID), userId)
        if (!isExists) {
            await fetchQuestions(formUID)
        } else {
            toast.success('Already submitted the form')
        }
        setLoading(false)
    }, [])

    useEffect(() => {
        if (id) {
            const formUID = decodeString(id)
            setFormId(Number(formUID))
            checkUserIsExists(formUID)
        }
    }, [checkUserIsExists, id])

    return (
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
                    <p>loading...</p>
            }
        </main>
    )
}

export default ViewForm;