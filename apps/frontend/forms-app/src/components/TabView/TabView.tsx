import { useState } from "react";
import TabHeader from "./TabHeader";
import TabContent from "./TabContent";
import { TabJson } from "../../common/types";

const TabView = ({data}: {data: TabJson[]}) => {

    const [active, setActive] = useState(1);
    const handleClick = (id: number) => {setActive(id)};

    return(
        <main>
            <TabHeader data={data} onClick={handleClick} />
            <TabContent active={active} data={data}/>
        </main>
    )
}

export default TabView;
