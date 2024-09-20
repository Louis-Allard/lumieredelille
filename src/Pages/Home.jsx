import React from 'react';
import "../Styles/Home.scss";
import Carousel from '../Components/Carousel';

const Home = () => {
  return (
    <div class="content">
      <p className='textPresentation'>Le petit éditeur lillois qui a de la bouteille</p>
      <Carousel/>
    </div>
  );
};

export default Home;
