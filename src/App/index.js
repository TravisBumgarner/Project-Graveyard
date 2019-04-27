import React, { useState } from "react";

const App = () => {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(30);
  return (
    <div>
      <div>
        Width <button onClick={() => setCols(cols + 1)}>++</button>
        <button onClick={() => setCols(cols - 1)}>--</button>
        Height <button onClick={() => setRows(rows + 1)}>++</button>
        <button onClick={() => setRows(rows - 1)}>--</button>
      </div>
      <textarea rows={rows} cols={cols} />
    </div>
  );
};

export default App;
