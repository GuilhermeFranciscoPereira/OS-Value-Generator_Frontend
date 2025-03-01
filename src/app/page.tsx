import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function Home(): React.ReactNode {
  return (
    <div className="content">
      <Sidebar></Sidebar>
      <div className="mainContent">
        <Header></Header>
      </div>
    </div>
  )
}