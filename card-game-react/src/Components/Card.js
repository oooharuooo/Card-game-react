import React from 'react';
import "./Card.css";

// const divStyle = {
//     color: 'blue',
//     backgroundImage: 'url(' + imgUrl + ')',
//   };
const Card = React.memo(({cardImg}) => {

    const rotate = {
        transform: `rotate(${Math.floor(Math.random() * 30)}deg)`
      };

    return (
            <img style={rotate} className="background" src={cardImg} alt ="card"/>
    )
    
})

export default Card;


