import { useState } from "react";
// @ts-expect-error: Import not typed correctly
import { registerCoreBlocks } from "@quillforms/react-renderer-utils";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import { BLOCK_TYPE, choiceItemBlock, choicesBlock, fileUploadBlock, newContentBlockObject } from "../../common/constants";
import { handleChangeContentProps, handleRadioBoxProps } from "../../common/types";
import { FormBuilderContextProvider } from "../../common/centralizeStore/FormBuilderContext/FormBuilderContext";
import FormBuilder from "../../components/FormBuilder/FormBuilder";
import CustomTypeForm from "../../components/CustomTypeForm/CustomTypeForm";
import './EditForm.scss'
import "@quillforms/renderer-core/build-style/style.css";
registerCoreBlocks()
const aptosWallets = [new MartianWallet(), new PetraWallet()];

const EditForm = () => {
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const newBlock = JSON.parse(JSON.stringify(newContentBlockObject))
  const newChoicesBlock = JSON.parse(JSON.stringify(choicesBlock))
  const newFileUploadBlock = JSON.parse(JSON.stringify(fileUploadBlock));
  const newChoiceItemBlock = JSON.parse(JSON.stringify(choiceItemBlock))
  const [inputBlockType, setInputBlockType] = useState<BLOCK_TYPE>(BLOCK_TYPE.INPUT_BLOCK);
  const [contentBlock, setContentBlock] = useState<any>([{ ...newContentBlockObject }]);

  const handleInputBlockType = (num: number) => {
    setInputBlockType(Number(num))
  }

  const addContentBlock = () => {
    newBlock.blockKey = contentBlock.length;
    newBlock.attributes.label = 'Untitled text';
    newChoicesBlock.attributes.label = 'Untitled text';
    newFileUploadBlock.attributes.label = 'Untitled text';

    if (inputBlockType === BLOCK_TYPE.INPUT_BLOCK) {
      setContentBlock([...contentBlock, newBlock]);
    } else if (inputBlockType === BLOCK_TYPE.CHOICE_BLOCK) {
      setContentBlock([...contentBlock, newChoicesBlock]);
    } else if(inputBlockType === BLOCK_TYPE.FILE_UPLOAD_BLOCK){
      setContentBlock([...contentBlock, newFileUploadBlock]);
    }
    setCurrentBlockIndex(contentBlock.length)
  }

  const addChoiceBlock = (id: number) => {
    newChoiceItemBlock.id = contentBlock[id].attributes.choices.length;
    contentBlock[id].attributes.choices.push(newChoiceItemBlock);
    setContentBlock([...contentBlock]);
    setCurrentBlockIndex(contentBlock.length)
  }

  const addContentInChoiceBlock = ({ id, choiceId, text }: { id: number, choiceId: number, text: string }) => {
    contentBlock[id].attributes.choices[choiceId].label = text;
    contentBlock[id].attributes.choices[choiceId].value = text;
    setContentBlock([...contentBlock]);
    setCurrentBlockIndex(id)
  }

  const handleChangeContent = ({ contentIndex, text }: handleChangeContentProps) => {
    contentBlock[contentIndex].attributes.label = text;
    setContentBlock([...contentBlock]);
    setCurrentBlockIndex(contentIndex)
  }

  const handleRadioBox = ({ contentIndex, text }: handleRadioBoxProps) => {
    contentBlock[contentIndex].attributes.required = text;
    setContentBlock([...contentBlock]);
  }

  return (
    <main className="form-container">
      <section className="left-block">
      <AptosWalletAdapterProvider plugins={aptosWallets} autoConnect={true}>
        <FormBuilderContextProvider value={{
          addContentBlock,
          addChoiceBlock,
          addContentInChoiceBlock,
          contentBlock,
          handleChangeContent,
          handleInputBlockType,
          handleRadioBox,
        }}>
          <FormBuilder />
        </FormBuilderContextProvider>
        </AptosWalletAdapterProvider>
      </section>
      <section className="right-block">
        <CustomTypeForm
          blocks={[{ ...contentBlock[currentBlockIndex] }]}
          disableNavigationArrows={true}
        />
      </section>
    </main>
  )
}

export default EditForm;