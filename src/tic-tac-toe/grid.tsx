import * as React from "react";
import { WINNER_COMPUTER, Winner } from "./tictactoe";

export const DIAGONAL_TOPLEFT_BOTTOMRIGHT = "DIAGONAL_TOPLEFT_BOTTOMRIGHT";
export const DIAGONAL_TOPRIGHT_BOTTOMLEFT = "DIAGONAL_TOPRIGHT_BOTTOMLEFT";
export const VERTICAL_LEFT = "VERTICAL_LEFT";
export const VERTICAL_CENTER = "VERTICAL_CENTER";
export const VERTICAL_RIGHT = "VERTICAL_RIGHT";
export const HORIZONTAL_TOP = "HORIZONTAL_TOP";
export const HORIZONTAL_CENTER = "HORIZONTAL_CENTER";
export const HORIZONTAL_BOTTOM = "HORIZONTAL_BOTTOM";

export type WinnerLine =
  | typeof DIAGONAL_TOPLEFT_BOTTOMRIGHT
  | typeof DIAGONAL_TOPRIGHT_BOTTOMLEFT
  | typeof VERTICAL_LEFT
  | typeof VERTICAL_CENTER
  | typeof VERTICAL_RIGHT
  | typeof HORIZONTAL_TOP
  | typeof HORIZONTAL_CENTER
  | typeof HORIZONTAL_BOTTOM
  | null;

type Orientation = "vertical" | "horizontal";

const getWinnerLineStyles = ({
  winnerLine,
  winner,
}: {
  winnerLine: WinnerLine;
  winner?: Winner;
}) => {
  const defaultStyles = {
    position: "absolute",
    height: "4px",
    width: "100%",
    backgroundColor: winner === WINNER_COMPUTER ? "red" : "green",
  };
  switch (winnerLine) {
    case VERTICAL_CENTER:
      return { ...defaultStyles, top: "50%", transform: "rotate(90deg)" };
    case VERTICAL_LEFT:
      return {
        ...defaultStyles,
        top: "50%",
        left: "-33%",
        transform: "rotate(90deg)",
      };
    case VERTICAL_RIGHT:
      return {
        ...defaultStyles,
        top: "50%",
        left: "33%",
        transform: "rotate(90deg)",
      };
    case HORIZONTAL_TOP:
      return { ...defaultStyles, top: "16%" };
    case HORIZONTAL_CENTER:
      return { ...defaultStyles, top: "50%" };
    case HORIZONTAL_BOTTOM:
      return { ...defaultStyles, top: "84%" };
    case DIAGONAL_TOPLEFT_BOTTOMRIGHT:
      return {
        ...defaultStyles,
        top: "50%",
        transform: "rotate(45deg)",
      };
    case DIAGONAL_TOPRIGHT_BOTTOMLEFT:
      return {
        ...defaultStyles,
        top: "50%",
        transform: "rotate(-45deg)",
      };
    default:
      return {};
  }
};

const getLineStyles = (orientation: Orientation) =>
  ({
    position: "absolute",
    backgroundColor: "silver",
    width: orientation === "vertical" ? "2px" : "100%",
    height: orientation === "horizontal" ? "2px" : "100%",
  } as const);

export const Grid = ({
  children,
  winnerLine,
  winner,
}: {
  children: React.ReactNode;
  winnerLine: WinnerLine;
  winner?: Winner;
}) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      position: "relative",
      height: "270px",
      width: "270px",
    }}
  >
    <div style={{ ...getLineStyles("vertical"), left: "33%" }}></div>
    <div style={{ ...getLineStyles("vertical"), right: "33%" }}></div>
    <div
      style={{
        ...getLineStyles("horizontal"),
        top: "33%",
      }}
    ></div>
    <div
      style={{
        ...getLineStyles("horizontal"),
        bottom: "33%",
      }}
    ></div>
    {winnerLine && (
      <div style={getWinnerLineStyles({ winnerLine, winner })}></div>
    )}
    {children}
  </div>
);
