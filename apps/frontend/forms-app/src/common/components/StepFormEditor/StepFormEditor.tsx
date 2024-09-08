import { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FormBuilderContext } from "../../CentralizeStore/FormBuilderContext/FormBuilderContext";
import { createOrUpdateQuestions } from "../../api.service";
import './StepFormEditor.scss'

const StepFormEditor = () => {
    const {
        addContentBlock,
        contentBlock,
        handleChangeContent,
        handleRadioBox
    } = useContext(FormBuilderContext) as any;

    const handleSubmitForm = async () => {
        try {
            await createOrUpdateQuestions({ formId: 6, questions: contentBlock });
        } catch {
            toast.error('Error in updating...');
        }
    }

    return (
        <main>
            <Toaster />
            <section className='step-form-editor'>
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