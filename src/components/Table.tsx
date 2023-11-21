import  {TableColumn} from "react-data-table-component";
import React,{lazy, Suspense} from "react";
import Loading from "./Loading.tsx";

/**
 * Generates a table component with the provided data.
 *
 * @param {object} props - The properties for the table component.
 * @param {Array} props.dataTableResults - The data to be displayed in the table.
 * @return {JSX.Element} - The rendered table component.
 */
const Table = (props : {
    title: string,
    dataTableResults: NewTestResults[];
}) => {
    const { dataTableResults, title } = props;

    const DataTable = lazy(() => import('react-data-table-component'));

    const columns: TableColumn<any> = [
        {
            name: 'ID',
            selector: (row) => row.id.toString(),
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
                minWidth: '100px'
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
        <Suspense fallback={<Loading />}>
            <DataTable
                title={title}
                columns={columns}
                data={dataTableResults}
            />
        </Suspense>
    )
};

export default Table
