"use client";
import * as React from "react";
import { Marker } from "./tictactoe";

interface Props {
  onClick: React.MouseEventHandler;
  marker: Marker;
  disabled?: boolean;
}

export const Cell = ({ marker, onClick, disabled }: Props) => {
  const textColor = `text-${marker === "X" ? "lime" : "rose"}-500`;

  return (
    <>
      <button
        disabled={disabled}
        onClick={(event) => {
          onClick(event);
        }}
        style={{ height: "90px", fontSize: "32px" }}
        className={
          disabled
            ? textColor
            : `font-bold ${textColor} border border-transparent hover:border-gray-300 hover:bg-gray-100`
        }
      >
        {marker}
      </button>
    </>
  );
};
