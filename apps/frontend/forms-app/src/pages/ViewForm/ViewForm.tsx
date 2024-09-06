import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Form } from "@quillforms/renderer-core";
import type { FormBlocks } from '@quillforms/types';
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

    useEffect(() => {
        getQuestionByFormId();
    }, [])

    return (
        <main className="view-form-container">
            {contentBlocks.length > 0 ? <Form
                applyLogic={false}
                formObj={{
                    blocks: contentBlocks as FormBlocks,
                    settings: {
                        animationDirection: "vertical",
                        disableWheelSwiping: false,
                        disableNavigationArrows: false,
                        disableProgressBar: true
                    },
                    theme: {
                        font: "Roboto",
                        buttonsBgColor: "var(--clr-black)",
                        logo: {
                            src: ""
                        },
                        questionsColor: "#000",
                        answersColor: "#525151",
                        buttonsFontColor: "#fff",
                        buttonsBorderRadius: 25,
                        errorsFontColor: "#fff",
                        errorsBgColor: "#f00",
                        progressBarFillColor: "#000",
                        progressBarBgColor: "#ccc"
                    }
                }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onSubmit={(data: any, { completeForm, setIsSubmitting }) => {
                    if (data?.answers) {
                        matchQuestionWithAnswers(data.answers)
                    }
                    setTimeout(() => {
                        setIsSubmitting(false);
                        completeForm();
                    }, 500);
                }}
            /> : <p>loading...</p>}
        </main>
    )
}

export default ViewForm;