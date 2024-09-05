import { createQuestions } from '../../api.service';
import { FormBuilderProps } from '../../types';
import './FormBuilder.scss'

const FormBuilder = ({
    addContentBlock,
    contentBlock,
    handleChangeContent,
    handleRadioBox
}: FormBuilderProps) => {

    const handleSubmitForm = async () => {
        try {
            await createQuestions({formId:6, questions: contentBlock});
        } catch (err) {
            console.log('err--->', err)
        }
    }

    return (
        <main className="form-builder-container">
            {
                contentBlock.map((block, index) => (
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
                        <button className='add-button' onClick={addContentBlock}>+</button>
                    </div>
                ))
            }
            <button className='submit-button' onClick={handleSubmitForm}>submit</button>
        </main>
    )
}

export default FormBuilder;