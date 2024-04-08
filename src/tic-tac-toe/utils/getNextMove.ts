import {
  DIAGONAL_TOPLEFT_BOTTOMRIGHT,
  DIAGONAL_TOPRIGHT_BOTTOMLEFT,
  HORIZONTAL_BOTTOM,
  HORIZONTAL_CENTER,
  HORIZONTAL_TOP,
  VERTICAL_CENTER,
  VERTICAL_LEFT,
  VERTICAL_RIGHT,
  WinnerLine,
} from "../grid";
import { GridState, Marker } from "../tictactoe";

const getEmptyCell = ({
  grid,
  cells,
}: {
  grid: GridState;
  cells: Array<[number, number]>;
}) => cells.find((cell) => grid[cell[0]][cell[1]] === null);

export const getNextMove = (grid: GridState): [number, number] => {
  // If player is going to win, block it
  const playerPotentialWinningCell = getCompletedCells({
    grid,
    marker: "X",
    completedThreshold: 2,
  });

  if (playerPotentialWinningCell.type !== null) {
    const blockCell = getEmptyCell({
      grid,
      cells: playerPotentialWinningCell.cells,
    });

    if (blockCell) {
      return blockCell;
    }
  }

  // Always mark center if its empty
  if (!grid[1][1]) {
    return [1, 1];
  }

  return getPotentialWinningCell({ grid, marker: "O" });
};

const getNextCellWithMarker = ({
  grid,
  marker,
}: {
  grid: GridState;
  marker: Marker;
}): [number, number] => {
  let cellRow = -1;
  let cellColumn = -1;

  for (let row = 0; row < grid.length && cellRow === -1; row++) {
    for (
      let column = 0;
      column < grid[row].length && cellColumn === -1;
      column++
    ) {
      if (grid[row][column] === marker) {
        cellRow = row;
        cellColumn = column;
      }
    }
  }

  return [cellRow, cellColumn];
};

const getPotentialWinningCell = ({
  grid,
  marker,
}: {
  grid: GridState;
  marker: Marker;
}): [number, number] => {
  // If center is marked
  if (grid[1][1] === marker) {
    if ([null, marker].includes(grid[0][0]) && grid[2][2] === null) {
      // Diagonal top left to bottom right
      return [2, 2];
    }

    if ([null, marker].includes(grid[2][2]) && grid[0][0] === null) {
      // Diagonal top left to bottom right
      return [0, 0];
    }

    if ([null, marker].includes(grid[0][2]) && grid[2][0] === null) {
      // Diagonal top right to bottom left
      return [2, 0];
    }

    if ([null, marker].includes(grid[2][0]) && grid[0][2] === null) {
      // Diagonal top right to bottom left
      return [0, 2];
    }

    if ([null, marker].includes(grid[0][1]) && grid[2][1] === null) {
      // Vertical center
      return [2, 1];
    }

    if ([null, marker].includes(grid[2][1]) && grid[0][1] === null) {
      // Vertical center
      return [0, 1];
    }

    if ([null, marker].includes(grid[1][0]) && grid[1][2] === null) {
      // Horizontal center
      return [1, 2];
    }

    if ([null, marker].includes(grid[1][2]) && grid[1][0] === null) {
      // Horizontal center
      return [1, 0];
    }

    // No winning connection with center mark the next available cell
    return getNextCellWithMarker({ grid, marker: null });
  }

  // Top left cell is marked
  if (grid[0][0] === marker) {
    if ([null, marker].includes(grid[0][1]) && grid[0][2] === null) {
      // Horizontal top
      return [0, 2];
    }

    if ([null, marker].includes(grid[0][2]) && grid[0][1] === null) {
      // Horizontal top
      return [0, 1];
    }

    if ([null, marker].includes(grid[1][0]) && grid[2][0] === null) {
      // Vertical left
      return [2, 0];
    }

    if ([null, marker].includes(grid[2][0]) && grid[1][0] === null) {
      // Vertical left
      return [1, 0];
    }
  }

  // Bottom left cell is marked
  if (grid[2][0] === marker) {
    if ([null, marker].includes(grid[2][1]) && grid[2][2] === null) {
      // Horizontal bottom
      return [2, 2];
    }

    if ([null, marker].includes(grid[2][2]) && grid[2][1] === null) {
      // Horizontal bottom
      return [2, 1];
    }
  }

  // Just return the next empty cell
  return getNextCellWithMarker({ grid, marker: null });
};

const getMarkerCount = ({
  cells,
  marker,
}: {
  cells: Array<Marker>;
  marker: Marker;
}) => {
  let count = 0;

  for (const val of cells) {
    count = val === marker ? count + 1 : count;
  }

  return count;
};

export const getCompletedCells = ({
  grid,
  marker,
  completedThreshold = 3,
}: {
  grid: GridState;
  marker: Marker;
  completedThreshold?: 2 | 3;
}): { cells: Array<[number, number]>; type: WinnerLine } => {
  let cells = [grid[0][0], grid[1][1], grid[2][2]];
  if (getMarkerCount({ cells, marker }) >= completedThreshold) {
    return {
      cells: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      type: DIAGONAL_TOPLEFT_BOTTOMRIGHT,
    };
  }

  cells = [grid[0][2], grid[1][1], grid[2][0]];
  if (getMarkerCount({ cells, marker }) >= completedThreshold) {
    return {
      cells: [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
      type: DIAGONAL_TOPRIGHT_BOTTOMLEFT,
    };
  }

  cells = [grid[0][1], grid[1][1], grid[2][1]];
  if (getMarkerCount({ cells, marker }) >= completedThreshold) {
    return {
      cells: [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      type: VERTICAL_CENTER,
    };
  }

  cells = [grid[1][0], grid[1][1], grid[1][2]];
  if (getMarkerCount({ cells, marker }) >= completedThreshold) {
    return {
      cells: [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      type: HORIZONTAL_CENTER,
    };
  }

  cells = [grid[0][0], grid[1][0], grid[2][0]];
  if (getMarkerCount({ cells, marker }) >= completedThreshold) {
    return {
      cells: [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      type: VERTICAL_LEFT,
    };
  }

  cells = [grid[0][2], grid[1][2], grid[2][2]];
  if (getMarkerCount({ cells, marker }) >= completedThreshold) {
    return {
      cells: [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      type: VERTICAL_RIGHT,
    };
  }

  cells = [grid[0][0], grid[0][1], grid[0][2]];
  if (getMarkerCount({ cells, marker }) >= completedThreshold) {
    return {
      cells: [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      type: HORIZONTAL_TOP,
    };
  }

  cells = [grid[2][0], grid[2][1], grid[2][2]];
  if (getMarkerCount({ cells, marker }) >= completedThreshold) {
    return {
      cells: [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      type: HORIZONTAL_BOTTOM,
    };
  }

  return { cells: [], type: null };
};
