import { useState } from "react";
// @ts-expect-error: Import not typed correctly
import { registerCoreBlocks } from "@quillforms/react-renderer-utils";
import { newContentBlockObject } from "../../common/constants";
import { handleChangeContentProps, handleRadioBoxProps } from "../../common/types";
import { FormBuilderContextProvider } from "../../common/centralizeStore/FormBuilderContext/FormBuilderContext";
import FormBuilder from "../../components/FormBuilder/FormBuilder";
import CustomTypeForm from "../../components/CustomTypeForm/CustomTypeForm";
import './EditForm.scss'
import "@quillforms/renderer-core/build-style/style.css";
registerCoreBlocks()

const EditForm = () => {
  const newBlock = JSON.parse(JSON.stringify(newContentBlockObject))
  const [blockIndex, setBlockIndex] = useState(0);
  const [contentBlock, setContentBlock] = useState([{ ...newContentBlockObject }]);

  const addContentBlock = () => {
    newBlock.blockKey = contentBlock.length;
    newBlock.attributes.label = 'Untitled text';
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
      <section className="left-block">
        <FormBuilderContextProvider value={{
          addContentBlock,
          contentBlock,
          handleChangeContent,
          handleRadioBox
        }}>
          <FormBuilder />
        </FormBuilderContextProvider>
      </section>
      <section className="right-block">
        <CustomTypeForm
          blocks={[{ ...contentBlock[blockIndex] }]}
          disableNavigationArrows={true}
        />
      </section>
    </main>
  )
}

export default EditForm;