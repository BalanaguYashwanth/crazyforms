import { useState } from "react";
// @ts-expect-error: Import not typed correctly
import { registerCoreBlocks } from "@quillforms/react-renderer-utils";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";import { choiceItemBlock, choicesBlock, newContentBlockObject } from "../../common/constants";
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
  const newChoiceItemBlock = JSON.parse(JSON.stringify(choiceItemBlock))
  const [inputBlockType, setInputBlockType] = useState('');
  const [contentBlock, setContentBlock] = useState<any>([{ ...newContentBlockObject }]);

  const handleInputBlockType = (text: string) => {
    setInputBlockType(text)
  }

  const addContentBlock = () => {
    newBlock.blockKey = contentBlock.length;
    newBlock.attributes.label = 'Untitled text';
    newChoicesBlock.attributes.label = 'Untitled text';

    if (inputBlockType === 'inputBox') {
      setContentBlock([...contentBlock, newBlock]);
    } else if (inputBlockType === 'choiceBox') {
      setContentBlock([...contentBlock, newChoicesBlock]);
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