/* eslint-disable no-undef */

import pic from './images/main.jpg'
import rm from './images/cart-remove.png'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { rmCart } from './reducers/CartNum';
import { useEffect } from 'react';
import './Cartpage.css';

const Cartpage = () => {
    
    const dispatch=useDispatch();//rudux

    useEffect(() => {
        TPDirect.setupSDK(
          '12348',
          'app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF',
          'sandbox'
        );
        TPDirect.card.setup({
          fields: {
            number: {
              element: '#card-number',
              placeholder: '**** **** **** ****',
            },
            expirationDate: {
              element: '#card-expiration-date',
              placeholder: 'MM / YY',
            },
            ccv: {
              element: '#card-ccv',
              placeholder: '後三碼',
            },
          },
          styles: {
            '.valid': {
              color: 'green',
            },
            '.invalid': {
              color: 'red',
            },
          },
        });
      }, []);

    const[reload,setReload]=useState(false);
    const cartitem=JSON.parse(localStorage.getItem('cart'));
    let totalprice=0;
    let cartnum=[];
    let cartStock=[];
    //order info
    const [name, setName] =useState('');
    const [email, setEmail] =useState('');
    const [phone, setPhone] =useState('');
    const [address, setAddress] =useState('');
    const [time, setTime] =useState();
    
    if(cartitem){
        cartitem.map((item,i)=>{
            totalprice+=(item.price*item.num);
            cartStock[i]=item.stock;
            cartnum[i]=item.num;
        })
        //console.log(cartStock);
    }
     const rmClick=(i)=>{
        const newCartItems = cartitem.filter(
            (_, index) => index !== i
          );
          localStorage.setItem('cart', JSON.stringify(newCartItems));
          window.alert('已刪除商品');
          dispatch(rmCart());
          setReload(~reload);
     }
    const handlecartnum=(n,i)=>{
        if(cartStock[i]<n){
            window.alert('商品數量不足');
            return;
        }
        const newCartItems = cartitem.map((item, index) =>
        index === i
        ? {
            ...item,
            num: n,
          }
        : item
        );
        localStorage.setItem('cart', JSON.stringify(newCartItems));
        window.alert('已修改數量');
        setReload(~reload);
    }
    const handlecheckout=()=>{
        if(!name){
            window.alert('請填寫收件人姓名!');
            return;
        }
        else if(!email){
            window.alert('請填寫電子郵件!');
            return;
        }
        else if(!phone){
            window.alert('請填寫手機號碼!');
            return;
        }
        else if(!address){
            window.alert('請填寫地址!');
            return;
        }
        else if(!time){
            window.alert('請選取配送時間!');
            return;
        }

        fetch('http://localhost:8080/api/v1/profile',{
            method:'GET'
        })
        .then((res)=>{
            console.log(res);
            if(res.status===201){
                window.alert('請先登入，將跳轉至登入頁面');
                window.location.href="./user";
                return;
            }
            else if(res.status===200){
                if (!TPDirect.card.getTappayFieldsStatus().canGetPrime) {
                    window.alert('付款資料輸入有誤');
                    return;
                }
        
                TPDirect.card.getPrime((result) => {
                    if (result.status !== 0) {
                      window.alert('付款資料輸入有誤');
                      return;
                    }
                    window.localStorage.setItem('cart', JSON.stringify([]));
                    window.alert('付款成功');
                    window.location.href="./";
                    return;
                });
            }
            //return res.json();
        })
        // .then((user)=>{
        //     console.log(user);
        // })
        .catch((err)=>{
            console.log(err);
            window.alert('系統錯誤，請聯繫客服');
            return;
        })

        
        
    }
    return (
        <div className="cartpage">
            <span className="cartpage-header-title">購物車</span>
            <span className="cartpage-header-amount">數量</span>
            <span className="cartpage-header-price">單價</span>
            <span className="cartpage-header-total">小計</span>
            { cartitem && <div className="cartpage-all">
                {cartitem.map((cart,i)=>(
                    cart.num!==0 &&<div className="cartpage-list" key={i}>
                        <img  className="cartpage-pic" src={`../assets/${cart.id}.jpg`}></img>
                        <div className="cartpage-info">
                            <p>{cart.title}</p><br/><br/>
                            <p>顏色 ｜ {cart.color}</p>
                            <p>尺寸 ｜ {cart.size}</p>
                        </div>
                        <select type="number" className="cartpage-num" value={cart.num} required onChange={(e)=>handlecartnum(e.target.value,i)}>
                            {(Number(cart.num)-2)>0 ? <option>{Number(cart.num)-2}</option>:null}
                            {(Number(cart.num)-1)>0 ? <option>{Number(cart.num)-1}</option>:null}
                            <option>{cart.num}</option>
                            {(Number(cart.num)+1)<cart.stock ? <option>{Number(cart.num)+1}</option>:null}
                            {(Number(cart.num)+2)<cart.stock ? <option>{Number(cart.num)+2}</option>:null}
                        </select>
                        <div className="cartpage-price">NT.{cart.price}</div>
                        <div className="cartpage-total">NT.{cart.price*cart.num}</div>
                        <img  className="cartpage-delete" src={rm} alt="rm" onClick={()=>rmClick(i)}></img>
                    </div>
                ))}
            </div>}
            <div className="cartpage-shipment">
                <div className="cartpage-shipment-country">配送國家 </div>
                    <select defaultValue="taiwan" className="shipment-selector">
                        <option alue="taiwan">台灣及離島</option>
                    </select>
                <div className="cartpage-shipment-payment">付款方式 </div>
                    <select defaultValue="credit_card" className="shipment-selector">
                        <option value="credit_card">信用卡</option>
                    </select>
            </div>
            <div className="cartpage-notice">
                <p>※ 提醒您：</p>
                <p>● 選擇宅配-請填寫正確收件人資訊，避免包裹配送不達</p>
                <p>● 選擇超商-請填寫正確收件人姓名(與證件相符)，避免無法領取</p>
            </div><br/><br/>
            <div className="form">
                <div className="form__title">訂購資料</div><hr className="form__title-line" />
                <div className="form__field">
                <div className="form__field-name">收件人姓名</div>
                <input
                    className="form__field-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="form__note">
                務必填寫完整收件人姓名，避免包裹無法順利簽收
                </div>
                <div className="form__field">
                <div className="form__field-name">Email</div>
                <input
                    className="form__field-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="form__field">
                <div className="form__field-name">手機</div>
                <input
                    className="form__field-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}/>
                </div>
                <div className="form__field">
                <div className="form__field-name">地址</div>
                <input
                    className="form__field-input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}/>
                </div>
                <div className="form__field">
                <div className="form__field-name">配送時間</div>
                <div className="form__field-radios">
                    <label className="form__field-radio">
                    <input
                        type="radio"
                        checked={time === 'morning'}
                        onChange={(e) => {
                        if (e.target.checked) setTime('morning');
                        }}/>{' '}08:00-12:00
                    </label>
                    <label className="form__field-radio">
                    <input
                        type="radio"
                        checked={time === 'afternoon'}
                        onChange={(e) => {
                        if (e.target.checked) setTime('afternoon');
                        }}/>{' '}14:00-18:00
                    </label>
                    <label className="form__field-radio">
                    <input
                        type="radio"
                        checked={time === 'anytime'}
                        onChange={(e) => {
                        if (e.target.checked) setTime('anytime');
                        }}/>{' '}不指定
                    </label>
                </div>
                </div>
            </div>
            <br/>
            <div className="form">
                <div className="form__title">付款資料</div>
                <div className="form__field">
                    <div className="form__field-name">信用卡號碼</div>
                    <div className="form__field-input" id="card-number"></div>
                </div>
                <div className="form__field">
                    <div className="form__field-name">有效期限</div>
                    <div className="form__field-input" id="card-expiration-date"></div>
                </div>
                <div className="form__field">
                    <div className="form__field-name">安全碼</div>
                    <div className="form__field-input" id="card-ccv"></div>
                </div>
            </div>
            <div className="cartpage_total">
                    <div className="total__name">總金額</div>
                    <div className="total__nt">NT.</div>
                    <div className="total__amount">{totalprice}</div>
            </div>
            <div className="cartpage_freight">
                    <div className="freight__name">運費</div>
                    <div className="total__nt">NT.</div>
                    <div className="total__amount">30</div>
            </div>
            <div className="cartpage_payable">
                <div className="payable__name">應付金額</div>
                <div className="total__nt">NT.</div>
                <div className="total__amount">{totalprice + 30}</div>
            </div>
            <button className="checkout-button" onClick={handlecheckout}>前往付款</button>
        </div>
    );
}
 
export default Cartpage;