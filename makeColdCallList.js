// import list of students
import students from './students.js';
// import shuffling algorithm
import shuffleArray from './shuffle.js';

function makeColdCallList() {
  // filter out students who are absent
  let presentStudents = students.filter((student) => student.present);

  // shuffle the array of present students
  let shuffledStudents = shuffleArray(presentStudents);

  // make string of student names on new lines
  let result = shuffledStudents.map((student) => student.name).join('\n');

  return result;
}

// runs program
let coldCallList = makeColdCallList();
console.log(coldCallList);
