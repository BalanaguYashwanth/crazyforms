import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { decodeString } from '../../common/encodingDecoding';
import CustomTypeForm from '../../common/components/CustomTypeForm/CustomTypeForm';
import { FormAnswersProp, QuestionBlockProps } from '../../common/types';
import { createAnswers, fetchByFormIdUserId, fetchQuestionsByFormId } from '../../common/api.service';
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

    const matchQuestionWithAnswers = async (answers: FormAnswersProp) => {
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
            await createAnswers(questionWithAnswers);
        } catch {
            toast.error('Error in submitting, please try again')
        }
    }

    const handleSubmit = (data: { answers: FormAnswersProp; }) => {
        if (data?.answers) {
            matchQuestionWithAnswers(data.answers)
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