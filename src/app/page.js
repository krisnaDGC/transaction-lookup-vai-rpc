import Image from "next/image";
import TransactionPage from "../../components/TransactionPage";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <TransactionPage/>
    </main>
  );
}
