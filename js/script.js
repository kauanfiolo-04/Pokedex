const pokemonName=document.querySelector('.pokemon_name');
const pokemonNumber=document.querySelector('.pokemon_number');
const pokemonImage=document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

let searchPokemon = 1;

const buttonNext = document.querySelector('.btn_next');
const buttonPrev = document.querySelector('.btn_prev');



const fetchPokemon = async(pokemon) =>{
    const APIresponse= await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIresponse.status === 200){
        const data= await APIresponse.json();
        return data;
    }
}
const renderPokemon= async(pokemon)=>{
    pokemonName.innerHTML='Loading...';


    const data= await fetchPokemon(pokemon);

    if(data){
        pokemonImage.style.display='block';
    pokemonName.innerHTML=data.name;
    pokemonNumber.innerHTML=data.id;
    pokemonImage.src= data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value='';
    searchPokemon=data.id
    }else {
        pokemonName.innerHTML= 'Not found :c';
        pokemonNumber.innerHTML='';
        pokemonImage.style.display='none';
    }
}

form.addEventListener('submit', (event)=>{

    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    
});
function Prev(){
    if(searchPokemon>1){
        searchPokemon-=1;
        renderPokemon(searchPokemon);
    }
}
function Next(){
    searchPokemon+=1;
    renderPokemon(searchPokemon)
}


renderPokemon(searchPokemon)