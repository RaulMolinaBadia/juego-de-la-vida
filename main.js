// Selectors
let cells = document.querySelectorAll(".cell");

// Variables
let columns = 20;
let rows = 20;
let isActive = true;

// Functions
const NumAliveCells = (r, c) => {
    let numAliveSurroundingCells = 0;
    for (let row = -1; row < 2; row++) {
        for (let column = -1; column < 2; column++) {
            try {
                let cell = board.children[row + r].children[c + column];
                if (!(row == 0 && column == 0)) {
                    if (cell.classList.contains("alive")) {
                        numAliveSurroundingCells++;
                    }
                }
            } catch {}
        }
    }
    return numAliveSurroundingCells;
};
const VerifyCellsState = () => {
    if (isActive == true) {
        let changeCells = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                let cell = board.children[r].children[c];
                let aliveCells = NumAliveCells(r, c);
                if (!cell.classList.contains("alive")) {
                    if (aliveCells >= 3) {
                        changeCells.push(cell);
                    }
                } else if (cell.classList.contains("alive")) {
                    if (aliveCells < 2 || aliveCells > 3) {
                        changeCells.push(cell);
                    }
                }
            }
        }
        changeCells.forEach((cell) => {
            ChangeState(cell);
        });
    }
};

const ChangeState = (cell) => {
    cell.classList.toggle("alive");
};

const ShowBoard = () => {
    board.innerHTML = "";
    rows = document.getElementById("rows").value;
    columns = document.getElementById("columns").value;
    for (let r = 0; r < rows; r++) {
        let row = document.createElement("div");
        row.classList.add("row");
        row.setAttribute("id", "row" + r);
        document.getElementById("board").append(row);
        for (let c = 0; c < columns; c++) {
            let newDiv = document.createElement("div");
            newDiv.setAttribute("id", r + "-" + c);
            newDiv.classList.add("cell");
            newDiv.addEventListener("click", () => {
                ChangeState(newDiv);
            });
            document.getElementById("row" + r).append(newDiv);
        }
    }
};

// addEventListeners
document.getElementById("createBoard").addEventListener("click", ShowBoard);
document.getElementById("startGame").addEventListener("click", () => {
    setInterval(() => VerifyCellsState(), 500);
});
document.getElementById("pauseGame").addEventListener("click", () => {
    isActive = isActive ? false : true;
});
