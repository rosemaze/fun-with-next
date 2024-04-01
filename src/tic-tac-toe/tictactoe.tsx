"use client";
import * as React from "react";
import { WinnerLine, Grid } from "./grid";
import { Cell } from "./cell";
import { getCompletedCells, getNextMove } from "./utils/getNextMove";

const MARKER_PLAYER = "X";
const MARKER_COMPUTER = "O";
export type Marker = typeof MARKER_PLAYER | typeof MARKER_COMPUTER | null;

export type GridState = Array<Array<Marker>>;

export const WINNER_COMPUTER = "Computer";
export const WINNER_PLAYER = "Player";
export type Winner = typeof WINNER_COMPUTER | typeof WINNER_PLAYER;

const INITIAL_GRID = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export const TicTacToe = () => {
  const [grid, setGrid] = React.useState<GridState>(INITIAL_GRID);
  const [winner, setWinner] = React.useState<Winner>();
  const [gameOver, setGameOver] = React.useState(false);
  const [winnerLine, setWinnerLine] = React.useState<WinnerLine>(null);

  const markGrid = ({ x, y }: { x: number; y: number }) => {
    const prevGrid = [...grid];

    prevGrid[x][y] = MARKER_PLAYER;

    // Check if player has won
    const completedRowPlayer = getCompletedCells({
      grid: prevGrid,
      marker: MARKER_PLAYER,
    });

    if (completedRowPlayer.type !== null) {
      setWinnerLine(completedRowPlayer.type);
      setWinner(WINNER_PLAYER);
      setGameOver(true);
      setGrid(prevGrid);
      return;
    }

    // Calculate computers move
    const [nextMoveX, nextMoveY] = getNextMove(prevGrid);

    // All cells are occupied, no one won end, end game
    if (nextMoveX === -1) {
      // Tie!
      setGameOver(true);
      return;
    }

    // Mark computers next move
    prevGrid[nextMoveX][nextMoveY] = MARKER_COMPUTER;
    setGrid(prevGrid);

    // Check if computer has won
    const completedRowComputer = getCompletedCells({
      grid: prevGrid,
      marker: MARKER_COMPUTER,
    });

    if (completedRowComputer.type !== null) {
      setWinnerLine(completedRowComputer.type);
      setGameOver(true);
      setWinner(WINNER_COMPUTER);
      return;
    }
  };

  return (
    <>
      <Grid winnerLine={winnerLine} winner={winner}>
        {grid.map((row, rowIndex) =>
          row.map((column, columnIndex) => (
            <Cell
              key={`${rowIndex}_${columnIndex}`}
              marker={column}
              disabled={gameOver || column !== null}
              onClick={() => markGrid({ x: rowIndex, y: columnIndex })}
            />
          ))
        )}
      </Grid>

      <div style={{ minHeight: "40px" }} className="italic">
        {winner === WINNER_PLAYER && (
          <div className="text-lime-700">Yay, you won!</div>
        )}
        {winner === WINNER_COMPUTER && (
          <div className="text-rose-700">Sorry, you lost!</div>
        )}
        {gameOver && !winner && (
          <div className="text-neutral-500">Game over - no one won.</div>
        )}
      </div>
      <input
        type="button"
        style={{ padding: "8px 20px 10px 20px", cursor: "pointer" }}
        className="text-neutral-700 bg-yellow-200 rounded-full transition-colors hover:bg-yellow-300 active:bg-yellow-400 active:text-yellow-200"
        onClick={() => {
          setWinnerLine(null);
          setWinner(undefined);
          setGameOver(false);
          setGrid([
            [null, null, null],
            [null, null, null],
            [null, null, null],
          ]);
        }}
        value="New game"
      />
    </>
  );
};
