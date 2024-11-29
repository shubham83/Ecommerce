import React from 'react'
import "./Carts.css"
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart,removeCart,removerSingleItem,emptyCart } from '../redux/features/cart_Slice';
import toast from 'react-hot-toast';


function CartDetails() {
    const {carts} =useSelector((state)=>state.allCart);
    const [totalprice, settotalprice] = useState(0)
    const [totalqnty, settotalqnty] = useState(0)
    const dispatch = useDispatch();
    
    const handleIncrement=(e)=>{
        dispatch(addToCart(e))
    }
    const handleDecrement=(e)=>{
        dispatch(removeCart(e))
        toast.success("Item remove to Your Cart")
    }
    const handleSinlgeDec=(e)=>{
        dispatch(removerSingleItem(e))
    }
    const handleEmptyCart=()=>{
        dispatch (emptyCart())
        toast.success("Your Cart is Empty Now" )
    }
    const total =()=>{
        let totalprice =0
        carts.map((ele,ind)=>{
            totalprice= ele.price * ele.qnty + totalprice
        });
        settotalprice(totalprice)
    }

    const countqnty =()=>{
        let totalqnty =0
        carts.map((ele,ind)=>{
            totalqnty=  ele.qnty + totalqnty
        });
        settotalqnty(totalqnty)
    }

    useEffect(() => {
     total()
    }, [total])
    
    useEffect(() => {
        countqnty()
       }, [countqnty])
    return (
        <>
            <div className='row justify-content-center m-0'>
                <div className='col-md-8 mt-5 mb-5 cardsdetails'>
                    <div className='card'>
                        <div className="card-header bg-dark p-3">
                            <div className='card-header-flex'>

                                <h5 className='text-white m-0'>Cart Calculation{carts.length>0?`(${carts.length})`:""}</h5>
                                {
                                    carts.length > 0 ? <button className='btn btn-danger mt-0 btn-sm' onClick={handleEmptyCart} ><i class="fa-solid fa-trash"></i> <span>Empty Cart</span></button> : ""
                                }
                            </div>
                        </div>
                        <div className="card-body p-0">
                            {
                                carts.length === 0 ? <table className='table cart-table mb-0'>
                                    <tbody>
                                        <tr>
                                            <td colSpan={6}>
                                                <div className='cart-empty'>
                                                    <i className="fa-solid fa-cart-shopping"></i>
                                                    <p>Your Cart is Empty</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>

                                </table> :
                                    <table className='table cart-table mb-0 table-responsive-sm'>
                                        <thead>
                                            <tr>
                                                <th>Action</th>
                                                <th>Product</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Qty</th>
                                                <th className='text-right amount'><span id="amount" >Total Amount</span></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {carts.map((data, index) => {
                                                return (

                                                    <>
                                                        <tr>
                                                            <td>
                                                                <button className='prdct-delete' onClick={()=>handleDecrement(data.id)}><i class="fa-solid fa-trash"></i></button>
                                                            </td>
                                                            <td>
                                                                <div className='product-img'>
                                                                    <img src={data.imgdata} alt="" />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className='product-name'>
                                                                    <p>{data.dish}</p>
                                                                </div>
                                                            </td>
                                                            <td>{data.price}</td>
                                                            <td>
                                                                <div className="prdct-qty-container">
                                                                    <button className='prdct-qty-btn' onClick={data.qnty <=1?()=>handleDecrement(data.id) :()=>handleSinlgeDec(data)} type='button'><i class="fa-solid fa-minus"></i></button>
                                                                    <input type="text" className='qty-input-box' value={data.qnty} disabled />
                                                                    <button className='prdct-qty-btn' onClick={()=>handleIncrement(data)} type='button'><i class="fa-solid fa-plus"></i></button>
                                                                </div>
                                                            </td>
                                                            <td className='text-right'> {data.qnty*data.price}</td>
                                                        </tr>
                                                    </>
                                                ) 
                                            })}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th>&nbsp;</th>
                                                <th colSpan={3}>&nbsp;</th> 
                                                <th>Items In Cart <span className='ml-2 mr-2'>:</span><span className='text-danger'>{totalqnty}</span></th>     
                                                <th className='text-right'>Total Price<span className='ml-2 mr-2'>:</span><span className='text-danger'>{totalprice}</span></th>     

                                            </tr>
                                        </tfoot>
                                    </table>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartDetails