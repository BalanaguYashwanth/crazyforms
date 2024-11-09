const TableView = ({ data, heading, }) => {

    return (
        <table>
            <thead>
                <tr>
                    {
                        heading.map((title: string, index: number) => (
                            <th key={`heading-${index}`}>{title}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.map((child: any[]) => (
                        <tr>
                            {
                                heading.map((item: number, index: number) => (
                                    <td key={`responses-${index}`}> {child[item]} </td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default TableView