// REACT
import React, { useState, useEffect } from "react";
// COMPONENTES
import Quantity from "../../components/calendar/quantity";
// CSS
import "../../styles/global.css";
import "../../styles/calendar.css";
// ICONOS TEMPORALES
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faAngleDown, faCartShopping, faAngleUp } from "@fortawesome/free-solid-svg-icons";


// Componente esqueleto para cuando se está cargando la información
const SkeletonLoader = () => (
  <tr>
    <td className="!text-left !lg:pl-4">
      <div className="animate-pulse h-4 w-2/5 bg-gray-300 rounded"></div>
    </td>
    <td >
      <div className="animate-pulse h-4 w-1/5 bg-gray-300 rounded flex justify-end lg:mx-auto"></div>
    </td>
    <td>
      <div className="animate-pulse h-4 w-1/5 bg-gray-300 rounded lg:mx-auto"></div>
    </td>
    <td>
      <div className="animate-pulse h-4 w-1/5 bg-gray-300 rounded lg:mx-auto"></div>
    </td>
  </tr>
);

const CustomTable = ({ loading, post, openModal, openModalBookNow }) => {
  const [selectedQuantities, setSelectedQuantities] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [showCart, setShowCart] = useState(true);

  // Efecto para desplegar el carrito en dispositivos moviles
  useEffect(() => {
    const storedCart = localStorage.getItem('cartProducts');
    if (storedCart) {
      setCartProducts(JSON.parse(storedCart));
    }
    const handleResize = () => {
      setShowCart(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      localStorage.removeItem('cartProducts');
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Efecto para inicializar las cantidades seleccionadas cuando se carga la lista de productos
  useEffect(() => {
    if (post && Array.isArray(post)) {
      setSelectedQuantities(post.map((_, index) => (typeof post[index] === 'number' ? 1 : 1)));
    }
  }, [post]);

  // Función para decrementar la cantidad de un producto
  const decrement = (rowIndex) => {
    setSelectedQuantities(prevQuantities => {
      const updatedQuantities = [...prevQuantities];
      if (updatedQuantities[rowIndex] > 1) {
        updatedQuantities[rowIndex] -= 1;
      }
      return updatedQuantities;
    });
  };

  // Función para cambiar la cantidad de un producto
  const quantityChange = (newQuantity, rowIndex) => {
    setSelectedQuantities(prevQuantities => {
      const updatedQuantities = [...prevQuantities];
      updatedQuantities[rowIndex] = newQuantity;
      return updatedQuantities;
    });
  };

  // Función para incrementar la cantidad de un producto
  const increment = (rowIndex) => {
    setSelectedQuantities(prevQuantities => {
      const updatedQuantities = [...prevQuantities];
      updatedQuantities[rowIndex] += 1;
      return updatedQuantities;
    });
  };

  // Función para alternar la visibilidad del carrito en dispositivos móviles
  const toggleContentCart = () => {
    setShowCart(!showCart);
  };

  // Función para agregar un producto al carrito
  const addToCart = (dayObject, quantity) => {
    const existingProductIndex = cartProducts.findIndex(product => product.ProductName === dayObject.ProductName);
    if (existingProductIndex !== -1) {
      const updatedCart = [...cartProducts];
      updatedCart[existingProductIndex].quantity += quantity;
      setCartProducts(updatedCart);
      localStorage.setItem('cartProducts', JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cartProducts, { ...dayObject, quantity }];
      setCartProducts(updatedCart);
      localStorage.setItem('cartProducts', JSON.stringify(updatedCart));
    }
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (index) => {
    const updatedCart = [...cartProducts];
    updatedCart.splice(index, 1);
    setCartProducts(updatedCart);
    localStorage.setItem('cartProducts', JSON.stringify(updatedCart));
  };

  return (
    <div className="container">
      <div className="flex lg:flex-row flex-col">
        <table className="w-[60%] table">
          <thead>
            <tr>
              <th className="w-2/5">PRODUCT</th>
              <th className="w-1/5">QUANTITY</th>
              <th className="w-1/5">PRICE</th>
              <th className="w-1/5"></th>
            </tr>
          </thead>
          <tbody>
            {loading || !post || !Array.isArray(post) ? (
              Array.from({ length: 5 }).map((_, index) => <SkeletonLoader key={index} />)
            ) : (
              post.map((dayObject, index) => (
                <tr key={index}>
                  <td className="!text-left !lg:pl-4">
                    <p className="text-lg lg:text-base lg:text-sm font-semibold">
                      <button className="rounded-lg mr-2 buttonInfoModal bg-blue-500 text-white" onClick={() => openModal(dayObject)}>
                        i
                        {/* <FontAwesomeIcon icon={faCircleInfo} className="text-blue-500 text-base" /> */}
                      </button>
                      {dayObject.ProductName}
                    </p>
                  </td>

                  <td data-aria-label="Quantity" className="my-auto">
                    <Quantity
                      value={selectedQuantities[index]}
                      onDecrement={() => decrement(index)}
                      onChange={(newQuantity) => quantityChange(newQuantity, index)}
                      onIncrement={() => increment(index)}
                    />
                  </td>

                  <td data-aria-label="Price">
                    <p className="text-lg">
                      <sup className="text-xs">$ </sup>
                      {dayObject.Price * selectedQuantities[index]}
                      <sup className="text-xs">.00</sup>
                    </p>
                  </td>

                  <td>
                    <button className="ml-auto lg:mx-auto group flex cursor-pointer select-none items-center justify-center rounded-md bg-red-500 px-2 py-1 text-white text-sm transition hover:bg-red-600" onClick={() => { addToCart(dayObject, selectedQuantities[index]); openModalBookNow(dayObject); }}>
                      <p className="group flex items-center justify-center rounded text-center">
                        BOOK NOW
                      </p>
                      {/* <p className="flex-0 group-hover:w-4 h-6 w-0 transition-all"> </p> */}
                      {/* <FontAwesomeIcon icon={faArrowRight} className="flex-0 group-hover:w-4 ml-2 h-6 w-0 transition-all" /> */}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>




        <div className="lg:ml-10 w-full lg:w-[40%] lg:relative fixed bottom-0">
          <div className="bg-white shadow max-h-[50vh] lg:max-h-[90%] overflow-y-auto">

            <div className="flex p-1 bg-gray-900 prueba">

              {/* ORDER AND TOTAL */}
              <div className="w-2/5 max-w-3/5 mr-4 flex flex-col prueba-g">
                <div className="my-auto">
                  <p className="pl-1 text-lg font-semibold text-white">
                    Summary Order
                  </p>
                </div>
                <div className="my-auto flex justify-between">
                  <p className="pl-1 text-lg text-white">
                    Total:
                  </p>
                  <p className="pr-1 text-lg text-white">
                    $ {cartProducts.reduce((total, product) => total + product.Price * product.quantity, 0)}
                  </p>
                </div>
              </div>

              {/* PRICE AND DROP */}
              <div className="w-1/5 flex prueba-g">
                <button className="mx-auto rounded text-white" onClick={toggleContentCart}>
                  {showCart ? (
                    <FontAwesomeIcon icon={faAngleDown} />
                  ) : (
                    <FontAwesomeIcon icon={faAngleUp} />
                  )}
                </button>
              </div>

              {/* GO TO CART */}
              <div className="w-1/3 flex prueba-g">
                <div className="frame flex ">
                  <button className="mx-auto border custom-btn btn-cart">
                    <span><FontAwesomeIcon icon={faCartShopping} /></span>
                    <span>GO TO CART</span>
                  </button>
                </div>
              </div>

            </div>


            {showCart && (
              <div className="lg:py-2 lg:px-2">
                {cartProducts.map((product, index) => (
                  <ul key={index}>
                    <li className="flex flex-col space-y-3 pt-5 lg:pt-3 pb-3 text-left sm:flex-row sm:space-x-5 sm:space-y-0 border-b">
                      <div className="relative flex flex-1 flex-col">
                        <div>
                          <div className="pr-5 lg:pr-3">
                            <p className="font-semibold lg:text-sm text-gray-900">
                              {product.ProductName}
                            </p>
                            <p className="mt-1 text-sm text-gray-400">
                              DATE
                            </p>
                          </div>
                          <div className="mt-2 flex">
                            <p className="flex-1 text-sm">
                              ( x{product.quantity} )
                            </p>
                            <p className="flex-1 font-semibold text-gray-900 text-right">
                              <sup>$ </sup>
                              {product.Price * product.quantity}
                              <sup>.00</sup>
                            </p>
                          </div>
                        </div>
                        <div className="absolute top-0 right-0 flex top-auto">
                          <button className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900" onClick={() => removeFromCart(index)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                    </li>
                  </ul>
                ))}
                <div className="mt-6 lg:mt-0 border-b py-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">Subtotal</p>
                    <p className="text-sm font-semibold text-gray-900">
                      <sup>$ </sup>
                      {cartProducts.reduce((total, product) => total + product.Price * product.quantity, 0)}
                      <sup>.00</sup>
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">Taxes & fees</p>
                    <p className="text-sm font-semibold text-gray-900">
                      <sup>$ </sup>
                      0
                      <sup>.20</sup>
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    <span className="text-xs font-normal text-gray-400">USD </span>
                    {cartProducts.reduce((total, product) => total + product.Price * product.quantity, 0)}
                    <sup className="text-xs">.20 </sup>
                  </p>
                </div>
                <div className="mt-6 pb-2 text-center">
                  <div className="frame">
                    <button className="custom-btn btn-cart"><span><FontAwesomeIcon icon={faCartShopping} /></span><span>GO TO CART</span></button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>





        
        {/* // ORIGINAL
        <div className="lg:ml-10 w-full lg:w-[40%] lg:relative fixed bottom-0">
          <div className="bg-white shadow max-h-[50vh] lg:max-h-[90%] overflow-y-auto">
            <div className="flex py-4 justify-center bg-gray-900 prueba">
              <h2 className="text-2xl w-1/3 lg:w-full font-bold text-white prueba-g">
                Order Summary
              </h2>
              <p className="lg:hidden w-1/3 font-bold text-white">
                {cartProducts.reduce((total, product) => total + product.Price * product.quantity, 0)}
              </p>

              <button className="flex items-center ml-2 rounded text-white justify-center lg:hidden" onClick={toggleContentCart}>
                {showCart ? (
                  <FontAwesomeIcon icon={faAngleDown} className="pl-1.5 pr-1.5" />
                ) : (
                  <FontAwesomeIcon icon={faAngleUp} className="pl-2 pr-2" />
                )}
              </button>
            </div>
            {showCart && (
              <div className="lg:py-2 lg:px-2">
                {cartProducts.map((product, index) => (
                  <ul key={index}>
                    <li className="flex flex-col space-y-3 pt-5 lg:pt-3 pb-3 text-left sm:flex-row sm:space-x-5 sm:space-y-0 border-b">
                      <div className="relative flex flex-1 flex-col">
                        <div>
                          <div className="pr-5 lg:pr-3">
                            <p className="font-semibold lg:text-sm text-gray-900">
                              {product.ProductName}
                            </p>
                            <p className="mt-1 text-sm text-gray-400">
                              DATE
                            </p>
                          </div>
                          <div className="mt-2 flex">
                            <p className="flex-1 text-sm">
                              ( x{product.quantity} )
                            </p>
                            <p className="flex-1 font-semibold text-gray-900 text-right">
                              <sup>$ </sup>
                              {product.Price * product.quantity}
                              <sup>.00</sup>
                            </p>
                          </div>
                        </div>
                        <div className="absolute top-0 right-0 flex top-auto">
                          <button className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900" onClick={() => removeFromCart(index)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                    </li>
                  </ul>
                ))}
                <div className="mt-6 lg:mt-0 border-b py-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">Subtotal</p>
                    <p className="text-sm font-semibold text-gray-900">
                      <sup>$ </sup>
                      {cartProducts.reduce((total, product) => total + product.Price * product.quantity, 0)}
                      <sup>.00</sup>
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">Taxes & fees</p>
                    <p className="text-sm font-semibold text-gray-900">
                      <sup>$ </sup>
                      0
                      <sup>.20</sup>
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    <span className="text-xs font-normal text-gray-400">USD </span>
                    {cartProducts.reduce((total, product) => total + product.Price * product.quantity, 0)}
                    <sup className="text-xs">.20 </sup>
                  </p>
                </div>
                <div className="mt-6 pb-2 text-center">
                  <div className="frame">
                    <button className="custom-btn btn-cart"><span><FontAwesomeIcon icon={faCartShopping} /></span><span>GO TO CART</span></button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div> */}




      </div>
    </div>
  );
};

export default CustomTable;