import { useState } from "react";
import type { FormBlocks } from '@quillforms/types';
import { Form } from "@quillforms/renderer-core";
import "@quillforms/renderer-core/build-style/style.css";
// @ts-expect-error: Import not typed correctly
import { registerCoreBlocks } from "@quillforms/react-renderer-utils";
import FormBuilder from "../FormBuilder/FormBuilder";
import './Forms.scss'
import { handleChangeContentProps } from "../../common/types";
registerCoreBlocks()

const Forms = () => {
  const [blockIndex, setBlockIndex] = useState(0);

  const newContentBlockObject = {
    blockKey: 0,
    name: "short-text",
    id: "kd12edg",
    attributes: {
      required: false,
      label: 'Untitled text'
    }
  }

  const [contentBlock, setContentBlock] = useState([
    { ...newContentBlockObject },
  ]);

  const addContentBlock = () => {
    const newBlock = JSON.parse(JSON.stringify(newContentBlockObject))
    newBlock.blockKey = contentBlock.length;
    setContentBlock([...contentBlock, newBlock]);
  }

  const handleChangeContent = ({ contentIndex, text }: handleChangeContentProps) => {
    console.log('contentIndex--->', contentIndex, 'text--->', text, 'contentBlock--->', contentBlock)
    contentBlock[contentIndex].attributes.label = text;
    console.log('0th contentBlock-->', contentBlock[0].attributes.label, '1st contentBlock---->', contentBlock[1].attributes.label)
    setContentBlock([...contentBlock]);
    setBlockIndex(contentIndex);
  }

  return (
    <main className="form-container">
      <section className="block">
        <FormBuilder
          addContentBlock={addContentBlock}
          contentBlock={contentBlock}
          handleChangeContent={handleChangeContent}
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
              disableProgressBar: false
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
            console.log('submitted data--->', data);
          }}
        />
      </section>
    </main>
  )
}

export default Forms;