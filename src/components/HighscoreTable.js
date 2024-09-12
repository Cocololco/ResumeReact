import React from 'react';

const HighscoreTable = ({title,id}) => {
  return (
    <div className="card">
      <table className="table table-light table-bordered">
        <thead className="table-primary">
          <tr>
            <th colSpan="100%" style={{textAlign:"center"}}>{[title]}</th>
          </tr>
        </thead>
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Time</th>
            <th>Bullets</th>
            <th>Broken Blocks</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>1</td>
              <td>12th Sep 2024</td>
              <td>45sec</td>
              <td>45</td>
              <td>17</td>
            </tr>
          
        </tbody>
      </table>
    </div>
  );
};

export default HighscoreTable;
