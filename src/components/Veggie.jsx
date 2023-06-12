import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';

function Veggie() {
  const [viggie, setViggie] = useState([]);

  useEffect(() => {
    getViggie();
  }, []);

  const getViggie = async () => {
    const check = localStorage.getItem('viggie');
    if (check) {
      setViggie(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`
      );

      const data = await api.json();
      localStorage.setItem('viggie', JSON.stringify(data.recipes));
      setViggie(data.recipes);
    }
  };

  return (
    <Wrapper>
      <h3>Our Vegetarian Picks</h3>
      <Splide
        options={{
          perPage: 3,
          arrows: false,
          pagination: false,
          drag: true,
          gap: '5rem',
        }}
      >
        {viggie.length > 0
          ? viggie.map((recipe) => {
              return (
                <SplideSlide key={recipe.id}>
                  <Link to={'/recipe/' + recipe.id}>
                    <Card>
                      <p>{recipe.title}</p>
                      <img src={recipe.image} alt={recipe.title} />
                      <Gridiant />
                    </Card>
                  </Link>
                </SplideSlide>
              );
            })
          : null}
      </Splide>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gridiant = styled.div`
  position: absolute;
  z-index: 3;
  height: 100%;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), 0.1);
`;

export default Veggie;
