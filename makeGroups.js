// import list of students
import students from "./students.js";
// import shuffling algorithm
import shuffleArray from "./shuffle.js";

function makeGroups(groupSize) {
  // filter out students who are absent
  let presentStudents = students.filter((student) => student.present);

  // shuffle the array of present students
  let shuffledStudents = shuffleArray(presentStudents);

  let result = {}; // holds result
  let groupNum = 1; // starting group number

  // loop over shuffled students, itterating by designated group size
  for (let i = 0; i < shuffledStudents.length; i += groupSize) {
    // chunk off a group
    let group = shuffledStudents.slice(i, i + groupSize);

    // ensure no group is left with only 1 person
    if (group.length === 1 && result[`group${groupNum - 1}`]) {
      result[`group${groupNum - 1}`].push(group[0].name);
    } else {
      // make a group that is an array of student names
      result[`group${groupNum}`] = group.map((student) => student.name);
      groupNum++; // increment group number
    }
  }

  return result;
}

// runs the program
let groups = makeGroups(3); // Change the group size here
console.log(groups);

