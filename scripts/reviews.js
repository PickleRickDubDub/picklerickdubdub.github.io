/*    Application to write a list of customer reviews
      Filename: reviews.js
*/

let reviewers = ["Joey Wheeler", "Mokuba Kaiba", "Weevil Underwood", "Rex Raptor", "May Valentine", "Maximillion Pegasus", "Solomon Muto", "Gozaburo Kaiba", "Rafael", "Marik Ishtar"];
let reviewType = ["N", "P", "", "P", "P", "", "P", "N", "N", ""];
let stars = [1, 5, 3, 5, 5, 5, 1 ,1 ,5, 3];
let reviewDates = ["11/18/2024", "11/17/2024", "11/15/2024", "11/10/2024", "10/21/2024", "11/22/2024", "10/19/2024", "11/01/2024", "10/10/2024", "11/10/2024"];
let reviews = [
   "Kaiba is just a big bully who likes taking advantage of duelists and his ego is as big as his business empire. And he is very rude to people with Brooklyn accents.",
   "This is just a taste of what's to come to Battle City. My brother has more projects in store for everyone.",
   "I only came here for the food and to see what kind of players would show up. All inferior to my insect deck.",
   "The stores in this location have access to card packs that I had never seen before!",
   "Not a total waste of time, left with more cards and strategies that I came here with ;)",
   "OOOOOOHH KAAAAAIBA BOOOOOOOOYYY!!!!    UUUUUUUUHHH!!!!",
   "This young man rudely came into my shop, ripped my most precious card and sassily walked out without buying anything.",
   "Ungrateful child! Release me from this digital prison and return my company!",
   "This place is just like its owner, no soul or guardian spirit. The food court is magnificent though!",
   "The gift shop offers plushies of the Egyptian God Cards, how childish.",
];

let reviewTitles = ["Hes trying to take over the world!", "Amazing new steps", "Exactly what I expected", "This place is nuts", "Quite the place to test out my talents", "Where are you hiding from me Seto?", "MY KNEES HURT!", "The guest Wi-Fi is too slow", "The main entrance could use a seal of Orichalcos", "This building shall be mine!!"];

// Function to generate stars 
function starImages(rating) {
   let stars = "";
   for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
         // Gold filled star with a small shadow for depth
         stars += `<span style="color: #FFD700; font-size: 1.2rem; text-shadow: 1px 1px 1px #000;">★</span>`;
      } else {
         // Light grey empty star for the "missing" rating
         stars += `<span style="color: #ccc; font-size: 1.2rem;">☆</span>`;
      }
   }
   return stars;
}


// Loop through the reviewers array to create review tables
for (let i = 0; i < reviewers.length; i++) {
   let reviewCode = "";

   reviewCode += "<table style='background-color:" + getRandomColor() + "'>";

   // Construct the table content
   reviewCode += "<caption>" + reviewTitles[i] + "</caption>";
   reviewCode += "<tr><th>By</th><td>" + reviewers[i] + "</td></tr>";
   reviewCode += "<tr><th>Review Date</th><td>" + reviewDates[i] + "</td></tr>";
   reviewCode += "<tr><th>Rating</th><td>" + starImages(stars[i]) + "</td></tr>";
   reviewCode += "<tr><td colspan='2'>" + reviews[i] + "</td></tr>";

   // 👍 👎 buttons added here
   reviewCode += `
   <tr>
      <td colspan='2' style='text-align:center; padding-top:10px;'>
         <button class='thumb-btn' onclick='vote(this)'>👍</button>
         <button class='thumb-btn' onclick='vote(this)'>👎</button>
      </td>
   </tr>
   `;

   reviewCode += "</table>";

   // Insert into page
   document.querySelector("article").insertAdjacentHTML("beforeend", reviewCode);
}

// Function to handle voting
function vote(button) {
   let container = button.parentElement;
   let buttons = container.querySelectorAll(".thumb-btn");

   // If the clicked button is already active → unselect it
   if (button.classList.contains("active")) {
      button.classList.remove("active");
      return;
   }

   // Otherwise: remove active from both, then select clicked one
   buttons.forEach(btn => btn.classList.remove("active"));
   button.classList.add("active");
}

/*Random colors for the background on each review*/
function getRandomColor() {
   let colors = [
      "#7FFFD4", "#7CFC00", "#FFD700", "#FFB6C1",
      "#ADD8E6", "#FFA07A", "#E6E6FA", "#90EE90",
      "#F0E68C", "#DDA0DD"
   ];
   return colors[Math.floor(Math.random() * colors.length)];
}