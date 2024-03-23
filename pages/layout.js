import { Navbar,Footer } from "../components" 
import InsightRoll from "../components/about/InsightRoll"

const insights = [
  "Khuyến Mãi Sôc Lên Đến 20%",
  "Sale Tết Và Quà Tặng Cực Hơi",
  "99% Khách Hàng Hài Lòng",
  "20K+ Subscribers",
  "Authorized Store",
  "Uy Tín Trách Nhiệm 📝",
  "Hỗ Trợ Bảo Hành Tận Tâm.🏆",
];

export default function Layout({ children }) {
  return (
    <>
        <div  className="bg-primary-black overflow-hidden">
          
        <Navbar />
        <InsightRoll insights={insights} />

      <main className="p-8 rounded">{children}</main>
      <Footer />

        </div>
    
    </>
  )
}