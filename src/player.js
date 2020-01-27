const Gameboard = require ('./gameboard');

function Player()  {

  return {
    turn: false,
    gameEnvironment: Gameboard(),
    placeShip: function(n, x, y){
    const newShip =  this.gameEnvironment.createShip(n);
      this.gameEnvironment.placeShip(newShip, x, y);
    },
    printBoard: function(){
      const div = document.createElement('div');
      div.classList.add('board', 'player-board');
      const container = document.querySelector('.container');
      const table = document.createElement('table');
      table.innerHTML += `<tbody> </tbody>`;
      div.appendChild(table);
      container.appendChild(div)

      const board = this.gameEnvironment.board;
        board.forEach((row, index) => {
          let allTbodies = document.querySelectorAll('tbody');
          let tbody = allTbodies[allTbodies.length -1];
          let table_row = document.createElement('tr');

           for(let element of row){
          const t_data = document.createElement('td');

          if(element.match(/ship/g)){
            t_data.classList.add('player-ship')
          } else {
            t_data.classList.add(element);
          }
          t_data.innerHTML = ``;
          table_row.appendChild(t_data);
           }
           tbody.appendChild(table_row);
        });


    },
//rules: 4 * 1 ; 3* 2 ; 2 * 3 ; 1 * 4
    placeRandomShips: function(){
      const shipsLengths = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4 ];
      shipsLengths.forEach(shipsLength => {
        let randomPosition = this.randomPlace();
        while(!this.validPosition(shipsLength, randomPosition[0], randomPosition[1])){
          randomPosition = this.randomPlace();
        }

        this.placeShip(shipsLength, randomPosition[0], randomPosition[1]);

      });


    },

    randomPlace: function(){
      const randomLetter = String.fromCharCode(65 + Math.round(Math.random() * 9));
      const randomNumber = Math.ceil(Math.random() * 10);
      const result = [randomLetter, randomNumber];
      return result;

    },

    validPosition: function(shipLength, letter, position){
      //check if there is already a ship;
      const player_gameboard = this.gameEnvironment.board;

      const row_x_index = this.gameEnvironment.letterToNum[letter];
      const row_x = player_gameboard[row_x_index];

      if(position + shipLength < 10){
        let real_ship_length = position + shipLength;
        while(real_ship_length > 0){
          if(row_x[real_ship_length].match(/ship/)){
            return false;
          }
          real_ship_length --;
        }
        return true;
      }



    }


  }



}


module.exports = Player;
