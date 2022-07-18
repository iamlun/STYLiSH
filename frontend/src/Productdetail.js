import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import pic from "./images/main.jpg";
import { useEffect, useState } from "react";

import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import { setCart } from "./reducers/CartNum";
const Productdetail = () => {

    //for redux
    const cartTotal=useSelector((state)=>state.cart.num);//How many rows in the cart
    const dispatch=useDispatch();
    
    const [sizeSelected,setSizeSelected]=useState(false);
    const [colorSelected,setColorSelected]=useState(false);

    const {id}=useParams();
    const {data:detail,isLoading,error,next}=useFetch(`http://18.177.103.189/api/v1/products/detail/${id}`)
    const [num,setNum]=useState(0);
    const minusClick=()=>{
        if(num>0){
            setNum(num-1);
        }
    }
    const plusClick=()=>{
        let stock=detail.amount.filter(function(n,i){
            return (size[i]&&color[i])
        })
        if((stock.length>0)&&(num<stock[0].count)){
            setNum(num+1);
        }
        else{
            console.log('out of stock');
            window.alert('商品缺貨中');
        }
    }
    const [color,setColor]=useState([0,0,0,0,0]);
    const colorClick=(index)=>{
        let newcolor=[0,0,0,0,0];
        if(color[index]===1){
            setColorSelected(false);
            setColor(newcolor);
            setSizeSelected(false);
            setSize(newcolor);

        }
        else{
            newcolor[index]=1;
            setColorSelected(true);
            setColor(newcolor);
        }
    }
    const [size,setSize]=useState([0,0,0,0,0]);
    const sizeClick=(index)=>{
        if(!colorSelected){
            window.alert('請先選擇顏色');
            return;
        }
        let newsize=[0,0,0,0,0];
        if(size[index]===1){
            setSizeSelected(false);
            setSize(newsize);
        }
        else{
            newsize[index]=1;
            setSizeSelected(true);
            setSize(newsize);
        }

    }
    const addcartClick=()=>{
        
        if(num===0){
            window.alert('選擇商品數量');
            return;
        }
        let c;
        let s;
        color.map((n,i)=>{
            if(n){
                detail.amount.map((nn,ii)=>{
                    if(i===ii){
                        c=nn.color_name;
                    }
                })
            }
        })
        size.map((n,i)=>{
            if(n){
                detail.amount.map((nn,ii)=>{
                    if(i===ii){
                        s=nn.size;
                    }
                })
            }
        })
        let stock=detail.amount.filter(function(n,i){
            return (size[i]&&color[i])
        })
        const cartitem=JSON.parse(localStorage.getItem('cart'));
        //console.log(cartitem);
        if(cartitem!==null){
            //console.log(cartitem.length);
        } 
        const newcartitem=[
            ...cartitem||[],
            { id:`${detail.prod.id}`,
            title:`${detail.prod.title}`,
            color:`${c}`,
            size:`${s}`,
            num:`${num}`,
            price:`${detail.prod.price}`,
            stock:`${stock[0].count}` }
        ];
        localStorage.setItem('cart',JSON.stringify(newcartitem));
        dispatch(setCart(cartTotal+1));
        window.alert('已加入購物車');
        return;
    }
    
   
    return (
        <div className="productdetail">
            {error && <div>{ error }</div>}
            { isLoading && <div>Loading...</div> }
            { detail && 
                <div className="detail">
                    <img src={`../assets/${detail.prod.id}.jpg`} alt={`${detail.prod.imgURL}`} />
                    <div className="info">
                        <span className="detail-title">{detail.prod.title}</span>
                        <br/><br/><br/>
                        <span className="detail-price">TWD. {detail.prod.price}</span>
                        <hr/>
                        <div className="detail-color">
                            <p>顏色 | </p>
                            {detail.amount.map((n,i)=>(
                                <div className="detail-color-display"  key={n.color}>
                                    {color[i] ?
                                    (<div onClick={()=>colorClick(i)} style={{backgroundColor:`${n.color}`,border:'burlywood solid 3px'}} ></div> ):
                                    (<div onClick={()=>colorClick(i)} style={{backgroundColor:`${n.color}`,border:`${n.color} solid 2px`}} ></div>)
                                    }
                                </div>
                            )) }
                        </div>
                        <div className="detail-size">
                            <p>尺寸 | </p>
                            {detail.amount.map((n,i)=>(
                                <div className={n.size}  key={n.size}>
                                    {size[i] ?
                                    (<div className="sizebtn"  onClick={()=>sizeClick(i)} style={{backgroundColor:'#333',color:'aliceblue'}}>{n.size}</div>):
                                    (<div className="sizebtn"  onClick={()=>sizeClick(i)} >{n.size}</div>)
                                    }
                                </div>
                            )) }
                        </div>
                        <div className="detail-amount">
                            <p>數量 | </p>
                            <div>
                                <div className="minus" onClick={minusClick}>-</div>
                                <p className="detail-amount-num">{num}</p>
                                <div className="plus" onClick={plusClick}>+</div>
                            </div>
                        </div>
                        {sizeSelected ?  <button className="addcart" onClick={()=>addcartClick()}>加入購物車</button> :<button className="addcart">選擇商品尺寸</button>}
                        <div className="detail-info">
                                <p>*實品顏色依單品照為主</p>
                                <br/><br/>
                                <p>棉 100%</p>
                                <p>厚薄：薄</p>
                                <p>彈性：無</p>
                                <br/><br/>
                                <p>素材產地/ {detail.prod.info}</p>
                                <p>加工產地/ {detail.prod.info}</p>
                        </div>
                    </div>
                </div> 
                
            }
        </div>
    );
}
 
export default Productdetail;