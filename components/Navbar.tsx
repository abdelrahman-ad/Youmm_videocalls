import Image from "next/image"
import Link from "next/link"
import MobileNav from "./MobileNav"
import { SignedIn, UserButton } from "@clerk/nextjs"

  

interface IProps {

}

const Navbar =({}:IProps)=>{

    return(
        <nav className="flex-between  z-50  w-full bg-dark-1 px-6 py-4 lg:px-10">
            <Link href={'/'} className="flex items-center gap-1">
                <Image src={'/icons/logo.svg'} width={32} height={32} alt="Yoom logo" className="max-sm:size-10" />
                <p className="text-[26px] text-white max-sm:hidden">Yoom</p>
            </Link>
            <div className="flex-between gap-5">
                {/* clerk */}
                <SignedIn>
                  <UserButton />
                </SignedIn>

                
                <MobileNav/>
            </div>
        </nav>
    )
}

export default Navbar