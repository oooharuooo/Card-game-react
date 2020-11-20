import React from 'react';
import axios from "axios";

class Card extends React.Component {

    render() {
        return (
            <img src={this.props.cardImg} />
        )
    }
}

export default Card;
