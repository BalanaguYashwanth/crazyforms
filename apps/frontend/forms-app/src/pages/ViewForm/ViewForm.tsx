import { useEffect, useState } from 'react';
import { Form } from "@quillforms/renderer-core";
import type { FormBlocks } from '@quillforms/types';
import { fetchQuestionsByFormId } from '../../common/api.service';
import './ViewForm.scss'

const ViewForm = () => {

    const [ContentBlocks, setContentBlocks] = useState<FormBlocks>([])

    const getQuestionByFormId = async () => {
        const promiseQuestions = await fetchQuestionsByFormId({id: 6});
        const questions = await promiseQuestions.json();
        setContentBlocks(questions);
    }

    useEffect(()=>{
        getQuestionByFormId();
    }, [])

    return (
        <main className="view-form-container">
           { ContentBlocks.length > 0 ?  <Form
                applyLogic={false}
                formObj={{
                    blocks: ContentBlocks as FormBlocks,
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
                onSubmit={(data, { completeForm, setIsSubmitting }) => {
                    setTimeout(() => {
                        setIsSubmitting(false);
                        completeForm();
                    }, 500);
                }}
            />: <p>loading...</p>}
        </main>
    )
}

export default ViewForm;