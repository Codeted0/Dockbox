const users = [
  {
    id: 1,
    name: "Gauri Patil",
    hobbies: ["painting", "coding", "reading"],
    skills: ["JavaScript", "Node.js", "React"]
  },
  {
    id: 2,
    name: "Riya Mehta",
    hobbies: ["writing", "traveling", "chess"],
    skills: ["Python", "Data Analysis", "Pandas"]
  },
  {
    id: 3,
    name: "Aarav Shah",
    hobbies: ["gaming", "coding", "biking"],
    skills: ["C++", "Java", "DSA"]
  }
];

const searchInput = {
  nameContains: "a",
  mustHaveSkill: "Java",
  optionalHobby: "coding"
};

function searchUsers(users, { nameContains, mustHaveSkill, optionalHobby }) {
  return users
    .map(user => {
      let score = 0;

      // Case-insensitive name match
      if (user.name.toLowerCase().includes(nameContains.toLowerCase())) {
        score += 1;
      }

      // Skill match
      if (user.skills.includes(mustHaveSkill)) {
        score += 2;
      }

      // Optional hobby match
      if (user.hobbies.includes(optionalHobby)) {
        score += 1;
      }

      return score > 0 ? { ...user, matchScore: score } : null;
    })
    .filter(Boolean) // remove nulls
    .sort((a, b) => b.matchScore - a.matchScore);
}

// 🔍 Search
const results = searchUsers(users, searchInput);

// 🖨️ Output
console.log("Matched Users:");
results.forEach(user => {
  console.log(`- ${user.name} (Score: ${user.matchScore})`);
});
