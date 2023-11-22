import  {TableColumn} from "react-data-table-component";
import React, {lazy, Suspense} from "react";
import Loading from "./Loading.tsx";
import Table from "./Table.tsx";

/**
 * Generates a table component with the provided data.
 *
 * @param {object} props - The properties for the table component.
 * @param {Array} props.dataTableResults - The data to be displayed in the table.
 * @return {JSX.Element} - The rendered table component.
 */
const Tables = (props: ObjResult) => {


    return( 
      <article className="border-2 border-gray-200">
        {Object.keys(props).map((key: string) => (
          <Table key={key} title={key} dataTableResults={props[key]} />
        ))}
      </article>
    )
}

export default Tables