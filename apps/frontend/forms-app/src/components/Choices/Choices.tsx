import { useContext } from "react";
import { FormBuilderContext } from "../../common/centralizeStore/FormBuilderContext/FormBuilderContext";
import './Choices.scss'

const Choices = ({ blockId, choices }: any) => {

    const { addChoiceBlock, addContentInChoiceBlock } = useContext(FormBuilderContext)

    return (
        <main className="choices-container">
            {
                choices.map((choice: any, index: number) => (
                    <input key={`choice-block-${index}`} placeholder="Enter choice" onChange={(e) => addContentInChoiceBlock({ id: blockId, choiceId: choice.id, text: e.target.value })} />
                ))
            }
            <button onClick={() => addChoiceBlock(blockId)}>add choice</button>
        </main>
    )
}

export default Choices;