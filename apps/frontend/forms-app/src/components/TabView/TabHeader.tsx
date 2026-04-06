import { TabJson } from "../../common/types"
import './TabHeader.scss'

const TabHeader = ({ data, onClick }: { data: TabJson[], onClick: (id: number) => void }) => {
    return (
        <section className="header">
            {
                data.map(({ id, header }) => (
                    <button onClick={() => onClick(id)}>{header}</button>
                ))
            }
        </section>
    )
}

export default TabHeader