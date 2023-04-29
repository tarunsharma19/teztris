import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function PublicRooms() {
  const socket = useSelector((state) => state.socket.socket); 

  // const rooms = [
  //   {
  //     name: 'room one',
  //     betAmount: '12 tez',
  //   },
  //   {
  //     name: 'room two',
  //     betAmount: '15 tez',
  //   },
  //   {
  //     name: 'room three',
  //     betAmount: '8 tez',
  //   },
  // ];

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on('public-rooms', (data) => {
        const updatedRooms = data.publicRooms.map((room) => {
          return {
            "name": room.alias,
            "betAmount": room.tokenData.amount + " " + room.tokenData.betTokenName,
          };
        });
        setRooms(updatedRooms);
      });
    }
  }, []);

  return (
    <div className="roomCard">
      <h1>Public Room</h1>
      <div className="roomsTable">
        <table>
          <thead>
            <tr>
              <th>Room Name</th>
              <th>Bet Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => (
              <tr className="row" key={index}>
                <td>{room.name}</td>
                <td className="amount">{room.betAmount}</td>
                <td className="button">
                  <button onClick={handleJoinGame} >Join</button>
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
