import React, { useContext, useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const EditableTable = () => {
  const [rows, setrows] = useState([{ id: uuidv4(), name: "mineral" }]);

  const addMineral = (id, name) => {
    let arr = [...rows];
    arr.push({ id, name });
    setrows(arr);
  };

  const addnpri = (id, name, mineralId) => {
    let arr = [...rows];
    let foundIndex;
    let index = arr.length - 1;
    for (; index >= 0; index--) {
      if (arr[index]?.mineralId === mineralId) {
        foundIndex = index;
        break;
      }
    }
    if (!foundIndex && foundIndex !== 0) {
      let index2 = arr.length - 1;
      for (; index2 >= 0; index2--) {
        if (arr[index2]?.id === mineralId) {
          foundIndex = index2;
          break;
        }
      }
    }
    arr.splice(foundIndex + 1, 0, { id, name, mineralId });
    setrows(arr);
  };

  const removeRow = (id, name) => {
    let arr = [...rows];
    if (name === "mineral") {
      let arr2 = arr.filter((item) => item.id !== id);
      let arr3 = arr2.filter((item) => item.mineralId !== id);
      setrows(arr3);
    } else {
      let arr2 = arr.filter((item) => item.id !== id);
      setrows(arr2);
    }
  };

  const showAddNpri = (value) => {
    let foundIndex = rows.findIndex((item) => item.id === value.id);
    let nextCell = rows[foundIndex + 1];
    if (value.name === "mineral") {
      if (nextCell?.mineralId === value.id) {
        return false;
      } else {
        return true;
      }
    } else {
      if (nextCell?.mineralId === value.mineralId) {
        return false;
      } else {
        return true;
      }
    }
  };

  const handleChange = (e, itemId) => {
    console.log(e.target.value, itemId);
    //We can set the values here for all the field based on its id and name
  };

  return (
    <div>
      <table>
        <thead>
          <th>Owner</th>
          <th>Mineral Interests</th>
          <th>NPRIs</th>
          <th>Lease</th>
        </thead>
        <tbody>
          {rows.map((item, i) => (
            <tr key={i}>
              {item.name === "mineral" ? (
                <>
                  <td>
                    <input
                      name="owner"
                      placeholder="Luke Sky Walker"
                      onChange={(e) => handleChange(e, item.id)}
                    />
                  </td>
                  <td>
                    <input
                      name="intrest"
                      placeholder="0.5"
                      onChange={(e) => handleChange(e, item.id)}
                    />
                  </td>
                  <td></td>
                  <td>
                    <input
                      name="lease"
                      placeholder="Tetooinse Lease"
                      onChange={(e) => handleChange(e, item.id)}
                    />
                  </td>
                  <td>
                    <button onClick={() => removeRow(item.id, "mineral")}>
                      Remove
                    </button>
                    {showAddNpri(item) ? (
                      <button
                        onClick={() => addnpri(uuidv4(), "nrpi", item.id)}
                      >
                        Add NPRI
                      </button>
                    ) : null}
                  </td>
                </>
              ) : (
                <>
                  <td>
                    <input
                      name="name"
                      placeholder="Leia Organa"
                      onChange={(e) => handleChange(e, item.id)}
                    />
                  </td>
                  <td></td>
                  <td>
                    <input
                      name="npriintrest"
                      placeholder="0.45"
                      onChange={(e) => handleChange(e, item.id)}
                    />
                  </td>
                  <td></td>
                  <td>
                    <button onClick={() => removeRow(item.id, "nrpi")}>
                      Remove
                    </button>
                    {showAddNpri(item) ? (
                      <button
                        onClick={() =>
                          addnpri(uuidv4(), "nrpi", item.mineralId)
                        }
                      >
                        Add NPRI
                      </button>
                    ) : null}
                  </td>
                </>
              )}
            </tr>
          ))}

          <tr>
            <button onClick={() => addMineral(uuidv4(), "mineral")}>
              Add Mineral
            </button>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;
