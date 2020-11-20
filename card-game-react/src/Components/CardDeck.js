import React from 'react';
import axios from 'axios';
import Card from './Card';
const baseUrl = `https://deckofcardsapi.com/api/deck/`
class CardDeck extends React.Component {

    state = {
        deckID: "",
        drawCard: [],
        remaining: 52
    }

    async componentDidMount() {
        const {data: {deck_id}} = await axios.get(`${baseUrl}new/shuffle`);
        this.setState({deckID:deck_id});
    }

    cardHandler =  async () => {
        const imgUrl = `${baseUrl}${this.state.deckID}/draw/`;
        const {data : {cards, remaining}} = await axios.get(imgUrl);
        const card = cards[0];
        this.setState(st => ({
            drawCard: [
                ...st.drawCard,
                {id:card.code,imgCard:card.image,}
                ],
            remaining: remaining
            }
        )
    )
}
    render() {
        const cardDetails = this.state.drawCard.map(c => <Card key = {c.id} cardImg = {c.imgCard}/>
            )
        return (
            <div>
            <button onClick={this.cardHandler}>Pick Card</button>
               {cardDetails}
            </div>
        )
    }
    
}

export default CardDeck
