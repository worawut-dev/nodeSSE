import React from 'react';

const ExchangeTable = ({ data }) => {
  return (
    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
      <table className="exchange-table">
        <thead>
          <tr>
            <th>Date Time</th>
            <th>USD</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.dateTime}</td>
              <td>{row.usd}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExchangeTable;
