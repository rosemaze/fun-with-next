import { TicTacToe } from "@/tic-tac-toe/tictactoe";

export default function Home() {
  return (
    <main className="font-semibold flex min-h-screen flex-col items-center justify-between p-24">
      <div className="italic" />
      <TicTacToe />
    </main>
  );
}
