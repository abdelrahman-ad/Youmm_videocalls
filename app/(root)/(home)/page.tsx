import MeetingTypeList from "@/components/MeetingTypeList"

interface IProps {

}

const Home =({}:IProps)=>{
    const now = new Date()
    const time= now.toLocaleTimeString('en-us' ,{hour:'2-digit',minute:'2-digit'})  //time now 
     const date =(new Intl.DateTimeFormat('en-us',{dateStyle:"full"})).format(now)  //full date now day month year 
    return(
        <section className="flex size-full flex-col gap-10 text-white">
           <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover" >
               <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11 ">                
                 <h2 className="glassmorphism  w-[270px]  rounded py-2 text-center text-base font-normal" >Upcoming meeting at :12:30 PM</h2>
                
                 <div className="flex flex-col gap-2"> 
                    <h1 className="text-4xl font-extrabold lg:text-5xl" >{time}</h1>
                    <p className="text-2xl  font-medium text-sky-1 lg:text-2xl ">{date} </p>
                 </div>
               </div>
           </div>

         <MeetingTypeList/>
        </section>
    )
}

export default Home