import StartPage from "@/components/StartPage";
import Toolbar from "@/components/Toolbar";
import UserPicker from "@/components/UserPicker";

export default function Home() {
  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center gap-4 border-b border-zinc-200 bg-zinc-100 px-4 py-2">
        <Toolbar />
        <UserPicker />
      </header>
      <main className="flex-1 overflow-auto bg-white">
        <StartPage />
      </main>
    </div>
  );
}
