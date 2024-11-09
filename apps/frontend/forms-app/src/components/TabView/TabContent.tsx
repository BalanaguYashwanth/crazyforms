import { TabJson } from "../../common/types";

const TabContent = ({ active, data }: { active: number, data: TabJson[] }) => (
    <section>
        {data.map((item) => item.id == active && (item.component))}
    </section>
)

export default TabContent;