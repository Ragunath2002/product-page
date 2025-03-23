import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function App() {

  const [cart, setcart] = useState([]);
  const [loading, setloading] = useState(true);
  const [searchterm, setsearchterm] = useState('');
  const [filtercategory, setfiltercategory] = useState('All');
  const [sortoption, setsortoption] = useState();

  const products = [
    { id: 1, name: 'Sweaters', category: 'Clothing', description: 'Stay warm and fashionable with our womens sweaters! Easy-care and machine washable.', price: 700, image: require('./images/sweaters.jpg') },
    { id: 2, name: 'Gloves', category: 'Accessories', description: 'Equipped with touchscreen-compatible material on the thumb and index fingers.', price: 500, image: require('./images/gloves.jpg') },
    { id: 3, name: 'Mouse', category: 'Electronics', description: 'Wireless mouse with a rechargeable Li-ion battery. Plug & play with Auto-Sleep Feature.', price: 1500, image: require('./images/mouse.webp') },
    { id: 4, name: 'Earbuds', category: 'Electronics', description: 'Hi-Fi Quality Dual Drivers, 50dB Smart Active Noise Cancellation with 360 Spatial Audio Effect.', price: 250, image: require('./images/earbuds.webp') },
    { id: 5, name: 'Mouse', category: 'Electronics', description: 'The stylish and compact Zeb-Phero is a lightweight wired gaming mouse that is easily portable and can be used comfortably every day', price: 1400, image: require('./images/mouse1.webp') },
  ];

  const cartoption = (i) => {
    if (cart.includes(i)) {
      setcart((prevCart) => prevCart.filter((item) => item !== i));
      toast.info("Product removed from your cart", { theme: "dark", });
    }
    else {
      setcart((prevCart) => [...prevCart, i]);
      toast.success("Product added to  cart", { theme: "dark", });
    }
  }

  const sortedProducts = [...products].sort((a, b) => {
    if (sortoption === 'low') return a.price - b.price;
    if (sortoption === 'high') return b.price - a.price;
    if (sortoption === 'name-a-z') return a.name.localeCompare(b.name);
    if (sortoption === 'name-z-a') return b.name.localeCompare(a.name);
    return 0;
  });

  const filterdata = sortedProducts.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchterm.toLowerCase()) &&
      (filtercategory === 'All' || item.category === filtercategory)
    )
  }
  )

  useEffect(() => {
    setloading(true)
    setTimeout(() => setloading(false), 500);
  }, [sortoption]);

  return (
    <div className="App">
      <ToastContainer />

      {cart && cart.map((e) => (
        <>{e.price}</>
      ))}


      <div class="container text-center py-5">
        <div className='text-end' ><i className="zmdi zmdi-shopping-cart mx-1"></i> Cart : {cart.length}</div>
        <h1 className='mt-3' >Product card </h1>
        <span>Designs <i class="zmdi zmdi-favorite red"></i>  By: <strong>Ragunath</strong>
        </span>
      </div>


      <section className='my-5'>
        <div className="container">
          <div className="d-flex gap-2 flex-wrap mb-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchterm}
              onChange={(e) => setsearchterm(e.target.value)}
              className="form-control search-input"
            />
            <select
              value={filtercategory}
              onChange={(e) => setfiltercategory(e.target.value)}
              className="form-control form-select filter-select"
            >
              <option value="All">All Categories</option>
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
              <option value="Electronics">Electronics</option>
            </select>
            <select
              value={sortoption}
              onChange={(e) => setsortoption(e.target.value)}
              className="form-control form-select filter-select"
            >
              <option value="All">All</option>
              <option value="low">Low to high</option>
              <option value="high">High to low</option>
            </select>
          </div>
          <div className="row">
            {loading ?
              <div>Loading...</div> :
              filterdata.map((product, i) => (
                <div className="col-md-3 d-flex" key={product.id}>
                  <div className="box">
                    <div className="img_box">
                      <img src={product.image} alt={product.name} className='img-fluid' />
                    </div>
                    <div className="text_box">
                      <a className="butn"><span>Buy Now</span></a>
                      <h3 className='h3tag'>{product.name}</h3>
                      <p className='para'>{product.description}</p>
                      <div className='c_flx'>
                        <span className='price'>₹ {product.price}</span>
                        <span className={`ic_on ${cart.includes(i) ? 'added' : ''}`} onClick={() => cartoption(i)} ><i className="zmdi zmdi-shopping-cart"></i></span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>





    </div>
  );
}

export default App;

