// shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
  let arr = [...array]; // make a copy
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // pick random index
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }
  return arr;
}
export default shuffleArray;