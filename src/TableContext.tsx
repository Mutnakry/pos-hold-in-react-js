import React, { createContext, useState, useContext } from 'react';

// Create a Context for the table
const TableContext = createContext();

// Table Provider component to wrap around your app and provide the table state
export const TableProvider = ({ children }) => {
  const [selectedTable, setSelectedTable] = useState(null); // State for selected table

  // Function to select a table
  const selectTable = (table) => {
    setSelectedTable(table);
  };

  return (
    <TableContext.Provider value={{ selectedTable, selectTable }}>
      {children}
    </TableContext.Provider>
  );
};

// Custom hook to use the table context
export const useTable = () => {
  return useContext(TableContext);
};
