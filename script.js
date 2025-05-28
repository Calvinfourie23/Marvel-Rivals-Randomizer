const champions = {
  Tank: ["Hulk", "Captain America", "Doctor Strange", "Emma Frost", 
  "Groot", "Magneto", "Peni Parker", "The Thing", "Thor", "Venom"],
  Support: ["Adam Warlock", "Cloak % Dagger", "Invisible Woman", "Jeff", "Loki", "Luna Snow", "Mantis", "Rocket"],
  Damage: ["Black Panther", "Black Widow", "Hawkeye", "Hela", "Human Torch", "Iron Fist", "Iron Man"
  , "Magik", "Mister Fantastic", "Moon Knight", "Namor", "Psylocke", "Scarlet Witch", "Spider-Man"
  , "Sqirrel Girl", "Star-Lord", "Storm", "The Punisher", "Winter Soldier", "Wolverine"]
};

const rolesList = ["Tank", "Support", "Damage"];

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function getRandomChampion(role, used) {
  const available = champions[role].filter(champ => !used.has(champ));
  const randomChamp = available[Math.floor(Math.random() * available.length)];
  used.add(randomChamp);
  return randomChamp;
}

function generateTeam() {
  const inputs = document.querySelectorAll('.player-name');
  const names = Array.from(inputs)
    .map(input => input.value.trim())
    .filter(name => name !== '');

  const teamDiv = document.getElementById("team");
  teamDiv.innerHTML = "";

  if (names.length === 0) {
    teamDiv.innerHTML = "<p>Please enter at least one player name.</p>";
    return;
  }

  if (names.length > 6) {
    teamDiv.innerHTML = "<p>Maximum of 6 players allowed.</p>";
    return;
  }

  const usedChampions = new Set();
  const shuffledRoles = shuffleArray(
    Array.from({ length: names.length }, () => rolesList[Math.floor(Math.random() * rolesList.length)])
  );

  names.forEach((name, i) => {
    const role = shuffledRoles[i];
    const champ = getRandomChampion(role, usedChampions);

    const memberDiv = document.createElement("div");
    memberDiv.className = "team-member";

    const nameCol = document.createElement("div");
    nameCol.className = "team-column";
    nameCol.innerHTML = `<h4>Name</h4><p>${name}</p>`;

    const roleCol = document.createElement("div");
    roleCol.className = "team-column";
    roleCol.innerHTML = `<h4>Role</h4><p>${role}</p>`;

    const champCol = document.createElement("div");
    champCol.className = "team-column";
    champCol.innerHTML = `<h4>Champion</h4><p>${champ}</p>`;

    memberDiv.appendChild(nameCol);
    memberDiv.appendChild(roleCol);
    memberDiv.appendChild(champCol);

    teamDiv.appendChild(memberDiv);
  });
}
