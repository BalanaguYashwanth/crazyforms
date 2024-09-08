import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CustomTypeForm from '../../common/components/CustomTypeForm/CustomTypeForm';
import { FormAnswersProp, QuestionBlockProps } from '../../common/types';
import { createAnswers, fetchQuestionsByFormId } from '../../common/api.service';
import './ViewForm.scss'

const ViewForm = () => {
    const formId = 6;
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

    const getQuestionByFormId = async () => {
        const promiseQuestions = await fetchQuestionsByFormId({ id: formId });
        const questions = await promiseQuestions.json();
        setContentBlocks(questions);
    }

    const handleSubmit = (data: { answers: FormAnswersProp; }) => {
        if (data?.answers) {
            matchQuestionWithAnswers(data.answers)
        }
    }

    useEffect(() => {
        getQuestionByFormId();
    }, [])

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