import React, { useState } from 'react';
import { useCart } from './CartContext'; // Import useCart to access addToCart and cart state

const initialTablecheai = [
  { tableId: 1, tablename: 'VIP' },
  { tableId: 2, tablename: 'Private' },
  { tableId: 3, tablename: 'Table1' },
  { tableId: 4, tablename: 'Table2' },
  { tableId: 5, tablename: 'Table3' }
];

function Table() {
  const { addToCart, restoreHeldOrder, heldOrders } = useCart();
  const [tablecheai, setTablecheai] = useState(initialTablecheai);
  const [selectedTable, setSelectedTable] = useState(null);

  const selectTable = (item) => {
    if (item.tablename === 'Busy') {
      const heldOrder = heldOrders.find(order =>
        order.some(product => product.id === `table-${item.tableId}`)
      );

      if (heldOrder) {
        restoreHeldOrder(heldOrder);
      } else {
        const product = {
          id: `table-${item.tableId}`,
          name: item.tablename,
          price: 0,
          quantity: 1
        };
        restoreHeldOrder([product]);
      }

      return;
    }

    if (selectedTable === item.tableId) {
      const heldOrder = heldOrders.find(order =>
        order.some(product => product.id === `table-${item.tableId}`)
      );
      if (heldOrder) {
        restoreHeldOrder(heldOrder);
        setSelectedTable(null);
        updateTableName(item.tableId, item.tablename);
      }
    } else {
      setSelectedTable(item.tableId);
      const product = {
        id: `table-${item.tableId}`,
        name: item.tablename,
        price: 0,
        quantity: 1
      };
      addToCart(product);
      updateTableName(item.tableId, 'Busy');
    }
  };

  const updateTableName = (tableId, newName) => {
    setTablecheai(prevState =>
      prevState.map(table =>
        table.tableId === tableId ? { ...table, tablename: newName } : table
      )
    );
  };

  

  return (
    <div>
      <table>
        <tbody>
          {tablecheai.map(item => {
            const heldOrder = heldOrders.find(order =>
              order.some(product => product.name === item.tablename)
            );

            return (
              <tr key={item.tableId}>
                <td>
                  <button
                    onClick={() => selectTable(item)}
                    className={item.tablename === 'Busy' ? 'bg-red-500' : (selectedTable === item.tableId ? 'bg-red-400' : '')}
                  >
                    {item.tablename}
                  </button>
                  {heldOrder && (
                    <button
                      onClick={() => restoreHeldOrder(heldOrder)}
                      className='bg-blue-500 py-1 px-4 rounded-lg ml-2'
                    >
                      Restore to Cart
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;



