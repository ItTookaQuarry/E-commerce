
 export function countthestars(rating){
    const table = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

    let value = "";
  
    for (let i = 0; i < table.length; i++) {
      if (
        rating < table[i + 1] &&
        rating > table[i] &&
        rating - table[i] > table[i + 1] - rating
      ) {
        value = table[i + 1];
      }
  
      if (
        rating < table[i + 1] &&
        rating > table[i] &&
        rating - table[i] < table[i + 1] - rating
      ) {
        value = table[i];
      }
  
      if (
        rating < table[i + 1] &&
        rating > table[i] &&
        rating - table[i] == table[i + 1] - rating
      ) {
        value = table[i + 1];
      }
  
      if (rating == table[i]) {
        value = table[i];
      }
    }

    const src = "Rating" + value + ".png";
 return src

}

