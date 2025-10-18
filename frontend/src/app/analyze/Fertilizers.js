import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';  // Import useRouter from next/router
import styles from './styles/Fertilizers.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const fertilizersData = [
  {  
    name: 'Compost', 
    image: '/images/compost.png', 
    type: 'Organic', 
    price: '₹ 100', 
  },
  { 
    name: 'Manure', 
    image: '/images/manure.png', 
    type: 'Organic', 
    price: '₹ 180',
  },
  { 
    name: 'Fish Emulsion', 
    image: '/images/fish_emulsion.png', 
    type: 'Organic', 
    price: '₹ 220', 
  },
  { 
    name: 'Seaweed Extract', 
    image: '/images/seaweed.png', 
    type: 'Organic', 
    price: '₹ 250', 
  },
  { 
    name: 'NPK Fertilizer', 
    image: '/images/npk.png', 
    type: 'Inorganic', 
    price: '₹ 200', 
  },
  { 
    name: 'Potassium Fertilizer', 
    image: '/images/potash.png', 
    type: 'Inorganic', 
    price: '₹ 280', 
  },
  { 
    name: 'Copper Fungicide', 
    image: '/images/copper_based_fungicides.png', 
    type: 'Inorganic', 
    price: '₹ 250', 
  },
  { 
    name: 'Insecticide', 
    image: '/images/insectiside.png', 
    type: 'Inorganic', 
    price: '₹ 150', 
  },
];

const Fertilizers = () => {
  const [fertilizers, setFertilizers] = useState([]);
  const [isClient, setIsClient] = useState(false); // Track if client-side rendering has occurred
  const router = useRouter(); // Initialize useRouter

  // Check if the component is mounted on the client-side
  useEffect(() => {
    setIsClient(true);  // This will only be set on the client
    setFertilizers(fertilizersData); // Populate fertilizers data
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleAddToCart = (fertilizerName) => {
    console.log(`${fertilizerName} added to cart`);
  };

  const handleShowShopsNearby = () => {
    if (isClient) {
      // Ensure the router is only used on the client-side
      router.push('/pharmacists'); // Navigate to /pharmacists page
    }
  };

  return (
    <div className={styles.container}>
      <h2>Recommended Agrochemicals</h2>
      <Slider {...settings}>
        {fertilizers.length > 0 ? (
          fertilizers.map((fertilizer, index) => (
            <div key={index} className={styles.fertilizerCard}>
              <img
                src={fertilizer.image}
                alt={fertilizer.name}
                className={styles.fertilizerImage}
              />
              <h3>{fertilizer.name}</h3>
              <p className={styles.fertilizerType}>{fertilizer.type}</p>
              <p className={styles.fertilizerPrice}>{fertilizer.price}</p>
              <button
                className={styles.addToCartBtn}
                onClick={() => handleAddToCart(fertilizer.name)}
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No fertilizers available.</p>
        )}
      </Slider>

      <button
        className={styles.showShopsBtn}
        onClick={handleShowShopsNearby}  // Add click handler
      >
        Show Shops Nearby
      </button>
    </div>
  );
};

export default Fertilizers;
