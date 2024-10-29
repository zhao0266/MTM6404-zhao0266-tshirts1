// Ensure React and ReactDOM are accessible
const { useState } = React;
const { render } = ReactDOM;

// TshirtStore and TshirtCard Components (code from the previous response)

const TshirtStore = () => {
  const [tshirts, setTshirts] = useState([
    { title: 'Blue T-Shirt', image: 'blue-t-shirt.jpg', price: 7.99, stock: 4 },
    { title: 'Bright Purple T-Shirt', image: 'bright-purple-t-shirt.jpg', price: 5.99, stock: 1 },
    { title: 'Cobalt Blue T-Shirt', image: 'cobalt-blue-t-shirt.jpg', price: 9.99, stock: 5 },
    { title: 'Green T-Shirt', image: 'green-t-shirt.jpg', price: 6.99, stock: 0 },
    { title: 'Grey T-Shirt', image: 'blue-t-shirt.jpg', price: 4.99, stock: 2 },
    { title: 'Light Green T-Shirt', image: 'light-green-t-shirt.jpg', price: 7.99, stock: 4 },
    { title: 'Purple T-Shirt', image: 'purple-t-shirt.jpg', price: 7.99, stock: 0 },
    { title: 'Red T-Shirt', image: 'red-t-shirt.jpg', price: 6.99, stock: 3 },
    { title: 'Teal T-Shirt', image: 'teal-t-shirt.jpg', price: 7.99, stock: 2 },
  ]);

  const handleBuy = (index, quantity) => {
    setTshirts((prevTshirts) =>
      prevTshirts.map((tshirt, i) =>
        i === index
          ? { ...tshirt, stock: tshirt.stock - quantity }
          : tshirt
      )
    );
  };

  return (
    <div>
      {tshirts.map((tshirt, index) => (
        <TshirtCard
          key={index}
          tshirt={tshirt}
          onBuy={(quantity) => handleBuy(index, quantity)}
        />
      ))}
    </div>
  );
};

const TshirtCard = ({ tshirt, onBuy }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  return (
    <div className="tshirt-card">
      <h3>{tshirt.title}</h3>
      <img src={tshirt.image} alt={tshirt.title} width="150" />
      <p>Price: ${tshirt.price.toFixed(2)}</p>
      {tshirt.stock > 0 ? (
        <>
          <p>Stock: {tshirt.stock}</p>
          <select value={quantity} onChange={handleQuantityChange}>
            {[...Array(tshirt.stock).keys()].map((n) => (
              <option key={n + 1} value={n + 1}>
                {n + 1}
              </option>
            ))}
          </select>
          <button onClick={() => onBuy(quantity)}>Buy</button>
        </>
      ) : (
        <p>Out of Stock</p>
      )}
    </div>
  );
};

// Render the TshirtStore component into the "root" div in your HTML file
render(<TshirtStore />, document.getElementById('root'));
