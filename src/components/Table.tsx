import DataTable, {TableColumn} from "react-data-table-component";

/**
 * Generates a table component with the provided data.
 *
 * @param {object} props - The properties for the table component.
 * @param {Array} props.dataTableResults - The data to be displayed in the table.
 * @return {JSX.Element} - The rendered table component.
 */
function Table(props) {
    const {dataTableResults} = props;

    const columns: TableColumn<any> = [
        {
            name: 'ID',
            selector: (row) => row.id,
            sortable: true,
            style: {
                maxWidth: '32px',
            }
        },
        {
            name: 'Test Name',
            selector: (row) => row.testName,
            sortable: true,
            style: {
                minWidth: '100px',
            }
        },
        {
            name: 'Value',
            selector: (row) => row.value.toString(),
            sortable: true,
            style: {
                width: '320px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            }
        },
        {
            name: 'Result',
            selector: (row) => row.result.toString(),
            sortable: true,
            right: true,
            style: {
                maxWidth: '32px',
            }
        },
    ]

    return (
        <DataTable
            columns={columns}
            data={dataTableResults}
        />
    )
}

export default Table
