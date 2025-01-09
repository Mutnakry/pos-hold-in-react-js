import React from 'react';
import { useTable } from './TableContext'; // Import the useTable hook
import { Link } from 'react-router-dom';  // Correct import

const tablecheai = [
  { id: 1, name: 'VIP' },
  { id: 2, name: 'Private' },
  { id: 3, name: 'Table1' },
  { id: 4, name: 'Table2' },
  { id: 5, name: 'Table3' }
];

function Table() {
  const { selectTable } = useTable(); // Get the selectTable function from context

  return (
    <div>
      <h2>Select a Table</h2>
      <table>
        <tbody>
          {tablecheai.map((item) => (
            <tr key={item.id}>
              <td>
                <button onClick={() => selectTable(item)}>
                  {item.name}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
