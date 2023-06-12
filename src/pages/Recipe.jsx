import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Params, useParams } from 'react-router-dom';

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [acitveTav, setActiveTab] = useState('instructions');

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );

    const detailData = await data.json();
    setDetails(detailData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
      </div>

      <Info>
        <Button
          className={acitveTav === 'instructions' ? 'active' : ''}
          onClick={() => setActiveTab('instructions')}
        >
          Instaruction
        </Button>
        <Button
          className={acitveTav === 'ingreients' ? 'active' : ''}
          onClick={() => setActiveTab('ingreients')}
        >
          Ingredients
        </Button>
        {acitveTav === 'instructions' && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}
        {acitveTav === 'ingreients' && (
          <ul>
            {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;

  .active {
    color: white;
    background: linear-gradient(35deg, #493939, #313131);
  }

  h2 {
    margin-bottom: 2rem;
  }

  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }

  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background-color: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
  cursor: pointer;
`;

const Info = styled.div`
  margin-left: 10rem;
`;

export default Recipe;
