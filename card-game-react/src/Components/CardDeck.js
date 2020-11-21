import React from 'react';
import axios from 'axios';
import Card from './Card';
import "./CardDeck.css"

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
        try{
            const imgUrl = `${baseUrl}${this.state.deckID}/draw/`;
            const {data : {cards, remaining, success}} = await axios.get(imgUrl);
            if(!success) {
                throw new Error("No card remaining")
            }
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
    } catch (err) {
        alert(err);
     }
    }
    resetHandler = async () => {
        const {data: {deck_id}} = await axios.get(`${baseUrl}new/shuffle`);
        this.setState({ 
            deckID: deck_id,
        drawCard: [],
        remaining: 52})
    }
    render() {
        const cardDetails = this.state.drawCard.map(c => <Card key = {c.id} cardImg = {c.imgCard}/>
            )
        return (
            <div className="center">
                <div className="button-container">
                    <button onClick={this.resetHandler}>Card Reset</button>
                    <button onClick={this.cardHandler}>Pick Card</button>
                </div>
                <div>
                    {cardDetails}
                </div>
            </div>
        )
    }
    
}

export default CardDeck
