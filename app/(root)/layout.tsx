import Navbar from "@/components/Navbar"
import StreamVideoProvider from "@/providers/StreamClientProvider"
import { Sidebar } from "lucide-react"
import { ReactNode } from "react"
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "YOOM",
    description: "Video calling App",
    icons: {
      icon: "/icons/logo.svg",
    },
  };

const RootLayout =({children}:Readonly<{children: ReactNode}>)=>{

    return(
        <main  >
         <StreamVideoProvider>
             {children}
         </StreamVideoProvider>   
        </main>
    )
}

export default RootLayout