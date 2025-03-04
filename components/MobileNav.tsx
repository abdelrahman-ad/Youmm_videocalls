'use client'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { SidebarLinks } from "@/constant"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
interface IProps {

}

const MobileNav =({}:IProps)=>{
    const pathname =usePathname()

    return(
        <section className="w-full max-w-[264px]">
         <Sheet  >
            <SheetTrigger >
                <Image
                   src={'/icons/hamburger.svg'}
                  alt="hamburger icon"
                  width={36}
                  height={36}
                  className="cursor-pointer sm:hidden"
                  />
            </SheetTrigger>
              <SheetContent side={"left"} className="w-[264px] sm:w-[264px]   border-none bg-dark-1">
                   <Link href={'/'} className="flex items-center gap-1">
                     <Image src={'/icons/logo.svg'} width={32} height={32} alt="Yoom logo" className="max-sm:size-10" />
                       <p className="text-[26px] text-white max-sm:hidden">Yoom</p>
                     </Link>

                  <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-auto  ">
                    <SheetClose asChild>
                       <section className="flex h-full gap-4 flex-col pt-16 text-white">
                          {SidebarLinks.map((link)=>{
                             const isActive = pathname === link.route 
                              return (
                                <SheetClose asChild key={link.route}>
                               <Link href={link.route}
                                 key={link.label}
                                   className={cn ('flex gap-4 items-center p-4  rounded-lg w-full max-w-60',{
                                  'bg-blue-1 ': isActive
                                    })}
                                 >
                                <Image src={link.imgUrl} alt={link.label} width={24} height={24} />
                  
                                <p className="flex  text-lg font-semibold ">
                                   {link.label}
                                </p>
                     
                                 </Link>
                                 </SheetClose>
                                 )
                                })}
                        </section>
                    </SheetClose>

                   </div>
               </SheetContent>
           </Sheet>

        </section>
    )
}

export default MobileNav