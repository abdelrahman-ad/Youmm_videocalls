import CallList from "@/components/CallList"

interface IProps {

}

const Previous =({}:IProps)=>{

    return(
        <section className="flex size-full flex-col gap-10">
        <h1 className="text-3xl font-bold" >
        Previous
        </h1>
        <CallList type="ended" />
    </section>
    )
}

export default Previous