"use client";
import * as React from "react";
import clsx from "clsx";
import { Marker } from "./tictactoe";

interface Props {
  onClick: React.MouseEventHandler;
  marker: Marker;
  disabled?: boolean;
}

export const Cell = ({ marker, onClick, disabled }: Props) => {
  return (
    <>
      <button
        disabled={disabled}
        onClick={(event) => {
          onClick(event);
        }}
        style={{ height: "90px", fontSize: "32px" }}
        className={clsx({
          "font-bold border border-transparent hover:border-gray-300 hover:bg-gray-100":
            !disabled,
          "text-lime-500": marker === "X",
          "text-rose-500": marker === "O",
        })}
      >
        {marker}
      </button>
    </>
  );
};
