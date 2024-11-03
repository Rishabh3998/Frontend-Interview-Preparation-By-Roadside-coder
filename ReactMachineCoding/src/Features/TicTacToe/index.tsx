/* eslint-disable @typescript-eslint/no-explicit-any */
import useTicTacToe from "./hooks/useTicTacToe";

const TicTacToe = ({ boardSize = 3 }) => {
  const { board, resetGame, getStatusMessage, handleClick } =
    useTicTacToe(boardSize);
  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <div className="game" style={{ "--board-size": boardSize }}>
        <div className="status">
          {getStatusMessage()}
          <button className="reset-button" onClick={resetGame}>
            Reset game
          </button>
        </div>
        <div className="board">
          {board?.map((b: any, index: number) => {
            return (
              <button
                className="cell"
                key={index}
                onClick={() => handleClick(index)}
                disabled={b !== null}
              >
                {b}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
