import Header from "@/components/Header";
import MainSection from "@/components/MainSection";
import Sidebar from "@/components/Sidebar";

export default function Home(): React.ReactNode {
  return (
    <div className="content">
      <Sidebar></Sidebar>
      <div className="mainContent">
        <Header></Header>
        <MainSection></MainSection>
      </div>
    </div>
  )
}