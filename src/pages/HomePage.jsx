import React, { useState,useEffect } from 'react';
import './pagestyles/home.css'; // Assuming you have a CSS file for styling

import GlobeWithLocation from '../components/GlobePart'; // Adjust the import path as necessary

import Card from '../components/Cards';
import ScrollDown from '../components/scrolldown';

const data = {
    foods: [
        {
            name: "Masor Tenga",
            description: "A quintessential Assamese sour fish curry. The tangy flavor is derived from ingredients like tomatoes, elephant apple (ou tenga), or lemon, making it a light and refreshing dish."
        },
        {
            name: "Khaar",
            description: "A unique traditional dish made using an alkaline extract from sun-dried banana peels. It's often prepared with raw papaya, pulses, or fish and has a very distinct, earthy taste."
        },
        {
            name: "Pitha",
            description: "A variety of rice cakes that are a staple during festivals like Bihu. They can be sweet or savory, with popular versions like Til Pitha (rice crepes with sesame filling) and Ghila Pitha (fried rice flour cakes)."
        }
    ],
    destinations: [
        {
            name: "Pobitora Wildlife Sanctuary",
            description: "Located a short drive from Chandrapur, this sanctuary is known for having one of the highest densities of one-horned rhinoceroses in the world. It offers excellent wildlife viewing opportunities without the crowds of larger parks."
        },
        {
            name: "Chandubi Lake",
            description: "A serene natural lake formed by the great earthquake of 1897. Surrounded by deep forests and small villages of the Rabha tribe, it's a perfect spot for boating, bird watching, and experiencing local tribal culture."
        },
        {
            name: "Topatoli",
            description: "A lesser-known village area near the Brahmaputra River offering scenic views, especially during sunrise and sunset. It provides a glimpse into the rural riverine life of Assam, away from commercial tourist spots."
        }
    ],
    sentances: {
        localLanguage: "Assamese",
        hello: "Nomoskar",
        thankyou: "Dhonyobad",
        nice: "Dhuniya"
    },
    pokemon: {
        name: "Rhyhorn",
        description: "A popular Pokémon from the region known for its rock-hard skin and powerful charge attack. compared to the one horn Rhino"
    }
};


export default function HomePage() {

    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        var pokemonName = data.pokemon.name.toLowerCase();

        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(res => res.json())
        .then(data => {
            const imageUrl = data.sprites.front_default;
            setPokemon(imageUrl);
            console.log(imageUrl); // 👉 https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png
        });
    }, []); // Empty dependency array to run only once on mount


    return (
        <>
            <ScrollDown />
        <div className="home-page">
            <main className="home-main">
                <GlobeWithLocation />
            </main>

            <div className='info-section'>
                <div className='row'>
                    <h2 className="section-title">🍽️ Local Foods</h2>

                   {data.foods.map((food, idx) => (
                        <Card
                            key={`food-${idx}`}
                            title={food.name}
                            description={food.description}
                            
                        />
                    ))}

                </div>

                <div className='row'>
                    <h2 className="section-title">🌍 Destinations</h2>

                     {data.destinations.map((dest, idx) => (
                        <Card
                            key={`dest-${idx}`}
                            title={dest.name}
                            description={dest.description}
                            
                        />
                    ))}
                </div>
                <div className='row'>
                    <h2 className="section-title">Vocab for {data.sentances.localLanguage}</h2>
                    
                    <Card
                        title="Greating"
                        description={`Hello : ${data.sentances.hello}`}
                    />
                    <Card
                        title="Gratitude"
                        description={`Thankyou : ${data.sentances.thankyou}`}
                    />
                    <Card
                        title="Appreciation"
                        description={`Nice : ${data.sentances.nice}`}
                    />
               
                </div>
                <Card
                    title="Pokémon of the Region"
                    image={pokemon}
                    description={data.pokemon.description || "A popular Pokémon from the region."}
                />
            </div>
            <footer>
                <p className="footer-text">© 2025 Globular Info. Submission for Call2Code.</p>
            </footer>
        </div>
        </>
    );
}