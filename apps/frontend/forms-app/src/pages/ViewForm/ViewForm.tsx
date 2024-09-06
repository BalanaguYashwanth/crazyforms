import { useEffect, useState } from 'react';
import { Form } from "@quillforms/renderer-core";
import type { FormBlocks } from '@quillforms/types';
import { FormAnswersProp } from '../../common/types';
import { createOrUpdateQuestions, fetchQuestionsByFormId } from '../../common/api.service';
import './ViewForm.scss'

const ViewForm = () => {
    const [contentBlocks, setContentBlocks] = useState<FormBlocks>([])

    const matchQuestionWithAnswers = async (answers: FormAnswersProp) => {
        const questionWithAnswers = contentBlocks.map((block) => {
            if(block?.attributes && answers[block.id]){
                block.attributes.answer = answers[block.id]?.value;
            }
            return block
        })
        await createOrUpdateQuestions({ formId: 6, questions: questionWithAnswers });
    }

    const getQuestionByFormId = async () => {
        const promiseQuestions = await fetchQuestionsByFormId({ id: 6 });
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