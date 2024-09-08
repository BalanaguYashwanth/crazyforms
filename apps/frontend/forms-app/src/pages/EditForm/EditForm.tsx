import { useState } from "react";
import FormBuilder from "../../common/components/FormBuilder/FormBuilder";
// @ts-expect-error: Import not typed correctly
import { registerCoreBlocks } from "@quillforms/react-renderer-utils";
import CustomTypeForm from "../../common/components/CustomTypeForm/CustomTypeForm";
import { newContentBlockObject } from "../../common/constants";
import { handleChangeContentProps, handleRadioBoxProps } from "../../common/types";
import './EditForm.scss'
import "@quillforms/renderer-core/build-style/style.css";
import { FormBuilderContextProvider } from "../../common/CentralizeStore/FormBuilderContext/FormBuilderContext";
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