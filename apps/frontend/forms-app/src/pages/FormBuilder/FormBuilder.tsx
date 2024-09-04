import type { FormBlocks } from '@quillforms/types';
import { handleChangeContentProps } from '../../common/types';
import './FormBuilder.scss'

interface FormBuilderProps {
    contentBlock: FormBlocks;
    handleChangeContent: ({ contentIndex, text }: handleChangeContentProps) => void;
    addContentBlock: () => void;
}

const FormBuilder = ({ 
        addContentBlock, 
        contentBlock, 
        handleChangeContent 
    }: FormBuilderProps) => {

    return (
        <main className="form-builder-container">
            {
                contentBlock.map((block, index) => (
                    <div key={`builder-block-${index+1}`} className='builder-block'>
                        <input
                            autoFocus
                            placeholder='Enter the question'
                            className='input-block'
                            value={block.attributes?.label}
                            onChange={(e) => handleChangeContent(
                                { contentIndex: index, text: e.target.value }
                            )} />
                        <button className='add-button' onClick={addContentBlock}>+</button>
                    </div>
                ))
            }

        </main>
    )
}

export default FormBuilder;