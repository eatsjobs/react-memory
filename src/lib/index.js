export default function shuffle(input){
  const array = input.slice();
  const len = array.length -1;  
  const random = length => Math.floor(Math.random() * length);
  let j;
  
  for(let i = len; i > 0; i--){    
    j = random(i + 1);
    [array[j], array[i]] = [array[i], array[j]];
  }
  return array;
}
