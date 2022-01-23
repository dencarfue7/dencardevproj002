
//target first the group that you want to manipulate with.
const container = document.querySelector('.container');

//because there are many class .seat, we have to use querySelecterAll.
//target only seat that are not occupied. 
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();
//add + in the movieSelect.value to change the data type to number, not string.
//use let because later on we want to change the ticketprice.
let ticketPrice = +movieSelect.value;

//Save selected movie and price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//functions goes here
function updateSelectedCountAndTotal(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    
    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}


//event listeners goes here
//get data from localStorage and populate ui
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }

    //check if there are data in our local storage - selectedmovieindex
    if (selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//Movie select event
movieSelect.addEventListener('change', (e)=>{
    ticketPrice = +e.target.value;
    
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCountAndTotal();
});

//seat select event
container.addEventListener('click', (e)=>{
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        //we use toggle because we want it to unselect. select unselect.
        e.target.classList.toggle('selected');

        updateSelectedCountAndTotal();
    }
});

//initial count and total set
updateSelectedCountAndTotal();