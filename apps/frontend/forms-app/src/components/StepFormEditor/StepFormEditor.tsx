import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { StepFormEditorProps } from "../../common/types";
import { FormBuilderContext } from "../../common/centralizeStore/FormBuilderContext/FormBuilderContext";
import { createForms, createOrUpdateQuestions } from "../../common/api.service";
import './StepFormEditor.scss'

const StepFormEditor = ({ handleSetFormId, handleSetFormTitle }: StepFormEditorProps) => {
    const {
        addContentBlock,
        contentBlock,
        handleChangeContent,
        handleRadioBox
    } = useContext(FormBuilderContext) as any;
    const [formDetails, setFormDetails] = useState({ title: "", description: "", user: JSON.parse(localStorage.getItem('user') || '')?.id, escrow: {} });

    const handleSubmitForm = async () => {
        try {
            const promise = await createForms(formDetails);
            const data = await promise.json();
            const formId = data.raw[0].id;
            const formName = formDetails.title;
            await createOrUpdateQuestions({ formId, questions: contentBlock });
            handleSetFormId(formId)
            handleSetFormTitle(formName)
            toast.success('Successfully saved')
        } catch (err) {
            if (err instanceof Error) {
                toast.error(`Error in updating...${err}`);
            }
        }
    }

    return (
        <main className="text-center">
            <Toaster />
            <section className='step-form-editor'>
                <input className='input-block-another' placeholder="Title" required onChange={(e) => setFormDetails({ ...formDetails, title: e.target.value, })} />
                <input className='input-block-another' placeholder="Description" required onChange={(e) => setFormDetails({ ...formDetails, description: e.target.value })} />
                {
                    contentBlock.map((block: any, index: number) => (
                        <div key={`builder-block-${index}`} className='builder-block'>
                            <div className='builder-block-child'>
                                <input
                                    autoFocus
                                    placeholder='Enter the question'
                                    className='input-block'
                                    value={block.attributes?.label}
                                    onChange={(e) => handleChangeContent(
                                        { contentIndex: index, text: e.target.value }
                                    )} />
                                <div>
                                    <p>Required</p>
                                    <input
                                        type="radio"
                                        id={`required1-${index}`}
                                        onChange={() => handleRadioBox({ contentIndex: index, text: true })}
                                        name={`required-${index}`}
                                        value="true"
                                        checked={contentBlock[index].attributes?.required == true}
                                    />
                                    <label htmlFor={`required1-${index}`}>True</label>
                                    <br />
                                    <input
                                        type="radio"
                                        id={`required2-${index}`}
                                        onChange={() => handleRadioBox({ contentIndex: index, text: false })}
                                        name={`required-${index}`}
                                        value="false"
                                        checked={contentBlock[index].attributes?.required == false}
                                    />
                                    <label htmlFor={`required2-${index}`}>False</label>
                                </div>
                            </div>
                            {index == contentBlock.length - 1 && <button className='add-button' onClick={addContentBlock}>+</button>}
                        </div>
                    ))
                }
            </section>
            <button className='submit-button' onClick={handleSubmitForm}>Save</button>
        </main>
    )
}

export default StepFormEditor;