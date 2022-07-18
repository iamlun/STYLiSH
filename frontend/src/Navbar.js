import { Link } from "react-router-dom";
import logo from"./images/logo.png";
import cart from"./images/cart.png";
import member from"./images/member.png"
import {useSelector} from "react-redux";

const Navbar = () => {

    const cartnum=useSelector((state)=>state.cart.num);
    
    return (
        <div className="Navbar">
            <nav className="navbar">
            <Link to="/" >
            <img src={logo} alt="Logo" className="logo"/>
            </Link>
            <div className="category_wrapper">
            <Link to="/women/0" className="women">女裝</Link>
            <Link to="/men/0" className="men">男裝</Link> 
            <Link to="/acc/0" className="acc">配件</Link>
            </div>
            </nav>
            <input type="text" />
            <Link to="/cartpage">
            <img src={cart}  type="button" className="cart" alt="cartlogo">
            </img>
            <div className="cart_num">{cartnum}</div>
            </Link>
            <Link to="/user">
            <img src={member}  type="button" className="member" alt="userlogo"/>
            </Link>
        </div>
       
     );
}
 
export default Navbar;
