import React from 'react';
import Heart from '../icons/Heart';
import HalfHeart from '../icons/HalfHeart';

const GenerateHearts = (props) => {
  const wholeHearts = new Array(Math.floor(props.hearts)).fill('heart');
  const halfHearts = props.hearts - Math.floor(props.hearts);

  return (
    <span className="hearts">
      {wholeHearts.map((element,index) => {
        return <Heart key={index}/>;
      })}
      {halfHearts === 0.5 ? <HalfHeart /> : <span />}
    </span>
  );
};

export default GenerateHearts;
