'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useToast } from "./ui/use-toast"
import HomeCard from "./HomeCard"
import MeetingModal from "./MeetingModal"
import { Textarea } from "./ui/textarea"
import ReactDatePicker from 'react-datepicker';
import Loader from "./Loader"
import { Input } from "./ui/input"


interface IProps {

}

const MeetingTypeList =({}:IProps)=>{
    const {toast}=useToast()
    const [value ,setValue]=useState({
        description : '',
        link : '',
        dateTime: new Date(),
    }) 
    const [callDetails , setCallDetails]=useState<Call>()
    const router =useRouter()
    const {user} =useUser()
    const client =useStreamVideoClient()
     
    const[meetingState ,setMeetingState]=useState< 'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined > ()
    const createMeeting =async ()=>{
    if(!client || !user) return;
     try {
        if (!value.dateTime) {
            toast({ title: 'Please select a date and time' });
            return;
          }
         const id =crypto.randomUUID();
         const call =client.call('default',id)
         const startAt =value.dateTime.toISOString() || new Date(Date.now()).toISOString()
         const description =value.description|| "Instant meeting"

         await call.getOrCreate({
            data:{
                starts_at:startAt,
                custom:{
                    description
                }
            }
         }) 
         if(!call) throw new Error('faild to create call')

         setCallDetails(call)
         if(!value.description){router.push(`/meeting/${call.id}`)}
         toast({
            title: 'Meeting Created',
          });
     }   catch (error) {
        toast({ title: "Faild to create meeting",  })
           
        
        }
    }
    if (!client || !user) return <Loader />;
    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
 
    return(
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2  xl:grid-cols-4 "  >
         <HomeCard
         img={'/icons/add-meeting.svg'}
         title={"New Meeting"}
         description={"start an instant meeting"}
         handelClick={()=>setMeetingState('isInstantMeeting')}
         className="bg-orange-1"
         />

         <HomeCard
           img={'/icons/schedule.svg'}
           title={"Schedule Meeting"}
           description={"plan your meeting"}
           handelClick={()=>setMeetingState('isScheduleMeeting')}
           className="bg-blue-1"
         />

         <HomeCard
           img={'/icons/recordings.svg'}
           title={"View recordings "}
           description={"check your recordings"}
           handelClick={() => router.push('/recording')}
           className="bg-purple-1"
         />
         <HomeCard
           img={'/icons/join-meeting.svg'}
           title="Join Meeting"
           description="via invtation link"
           handelClick={() => setMeetingState('isJoiningMeeting')}
           className="bg-yellow-1"
         />

         {!callDetails ?(
           <MeetingModal
           isOpen={meetingState === 'isScheduleMeeting'}
           onClose={()=>setMeetingState(undefined)}
           title="Create meeting"
           handleClick={createMeeting}
           > 
            <div className="flex flex-col gap-2">
              <label className="text-base text-normal leading-[22px] text-sky-2">Add a description</label>
              <Textarea className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e)=>setValue({...value , description: e.target.value})}
              />
            </div>
            <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={value.dateTime}
              onChange={(date) => setValue({ ...value, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
           </MeetingModal>
         ):(
          <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={()=>setMeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          buttonText="Copy Meeting link"
          handleClick={()=>{
          navigator.clipboard.writeText(meetingLink)
            toast({title:"Link copied"})
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          />
         )}
         
         <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(value.link)}
         >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValue({ ...value, link: e.target.value })}
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        </MeetingModal>

         <MeetingModal
         isOpen={meetingState === 'isInstantMeeting'}
         onClose={()=>setMeetingState(undefined)}
         title="Start an Instant Meeting"
         className="text-center"
         buttonText="Start Meeting"
         handleClick={createMeeting}
         />
        </section>
    )
}

export default MeetingTypeList