import { useState } from "react";
import type { FormBlocks } from '@quillforms/types';
import { Form } from "@quillforms/renderer-core";
import FormBuilder from "../../common/components/FormBuilder/FormBuilder";
// @ts-expect-error: Import not typed correctly
import { registerCoreBlocks } from "@quillforms/react-renderer-utils";
import { newContentBlockObject } from "../../common/constants";
import { handleChangeContentProps, handleRadioBoxProps } from "../../common/types";
import './Forms.scss'
import "@quillforms/renderer-core/build-style/style.css";
registerCoreBlocks()

const Forms = () => {
  const [blockIndex, setBlockIndex] = useState(0);

  const [contentBlock, setContentBlock] = useState([
    { ...newContentBlockObject },
  ]);

  const addContentBlock = () => {
    const newBlock = JSON.parse(JSON.stringify(newContentBlockObject))
    newBlock.blockKey = contentBlock.length;
    setContentBlock([...contentBlock, newBlock]);
    setBlockIndex(contentBlock.length)
  }

  const handleChangeContent = ({ contentIndex, text }: handleChangeContentProps) => {
    contentBlock[contentIndex].attributes.label = text;
    setContentBlock([...contentBlock]);
    setBlockIndex(contentIndex);
  }

  const handleRadioBox = ({ contentIndex, text }: handleRadioBoxProps) => {
    contentBlock[contentIndex].attributes.required = text;
    setContentBlock([...contentBlock]);
  }

  return (
    <main className="form-container">
      <section className="block">
        <FormBuilder
          addContentBlock={addContentBlock}
          contentBlock={contentBlock}
          handleChangeContent={handleChangeContent}
          handleRadioBox={handleRadioBox}
        />
      </section>
      <section className="block">
        <Form
          applyLogic={false}
          formObj={{
            blocks: [{ ...contentBlock[blockIndex] }] as FormBlocks,
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
        />
      </section>
    </main>
  )
}

export default Forms;