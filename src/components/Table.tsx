import  {TableColumn} from "react-data-table-component";
import React,{lazy, Suspense, useEffect} from "react";
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
            left: true,
            style: {
                minWidth:'64px',
                maxWidth:'32px',
            }
        },
        {
            name: 'Test Name',
            selector: (row) => row.testName,
            sortable: true,
            left: true,
            style: {
                minWidth: '100px'
            }
        },
        {
            name: 'Value',
            selector: (row) => row.value.toString(),
            sortable: true,
            left: true,
            style: {
                minWidth: '64px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            }
        },
        {
            name: 'Result',
            selector: (row) => row.result.toString(),
            sortable: true,
            left: true,
            style: {
                maxWidth: '32px',
            }
        },
    ]

    return (
        <Suspense fallback={<Loading />}>
            <section className="border-2 border-gray-200">
                <DataTable
                    title={title}
                    columns={columns}
                    data={dataTableResults}
                />
            </section>
        </Suspense>
    )
};

export default Table
