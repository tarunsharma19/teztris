import React from 'react';

function PublicRooms() {
  const rooms = [
    {
      name: 'room one',
      betAmount: '12 tez',
    },
    {
      name: 'room two',
      betAmount: '15 tez',
    },
    {
      name: 'room three',
      betAmount: '8 tez',
    },
  ];

  return (
    <div className="card">
      <h1>Public Room</h1>
      <div className="roomsTable">
        <table>
          <thead>
            <tr>
              <th>Room Name</th>
              <th>Bet Amount</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => (
              <tr className="row" key={index}>
                <td>{room.name}</td>
                <td className="amount">{room.betAmount}</td>
                <td className="button">
                  <button>Join</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PublicRooms;
