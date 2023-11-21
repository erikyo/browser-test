import  {TableColumn} from "react-data-table-component";
import {lazy, Suspense} from "react";
import Loading from "./Loading.tsx";

/**
 * Generates a table component with the provided data.
 *
 * @param {object} props - The properties for the table component.
 * @param {Array} props.dataTableResults - The data to be displayed in the table.
 * @return {JSX.Element} - The rendered table component.
 */
const Tables = props => {
    const { dataTableResults } = props;
    const DataTable = lazy(() => import('react-data-table-component'));
}

export default Tables