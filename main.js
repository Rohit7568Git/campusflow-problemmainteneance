// 1. Load seats from LocalStorage or initialize
let seats = JSON.parse(localStorage.getItem("seats")) || [];
if (seats.length === 0) {
    for (let i = 1; i <= 50; i++) {
        seats.push({ seatNumber: i, status: "vacant", bookedBy: "" });
    }
    localStorage.setItem("seats", JSON.stringify(seats));
}

// 2. Render seats
function renderSeats() {
    const container = document.getElementById("seat-container");
    container.innerHTML = "";

    seats.forEach(seat => {
        const div = document.createElement("div");
        div.textContent = seat.seatNumber;
        div.className = "seat";
        // Color coding
        div.style.backgroundColor =
            seat.status === "vacant" ? "white" :
            seat.status === "occupied" ? "green" :
            seat.status === "expiring" ? "yellow" : "red";

        // Click to book
        div.onclick = () => bookSeat(seat.seatNumber);

        container.appendChild(div);
    });
}

// 3. Book seat function
function bookSeat(number) {
    const name = prompt("Enter your name to book seat " + number);
    if (!name) return;

    seats = seats.map(seat => {
        if (seat.seatNumber === number && seat.status === "vacant") {
            seat.status = "occupied";
            seat.bookedBy = name;
        }
        return seat;
    });

    localStorage.setItem("seats", JSON.stringify(seats));
    renderSeats();
}

// 4. Initial render
renderSeats();