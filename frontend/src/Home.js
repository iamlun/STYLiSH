import { useParams } from "react-router-dom";
import Advertise from "./Advertise";
import Prodlists from "./Prodlists";
import useFetch from "./useFetch";

const Home = () => {
    const {page}=useParams();
    const {data:prods,isLoading,error,next}=useFetch(`http://18.177.103.189/api/v1/products/women?paging=${page}`);
    return ( 
        <div className="home">
            {error && <div> {error} </div>}
            {isLoading && <div>Loading...</div>}
            {prods && <Advertise />}
            {prods && <Prodlists prods={prods} />}
        </div>
     );
}
 
export default Home;
