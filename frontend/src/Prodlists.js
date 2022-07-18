import { Link } from "react-router-dom";
import pic from "./images/main.jpg";
const Prodlists = ({prods}) => {
    const getcolor=(id)=>{
        let c=prods.colors.filter(function(color){return color.id===id});
        let temp=[];
        c.map((t,i)=>{
            if(i>0){
                temp[i]=t.color;
               for(let k=i-1;k>=0;k--){
                    if(temp[k]===t.color){
                        temp[i]=null;
                        break;
                    }
               }
            }else{
                temp[i]=t.color;
            }
        })
        return temp;
    }
    return ( 
        <div className="blog-list">
            <div className="blog-box">
            {prods.product.slice(0,3).map((prod,i)=>(
                <div className="blog-preview" key={prod.id}>
                    <Link to={`/detail/${prod.id}`}>
                    <img src={`../assets/${prod.id}.jpg`}></img>
                    <div className="blog-color">
                    {getcolor(prod.id).map((n,i)=>(
                        <div  key={i} style={{backgroundColor:`${n}`,border:`${n} solid 2px`}}></div>
                    ))}
                    </div>
                    <h2>{prod.title}</h2>
                    <p>TWD.{prod.price}</p>
                    </Link>   
                </div>
            ))}
            </div>
            <div className="blog-box">
            {prods.product.slice(3,6).map((prod,i)=>(
                <div className="blog-preview" key={prod.id}>
                    <Link to={`/detail/${prod.id}`}>
                    <img src={`../assets/${prod.id}.jpg`}></img>
                    <div className="blog-color">
                    {getcolor(prod.id).map((n,i)=>(
                        <div  key={i} style={{backgroundColor:`${n}`,border:`${n} solid 2px`}}></div>
                    ))}
                    </div>
                    <h2>{prod.title}</h2>
                    <p>TWD.{prod.price}</p>
                    </Link>   
                </div>
            ))}
            </div>
       {prods.product[0].category && prods.nextpage && <Link to={`/${prods.product[0].category}/${prods.nextpage}`} className="nextbtn">next</Link>}
        </div>
     );
}
 
export default Prodlists;