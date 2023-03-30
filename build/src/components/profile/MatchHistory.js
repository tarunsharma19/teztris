import React from 'react';

const MatchHistory = ({matches}) => {
  return (
    <div className="match-history">
      <h2>Match History</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Opponent</th>
            <th>Date/Time</th>
            <th>Result</th>
            <th>Win/Lose Amount</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match, index) => (
            <tr key={index}>
              <td>{match.opponent}</td>
              <td>{match.dateTime}</td>
              <td>{match.result}</td>
              <td>{match.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatchHistory;
