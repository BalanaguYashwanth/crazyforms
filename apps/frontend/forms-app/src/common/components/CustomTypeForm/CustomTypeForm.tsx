import { Form } from "@quillforms/renderer-core";
import type { FormBlocks } from '@quillforms/types';
import { CustomTypeFormProps } from "../../types";
import logo from '../../../assets/logo.png'

const CustomTypeForm = ({ blocks, disableNavigationArrows = false, handleSubmitExtraActions }: CustomTypeFormProps) => {
    return (
        <Form
            applyLogic={false}
            formObj={{
                blocks: blocks as FormBlocks,
                settings: {
                    animationDirection: "vertical",
                    disableWheelSwiping: false,
                    disableNavigationArrows,
                    disableProgressBar: true,
                },
                theme: {
                    font: "Roboto",
                    buttonsBgColor: "var(--clr-black)",
                    logo: {
                        src: logo
                    },
                    questionsColor: "#000",
                    answersColor: "#525151",
                    buttonsFontColor: "#fff",
                    buttonsBorderRadius: 25,
                    errorsFontColor: "#fff",
                    errorsBgColor: "#f00",
                    progressBarFillColor: "#000",
                    progressBarBgColor: "#ccc",
                }
            }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onSubmit={(data: any, { completeForm, setIsSubmitting }) => {
                if(handleSubmitExtraActions){
                    handleSubmitExtraActions(data)
                }
                setTimeout(() => {
                    setIsSubmitting(false);
                    completeForm();
                }, 500);
            }}
        />
    )
}

export default CustomTypeForm;