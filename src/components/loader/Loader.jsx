import { useLoaderStore } from "../../libs/zustand";
import {DNA} from 'react-loader-spinner'

export default function Loader() {
    const { loading } = useLoaderStore()
    return loading ?
        <div className="h-screen w-screen fixed flex justify-center items-center backdrop-blur-sm">
            <DNA visible={true} height="120"  width="120"  ariaLabel="dna-loading"  wrapperStyle={{}}  wrapperClass="dna-wrapper"/>
        </div> : null

}