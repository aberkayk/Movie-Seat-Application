const container = document.querySelector('.container');
const count = document.querySelector('#count');
const amount = document.querySelector('#amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage();
calculateTotal();

// Adding event listener to the each seat div to add or remove selected class
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected');
        calculateTotal();
    }
});

// Price calculation for each movie selection
select.addEventListener('change', (e) => {
    calculateTotal();
})

// Price calculation function
function calculateTotal() {
    const selectedSeats = container.querySelectorAll('.seat.selected');

    // Create an empty array for selected seats and all seats
    let selectedSeatsArr = [];
    let seatsArr = [];

    // Push seat informations into the arrays
    selectedSeatsArr = [...selectedSeats];
    seatsArr = [...seats];

    // Get index information of selected seats
    let selectedSeatsIndexs = selectedSeatsArr.map((seat) => {
        return seatsArr.indexOf(seat);
    })

    console.log(selectedSeatsIndexs);
    
    // Calculate total price with respect to ticket price and total selected seat number and render them to the screen
    let selectedSeatCount = container.querySelectorAll('.seat.selected').length;
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value;

    saveToLocalStorage(selectedSeatsIndexs);
}

// Get selected seat and movie information from localStorage
function getFromLocalStorage(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats != null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex != null){
        select.selectedIndex = selectedMovieIndex;
    }
}

// Save selected seats and movie index to the local storage
function saveToLocalStorage(indexs){
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);
}