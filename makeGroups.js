// import list of students
import students from "./students.js";
// import shuffling algorithm
import shuffleArray from "./shuffle.js";

const MAX_ATTEMPTS = 1000; // how many reshuffles to try before giving up

// build a lookup of name -> Set of names to avoid (works in both directions)
function buildConflictMap(students) {
  const names = new Set(students.map((s) => s.name));
  const map = {};
  students.forEach((s) => (map[s.name] = new Set()));

  students.forEach((student) => {
    (student.avoid || []).forEach((other) => {
      if (!names.has(other)) {
        console.warn(
          `Warning: "${student.name}" avoids "${other}", who isn't in the list.`,
        );
        return;
      }
      map[student.name].add(other);
      map[other].add(student.name);
    });
  });
console.log("map", map)
  return map;
}

// check that no group contains a pair of students who should be kept apart
function isValid(result, conflictMap) {
  return Object.values(result).every((group) =>
    group.every((name, i) =>
      group.slice(i + 1).every((other) => !conflictMap[name].has(other)),
    ),
  );
}

// split shuffled students into groups
function buildGroups(shuffledStudents, groupSize) {
  let result = {}; // holds result
  let groupNum = 1; // starting group number

  // loop over shuffled students, iterating by designated group size
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

function makeGroups(groupSize) {
  // filter out students who are absent
  let presentStudents = students.filter((student) => student.present);

  // only consider conflicts between students who are present
  const conflictMap = buildConflictMap(presentStudents);

  let result;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    // shuffle the array of present students and build groups
    result = buildGroups(shuffleArray(presentStudents), groupSize);

    if (isValid(result, conflictMap)) return result;
  }

  console.warn(
    `Warning: couldn't satisfy every "avoid" rule after ${MAX_ATTEMPTS} attempts. ` +
      `Showing the last attempt, so check the groups below.`,
  );
  return result;
}

// runs the program
let groups = makeGroups(3); // Change the group size here
console.log(groups);
