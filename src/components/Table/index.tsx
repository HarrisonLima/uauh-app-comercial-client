import { useEffect, useState } from "react";
import { isArray } from "lodash";
import {
  faArrowRotateLeft,
  faPenToSquare,
  faLink,
  faLinkSlash,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import Icon from "../Icon";

const Table = ({
  header,
  response,
  actions,
  onEdit,
  onBond,
  onLink,
  onResetPassword,
  filters,
}: {
  header: string[];
  response: any[][];
  actions?: ["Bond" | "Edit" | "Reset" | "Link"];
  onEdit?: (data: any) => void;
  onBond?: (data: any) => void;
  onResetPassword?: (id: number) => void;
  onLink?: (data: any) => void;
  filters?: { [key: string]: string }[];
}) => {
  const [filtered, setFiltered] = useState(response);
  const [tableJSX, setTableJSX] = useState<JSX.Element | null>(null);

  const handleEdit = (data: any) => {
    onEdit!(data);
  };

  const handleBond = (data: any) => {
    onBond!(data);
  };

  const handleResetPassword = (data: any) => {
    onResetPassword!(data);
  };

  const handleLink = (data: any) => {
    onLink!(data);
  };

  const findIndexColumn = (column: string) => {
    return header.findIndex((i: string) => {
      return i === column;
    });
  };

  useEffect(() => {
    const filter = () => {
      let filteredData = response;

      if (filters && filters!.length > 0) {
        filters!.forEach((filter) => {
          const key = Object.keys(filter)[0];
          const index = findIndexColumn(key);
          const value = filter[key];

          filteredData = filteredData.filter((data: any[]) => {
            return String(data[index])
              .toLocaleLowerCase()
              .includes(value.toLocaleLowerCase());
          });
        });
      }

      setFiltered(filteredData);
    };

    filter();
  }, [response, filters]);

  useEffect(() => {
    const generateJSX = () => {
      return (
        <>
          {filtered.map((rowData: any) => (
            <tr id={rowData[0]} key={rowData[0]}>
              {rowData.map((cellValue: any, colIndex: number) =>
                header[0] !== "id" ? (
                  <td key={colIndex}>{cellValue}</td>
                ) : colIndex > 0 ? (
                  <td key={colIndex}>
                    <p>{cellValue}</p>
                  </td>
                ) : null
              )}
              {isArray(actions) && actions.length > 0 ? (
                <td>
                  <div>
                    {actions.map((action: string, index) => {
                      return (
                        <Icon
                          key={index}
                          icon={
                            action === "Bond"
                              ? faLink
                              : action === "Edit"
                              ? faPenToSquare
                              : action === "Unbond"
                              ? faLinkSlash
                              : action === "Reset"
                              ? faArrowRotateLeft
                              : action === "Link"
                              ? faArrowUpRightFromSquare
                              : undefined
                          }
                          color={
                            action === "Bond"
                              ? "green"
                              : action === "Unbond"
                              ? "red"
                              : "black"
                          }
                          variant="button"
                          onClick={() =>
                            action === "Edit"
                              ? handleEdit(rowData)
                              : action === "Bond"
                              ? handleBond(rowData)
                              : action === "Reset"
                              ? handleResetPassword(rowData)
                              : action === "Link"
                              ? handleLink(rowData)
                              : undefined
                          }
                        />
                      );
                    })}
                  </div>
                </td>
              ) : null}
            </tr>
          ))}
        </>
      );
    };

    const component = generateJSX();

    setTableJSX(component);
  }, [response, filtered]);

  return (
    <div className="table-box">
      <table className="table">
        <thead>
          <tr>
            {header!.map(
              (title: string, index: number) =>
                title !== "id" && <th key={index}>{title}</th>
            )}
            {actions && <th key="actions">Ações</th>}
          </tr>
        </thead>
        <tbody>{tableJSX}</tbody>
      </table>
    </div>
  );
};

export default Table;
