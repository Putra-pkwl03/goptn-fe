"use client";
import Hero from "./components/home/Hero";
import EnteranceInfor from "./components/home/EntranceInfor";
import PremiumFeature from "./components/home/PremiumFeature";
import Footer from "./components/home/Footer";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const handleStart = () => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  return (
    <main className="">
      <Hero onStart={handleStart}/>
      <EnteranceInfor onNotify={handleStart}  />
      <PremiumFeature />
      <Footer />
    </main>
  );
}
