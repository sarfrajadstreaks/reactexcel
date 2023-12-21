import { useState } from "react";

export const Sheet = () => {
  const [rows, setRows] = useState(
    Array(70).fill({
      height: "20px",
    })
  );
  const [columns, setColumns] = useState(
    Array(70).fill({
      width: "100px",
    })
  );
  const [cells, setCells] = useState(
    Array(rows.length)
      .fill(null)
      .map(() => Array(columns.length).fill({}))
  );

  function indexToAlphabet(index) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";

    while (index >= 0) {
      result = alphabet[index % 26] + result;
      index = Math.floor(index / 26) - 1;
    }

    return result;
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          height: "22px",
          width: "fit-content",
          position: "sticky",
          top: 0,
          zIndex: 1,
          background: "gray",
        }}
      >
        <div
          style={{
            minWidth: "50px",
            position: "sticky",
            left: 0,
            background: "gray",
          }}
        ></div>
        <table style={{ border: "1px solid", borderCollapse: "collapse" }}>
          <tr>
            {columns.map((_, col) => {
              return (
                <th
                  style={{
                    border: "1px solid",
                    minWidth: `${columns[col].width}`,
                  }}
                >
                  {indexToAlphabet(col)}
                </th>
              );
            })}
          </tr>
        </table>
      </div>

      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            height: "fit-content",
            position: "sticky",
            left: 0,
            minWidth: "50px",
            background: "gray",
          }}
        >
          <table
            style={{
              border: "1px solid",
              borderCollapse: "collapse",
              width: "100%",
              textAlign: "center",
            }}
          >
            {rows.map((_, row) => {
              return (
                <tr
                  style={{ border: "1px solid", height: `${rows[row].height}` }}
                >
                  <td>{row + 1}</td>
                </tr>
              );
            })}
          </table>
        </div>

        <div style={{ display: "flex", width: "100%" }}>
          <table style={{ border: "1px solid", borderCollapse: "collapse" }}>
            <tbody>
              {cells.map((_, row) => (
                <tr
                  style={{ border: "1px solid", height: `${rows[row].height}` }}
                  key={row}
                >
                  {_.map((_, col) => (
                    <td
                      style={{
                        border: "1px solid",
                        minWidth: `${columns[col].width}`,
                        padding:0,
                        margin:0
                      }}
                      key={col}
                    >
                      <span contenteditable="true"></span>
                      {/* <input /> */}
                      {/* <textarea></textarea> */}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
