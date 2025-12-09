import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import { KampusSection } from "../components/kampus/KampusSection";
import { getKampus } from "@/lib/kampus/kampus";

export default async function Page() {
  const kampus = await getKampus();

  return (
    <>
      <Navbar />
      <KampusSection kampusList={kampus} />
      <Footer />
    </>
  );
}
