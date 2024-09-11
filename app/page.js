'use client';
import Pokemon from "@/components/Pokemon";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  // store data. update when it is changed
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    generatePokemon()
  }, []);

  async function click(index) {
    console.log(index)

    let current = data[index]
    let other = 0;

    if (index == 0) {
      other = 1;
    }

    let otherObj = data[other];

    if (current.weight > otherObj.weight) { 
      console.log("Winner winner chicken dinner!!!!");
      // console.log(await getPokemon())
      let newPokemon = [...data, await getPokemon()];
      newPokemon.splice(other, 1);
      setData(newPokemon);
      setCounter(counter + 1);
    }
    else {
      console.log("WRONG!");
      
    }
  }

  async function getPokemon() {
    let randID = Math.floor(Math.random() * 1000) + 1;

    let url = `https://pokeapi.co/api/v2/pokemon/${randID}/`;
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  }

  async function generatePokemon() {
    console.log("hello world");

    // variables
    let randID1 = Math.floor(Math.random() * 1000) + 1;
    let randID2;

    // ensure no duplicates
    do {
      randID2 = Math.floor(Math.random() * 1000) + 1;
    } while (randID1 == randID2);
    
    // list of ids
    let idList = [randID1, randID2];

    let pokemons = [];

    // get pokemons
    for(let id of idList) {
      let url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
      const resp = await fetch(url);
      const data = await resp.json();
      pokemons.push(data);
    }
    setData(pokemons);

  }



  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1> which one is heavier?!!!?</h1>
      <h2>Points:{counter}</h2>
      <section className="flex md:flex-row flex-col">
      { 
        data.map((pokemon, index) => {
          return <Pokemon name={pokemon.name} image = {pokemon.sprites.front_default} weight = {pokemon.weight} clicked = {click} index = {index} />
        })
      }
      </section>
  

    </main>
  );
}
