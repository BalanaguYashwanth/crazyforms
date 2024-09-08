import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { decodeString } from '../../common/encodingDecoding';
import CustomTypeForm from '../../common/components/CustomTypeForm/CustomTypeForm';
import { FormAnswersProp, QuestionBlockProps } from '../../common/types';
import { createAnswers, fetchQuestionsByFormId } from '../../common/api.service';
import './ViewForm.scss'

const ViewForm = () => {
    const { id } = useParams();
    const [formId, setFormId] = useState(0);
    const userId = 2;
    const [contentBlocks, setContentBlocks] = useState([])

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
        if (id) {
            const promiseResponse = await fetchQuestionsByFormId({ id })
            const blocks = await promiseResponse.json();
            setContentBlocks(blocks);
        }
    }

    useEffect(() => {
        if (id) {
            const formUID = decodeString(id)
            setFormId(Number(formUID))
            fetchQuestions(formUID)
        }
    }, [id])

    return (
        <main className="view-form-container">
            {
                contentBlocks.length > 0 ?
                    <CustomTypeForm
                        blocks={contentBlocks}
                        handleSubmitExtraActions={handleSubmit}
                    />
                    :
                    <p>loading...</p>
            }
        </main>
    )
}

export default ViewForm;