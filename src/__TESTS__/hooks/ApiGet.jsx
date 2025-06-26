import useFetch from "@src/hooks/useFetch"
import useLocalStorage from "@src/hooks/useLocalStorage";

export const ApiGet = () => {
   const {data,error} =  useFetch("")
  // const [token,setToken] = useLocalStorage("token","jh")
  //  console.log(data);
  return (
    <>
      <div>ApiGet</div>
      {
          data && null
        //   <img src={} alt="" />
          
      }


        {/* ///////// useLocalStorage */}

      {/* <b>{token}</b>
      <br />
      <button onClick={()=>{setToken("ok")}}>SET</button> */}

      </>
  )
}
