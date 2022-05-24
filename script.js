const boardWidth = 6; // constante de columnas del tablero
const boardHeight = 5; // constante de filas del tablero
const main = document.createElement('main'); // contenedor main

const boardContainer = document.createElement('div'); // constante contenedora de los divs del tablero
main.appendChild(boardContainer);
boardContainer.classList.add('boardContainer');

function generateBoardBlock() { //  funcion que crea cada div deltablero(celdas)
    const divGrid = document.createElement('div');
    divGrid.classList.add('divGrid');
    boardContainer.appendChild(divGrid);
}

function drawBoard(containerClass, width, height) {
    document.body.appendChild(containerClass);
    containerClass.classList.add('main');
    for (let i = 0; i < width * height; i++) {
        generateBoardBlock()
    };
}
drawBoard(main, boardWidth, boardHeight);

let squares = Array.from(document.querySelectorAll('.boardContainer > div')) //seleccionamos y metems en un array los 30 divs del tablero

let block1, block2;

document.getElementById("formulario").addEventListener("submit", function (e) {
    e.preventDefault();

    block1 = {
        id: 0,
        orientation: e.target.orientation1.value,
        x: e.target.x1.value,
        y: e.target.y1.value,
        x: e.target.x1.value,
        length: e.target.length1.value
    };
    block2 = {
        id: 1,
        orientation: e.target.orientation2.value,
        x: e.target.x2.value,
        y: e.target.y2.value,
        x: e.target.x2.value,
        length: e.target.length2.value
    };

    Array.from(document.querySelectorAll('.blockDrawed')).map(a => a.classList.remove('blockDrawed'));
    Array.from(document.querySelectorAll('.redBlock')).map(a => a.classList.remove('redBlock'));

    drawBlocks(block1);
    drawBlocks(block2);
});

let current;
let overlap;

function drawBlocks(block) {

    current = parseInt((5 - block.y) * 6) + parseInt(block.x);

    if (block.orientation === 'h') {
        if ((parseInt(block.x) + parseInt(block.length)) > 7) {
            console.log('La pieza se sale del tablero');

            const element = document.getElementById('message');
            if (element) {
                element.remove();
            };

            const message = document.createElement(`h2`);
            const text = document.createTextNode(`La pieza ${block.id + 1} se sale del tablero`);
            message.appendChild(text);
            main.appendChild(message);
            message.classList.add('message');
            message.setAttribute('id', 'message');

        } else {
            squares.forEach((a, i) => {
                if (i >= (current - 1) && (i < (parseInt(current) + (parseInt(block.length) - 1)))) {
                    if (a.classList.contains('blockDrawed')) {
                        overlap = true;
                    } else {
                        a.classList.add('blockDrawed');
                    }
                }
            })
        }
    } else {
        console.log(parseInt((5 - block.y) * 6) + parseInt(block.x)); //este es current
        if ((parseInt(block.y) + parseInt(block.length)) > 6) {
            console.log('La pieza se sale del tablero');

            const element = document.getElementById('message');
            if (element) {
                element.remove();
            };

            const message = document.createElement(`h2`);
            const text = document.createTextNode(`La pieza ${block.id + 1} se sale del tablero`);
            message.appendChild(text);
            main.appendChild(message);
            message.classList.add('message');
            message.setAttribute('id', 'message');

        } else {
            squares.forEach((a, i) => {
                if ((i <= (current - 1)) && (((i + 1) % 6) === parseInt(block.x)) && (i >= (current - 6 * block.length))) {
                    if (a.classList.contains('blockDrawed')) {
                        overlap = true;
                    } else {
                        a.classList.add('blockDrawed');
                    }
                }
            })
        }
    }
    areOverlap()
}

function areOverlap() {
    if (overlap) {
        Array.from(document.querySelectorAll('.blockDrawed')).map(a => a.classList.add('redBlock'))

        const element = document.getElementById('message');
        if (element) {
            element.remove();
        };

        const message = document.createElement(`h2`);
        const text = document.createTextNode('Los bloques se solapan');
        message.appendChild(text);
        main.appendChild(message);
        message.classList.add('message');
        message.setAttribute('id', 'message');

    }
}


