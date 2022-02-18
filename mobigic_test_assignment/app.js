/*   to Form a Grid of row*column   */

var m = prompt("Enter Number of Rows", "0");
var n = prompt("Enter Number of Columns", "0");
var num1 = parseInt(m);
var num2 = parseInt(n);
let tbl = document.getElementById("searchtext");
for (let i = 0; i < num1; i++) {
    let myRow = document.createElement("tr"); // to create rows of a grid
    myRow.id = "row" + i;
    myRow.className = "grid-items"
    tbl.appendChild(myRow);
    let rowN = document.getElementById("row" + i)
    for (let j = 0; j < num2; j++) {
        let myCell = document.createElement("td") // to create column of a grid
        myCell.className = "grid-item"
        rowN.appendChild(myCell);

        /* to Add Alphabets in each Grid Dynamically  */
        for (let node of document.querySelectorAll("td")) {
            if (node.textContent != "") continue;
            node.textContent = prompt("enter alphabets ")


        }

    }
}

/* fUNCTION TO FIND WORD IN GRID*/


var columnCount = num2; // NUMBER OF COLUMNS
var rowCount = num1; // NUMBER OF ROWS
var itemCount = columnCount * rowCount; // TOTAL NUMBER OF ALPHABETS IN GRID
/*    TO SEARCH WORD IN A GRID*/
function search() {
    clearHighlights();
    var text = document.getElementById("query").value;
    var firstLetterPositions = findLetterPositions(text[0]);
    for (let i = 0; i < firstLetterPositions.length; i++) {
        var initialPos = firstLetterPositions[i];
        tryAndMatchRight(text, initialPos);
        tryAndMatchDown(text, initialPos);
        tryAndMatchUpRight(text, initialPos);
    }
}
// FUNCTION TO SEARCH WORD FROM  LEFT TO RIGHT
function tryAndMatchRight(text, initialPos) {

    var x = initialPos.x;
    var y = initialPos.y;
    if (x + text.length > columnCount) {
        return;
    }
    var wholeWordFound = true;
    var wordIndices = [];
    wordIndices.push(initialPos);
    for (var x2 = 1; x2 < text.length; x2++) {
        var pos = { x: x + x2, y: y };
        if (text[x2].toLowerCase() !== getLetterAtPos(pos).toLowerCase()) {
            wholeWordFound = false;
            break;
        }
        wordIndices.push(pos);
    }
    if (wholeWordFound) {
        highLightIndices(wordIndices);
    }
}
// FUNCTION TO SEARCH WORD FROM  TOP TO BOTTOM
function tryAndMatchDown(text, initialPos) {
    var x = initialPos.x;
    var y = initialPos.y;
    if (y + text.length > rowCount) {
        return;
    }
    var wholeWordFound = true;
    var wordIndices = [];
    wordIndices.push(initialPos);
    for (var y2 = 1; y2 < text.length; y2++) {
        var pos = { x: x, y: y + y2 };
        if (text[y2].toLowerCase() !== getLetterAtPos(pos).toLowerCase()) {
            wholeWordFound = false;
            break;
        }
        wordIndices.push(pos);
    }
    if (wholeWordFound) {
        highLightIndices(wordIndices);
    }
}

// FUNCTION TO SEARCH WORD IN DIGONAL (SOUTH-EAST)
function tryAndMatchUpRight(text, initialPos) {
    var x = initialPos.x;
    var y = initialPos.y;
    if (x + text.length > columnCount || y - text.length > 0) {
        return;
    }
    var wholeWordFound = true;
    var wordIndices = [];
    wordIndices.push(initialPos);
    for (var z2 = 1; z2 < text.length; z2++) {
        var pos = { x: x + z2, y: y - z2 };
        if (text[z2].toLowerCase() !== getLetterAtPos(pos).toLowerCase()) {
            wholeWordFound = false;
            break;
        }
        wordIndices.push(pos);
    }
    if (wholeWordFound) {
        highLightIndices(wordIndices);
    }
}
// FUNCTION TO  CLEAR HIGHLIGHTED PART AFTER SERACH COMPLETE
function clearHighlights() {
    var items = getGridItems();
    for (let i = 0; i < items.length; i++) {
        removeClass(items[i], 'sel');
    }
}

function getGridItems() {
    return document.getElementsByClassName("grid-item") // TO GET ALPHABETS FROM GRID BY CLASSNAME
}

function getGridItem(pos) {
    var items = getGridItems(); // ITEMS RETURN VALUE AS ARRAY SO WE NEED TO CONVERT POSITION {X,Y} TO INDEX
    return items[posToIndex(pos)];
}

function indexToPos(index) {
    var y = Math.floor(index / columnCount);
    var x = index - y * columnCount;
    return { x: x, y: y };
}

function posToIndex(pos) {
    return pos.y * columnCount + pos.x;
}

function getLetterAtPos(pos) {
    var res = getGridItem(pos).innerHTML;
    return res;
}
// TO FIND THE POSTION OF LETTER OF THE WORD
function findLetterPositions(letter) {
    var positions = []; // EMPTY ARRAY TO RECEIVE POSTION OF LETTER
    for (var i = 0; i < itemCount; i++) {
        var pos = indexToPos(i);
        //TO CONVERT ALL LETTERS TO LOWER CASE AND COMPARE
        if (getLetterAtPos(pos).toLowerCase() === letter.toLowerCase()) {
            positions.push(pos);
        }
    }
    return positions;
}

function addClass(elem, className) {
    var classNames = arr = elem.className.split(" ");
    if (classNames.indexOf(className) == -1) {
        elem.className += " " + className;
    }
}

function removeClass(elem, className) {
    var classNames = elem.className.split(" ");
    var index = classNames.indexOf(className);
    if (index !== -1) {
        classNames.splice(index, 1);
        elem.className = classNames.join(' ');
    }
}
/* FUNCTION TO HIGLIGHT WORD IF PRESENT IN GRID*/
function highLightIndices(positions) {
    for (var i = 0; i < positions.length; i++) {
        addClass(getGridItem(positions[i]), 'sel');
    }
}