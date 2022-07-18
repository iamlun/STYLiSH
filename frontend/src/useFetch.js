
import { useState,useEffect } from "react";
const useFetch=(url)=>{
    
    const [data,setData]=useState(null);
    const [isLoading,setIsLoading]=useState(true);
    const [error,setError]=useState(null);

    const[next,setnext]=useState(null);

    useEffect(()=>{

        const abortCont=new AbortController();   
        
        fetch(url,{signal: abortCont.signal})
        .then(res=>{
            if(!res.ok){
                throw Error('could not fetch the data for the resource');
            }//res.ok==false means didn't connect to the url (maybe it doesn't exist)
            return res.json();
        })
        .then(data=>{
            setnext(next);
            setError(null);
            setData(data);
            setIsLoading(false);
        })
        .catch(err=>{
            if(err.name==='AbortError'){
                console.log('fetch aborted')
            }else{
                setIsLoading(false);
                setError(err.message);
            }
        })

        return ()=>abortCont.abort();

    },[url]);
    return {data,isLoading,error,next}

}

export default useFetch
