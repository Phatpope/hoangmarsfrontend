import { Navbar,Footer } from "../components" 
export default function Layout({ children }) {
  return (
    <>
        <div  className="bg-primary-black overflow-hidden">
        <Navbar />
      <main className="p-8 rounded">{children}</main>
      <Footer />

        </div>
    
    </>
  )
}