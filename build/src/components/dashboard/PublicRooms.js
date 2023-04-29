import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { joinGame } from '../../api/operations/teztris';
import { manageFunc } from '../../App';
import { useNavigate } from 'react-router-dom';

function PublicRooms() {
  const socket = useSelector((state) => state.socket.socket); 
  const {gameIdInput, setGameIdInput , createdGame } = useContext(manageFunc);
  const navigate = useNavigate();

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
  const [loading , setLoading] = useState(false)


  const handleJoinGame = async (room) =>{
    if (!room){
      alert("no match data found")
      return
    }
    if (createdGame){
      alert("cant join a game, end your created game first!")
      return
    }
    setLoading(true);
      const joinGameApi = await joinGame(room.tokenData.amount,room.tokenData.betToken,room.tokenData.betTokenId,room.tokenData.betTokenType,6,room.roomId);
      if (joinGameApi.success === true) {
      socket.emit('playerJoins', {"gameId":room.roomId})
      setGameIdInput(room.roomId)
      navigate("/app", { replace: true });
    }
    setLoading(false);
  }

  useEffect(() => {
    if (socket) {
      socket.on('public-rooms', (data) => {
        const updatedRooms = data.publicRooms.map((room) => {
          return {
            "name": room.alias,
            "roomId": room.gameId,
            "betAmount": room.tokenData.amount + " " + room.tokenData.betTokenName,
            "tokenData": room.tokenData
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
                  <button onClick={()=>handleJoinGame(room)} >
                    { loading?"Joining..":"Join"}
                    </button>
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
