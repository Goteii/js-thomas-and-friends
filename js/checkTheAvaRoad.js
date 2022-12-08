import { AVA_ROADS } from "../utils/avaRoads.js";

const wait = (delay = 0) =>
  new Promise((resolve) => setTimeout(resolve, delay));

const setVisible = (elementOrSelector, visible) =>
  ((typeof elementOrSelector === "string"
    ? document.querySelector(elementOrSelector)
    : elementOrSelector
  ).style.display = visible ? "block" : "none");

setVisible(".content", false);
setVisible("#loading", true);

document.addEventListener("DOMContentLoaded", () =>
  wait(1200).then(() => {
    setVisible(".content", true);
    setVisible("#loading", false);
  })
);

const fetchAvaRoads = (input) => {
  const searchResultsWrapper = document.getElementById("search-results");
  const resultsShown = document.getElementsByClassName("result");
  if (resultsShown.length > 0) {
    Array.from(resultsShown).forEach((resultShown) => resultShown.remove());
  }
  const results = input
    ? AVA_ROADS.filter((avaRoad) => avaRoad.name.includes(input))
    : AVA_ROADS;

  console.log("input", input);
  results.forEach((el) => {
    const resultWrapper = document.createElement("div");
    resultWrapper.className = "result";
    const mapThumbnail = document.createElement("img");
    mapThumbnail.src = el.imgSrc;
    mapThumbnail.alt = `${el.name} map`;
    // TO REMOVE AFTER GETTING MAP IMAGES TO 360PX WITH GIMP
    mapThumbnail.style.width = "360px";
    resultWrapper.appendChild(mapThumbnail);

    const mapName = document.createElement("h4");
    mapName.innerHTML = el.name;
    resultWrapper.appendChild(mapName);

    const mapTier = document.createElement("h5");
    mapTier.innerHTML = `Tier: ${el.mapTier}`;
    resultWrapper.appendChild(mapTier);

    const resultDetails = document.createElement("div");
    resultDetails.className = "result__details";

    if (el.blueChests.length || el.greenChests.length || el.goldChests.length) {
      const chestsParagraph = document.createElement("p");
      chestsParagraph.innerHTML = "Chests:";

      resultDetails.appendChild(chestsParagraph);

      const chestsDetails = document.createElement("div");
      chestsDetails.className = "result__details--chests";

      //green chest logic
      if (el.greenChests.length) {
        const greenChestDetails = document.createElement("div");
        greenChestDetails.className = "result__details--green";
        el.greenChests.forEach((greenChest) => {
          const chestInfo = document.createElement("div");
          chestInfo.className = "chest-info";
          const greenChestAmount = document.createElement("span");
          greenChestAmount.className = "green-chest";
          greenChestAmount.innerHTML = `${greenChest.amount}x`;
          chestInfo.appendChild(greenChestAmount);
          const greenChestTier = document.createElement("span");
          greenChestTier.className = "green-chest__tier";
          greenChestTier.innerHTML = greenChest.tier;
          chestInfo.appendChild(greenChestTier);

          greenChestDetails.appendChild(chestInfo);
        });

        chestsDetails.appendChild(greenChestDetails);
      }

      //blue chest logic
      if (el.blueChests.length) {
        const blueChestDetails = document.createElement("div");
        blueChestDetails.className = "result__details--blue";
        el.blueChests.forEach((blueChest) => {
          const chestInfo = document.createElement("div");
          chestInfo.className = "chest-info";
          const blueChestAmount = document.createElement("span");
          blueChestAmount.className = "blue-chest";
          blueChestAmount.innerHTML = `${blueChest.amount}x`;
          chestInfo.appendChild(blueChestAmount);
          const blueChestTier = document.createElement("span");
          blueChestTier.className = "blue-chest__tier";
          blueChestTier.innerHTML = blueChest.tier;
          chestInfo.appendChild(blueChestTier);

          blueChestDetails.appendChild(chestInfo);
        });

        chestsDetails.appendChild(blueChestDetails);
      }

      //gold chest logic
      if (el.goldChests.length) {
        const goldChestDetails = document.createElement("div");
        goldChestDetails.className = "result__details--gold";
        el.goldChests.forEach((goldChest) => {
          const chestInfo = document.createElement("div");
          chestInfo.className = "chest-info";
          const goldChestAmount = document.createElement("span");
          goldChestAmount.className = "gold-chest";
          goldChestAmount.innerHTML = `${goldChest.amount}x`;
          chestInfo.appendChild(goldChestAmount);
          const goldChestTier = document.createElement("span");
          goldChestTier.className = "gold-chest__tier";
          goldChestTier.innerHTML = goldChest.tier;
          chestInfo.appendChild(goldChestTier);

          goldChestDetails.appendChild(chestInfo);
        });

        chestsDetails.appendChild(goldChestDetails);
      }

      resultDetails.appendChild(chestsDetails);
    }

    if (el.dungeons.length) {
      console.log("hi, DUNGEONS");
      const dungeonsParagraph = document.createElement("p");
      dungeonsParagraph.innerHTML = "Dungeons:";
      resultDetails.appendChild(dungeonsParagraph);

      const dungeonsDetails = document.createElement("div");
      dungeonsDetails.className = "result__details--dungeons";

      el.dungeons.forEach((dungeon) => {
        const dungeonInfo = document.createElement("div");
        dungeonInfo.className = "dungeon-info";

        const dungeonAmount = document.createElement("span");
        dungeonAmount.className = "dungeon";
        dungeonAmount.innerHTML = dungeon.amount;

        dungeonInfo.appendChild(dungeonAmount);

        const dungeonTier = document.createElement("span");
        dungeonTier.className = "dungeon__tier";
        dungeonTier.innerHTML = dungeon.tier;

        dungeonInfo.appendChild(dungeonTier);
        dungeonsDetails.appendChild(dungeonInfo);
      });

      resultDetails.appendChild(dungeonsDetails);
    }

    if (el.ironGatheringSpots || el.leatherGatheringSpots) {
      const gatheringSpotsParagraph = document.createElement("p");
      gatheringSpotsParagraph.innerHTML = "Gathering spots:";
      resultDetails.appendChild(gatheringSpotsParagraph);

      const gatheringSpotsWrapper = document.createElement("div");
      gatheringSpotsWrapper.className = "result__details--gatheringspots";

      if (el.leatherGatheringSpots) {
        const leatherWrapper = document.createElement("div");
        leatherWrapper.className = "result_details--leather";
        el.leatherGatheringSpots.forEach((leatherGatheringSpot) => {
          const gatheringSpotInfo = document.createElement("div");
          gatheringSpotInfo.className = "gatheringspot-info";

          const gatheringSpotAmount = document.createElement("span");
          gatheringSpotAmount.className = "gatheringspot--leather";
          gatheringSpotAmount.innerHTML = leatherGatheringSpot.amount;

          gatheringSpotInfo.appendChild(gatheringSpotAmount);

          const gatheringSpotTier = document.createElement("span");
          gatheringSpotTier.className = "gatheringspot__tier";
          gatheringSpotTier.innerHTML = leatherGatheringSpot.tier;

          gatheringSpotInfo.appendChild(gatheringSpotTier);

          leatherWrapper.appendChild(gatheringSpotInfo);
        });

        gatheringSpotsWrapper.appendChild(leatherWrapper);
      }

      if (el.ironGatheringSpots) {
        const ironWrapper = document.createElement("div");
        ironWrapper.className = "result_details--iron";
        el.ironGatheringSpots.forEach((ironGatheringSpot) => {
          const gatheringSpotInfo = document.createElement("div");
          gatheringSpotInfo.className = "gatheringspot-info";

          const gatheringSpotAmount = document.createElement("span");
          gatheringSpotAmount.className = "gatheringspot--iron";
          gatheringSpotAmount.innerHTML = ironGatheringSpot.amount;

          gatheringSpotInfo.appendChild(gatheringSpotAmount);

          const gatheringSpotTier = document.createElement("span");
          gatheringSpotTier.className = "gatheringspot__tier";
          gatheringSpotTier.innerHTML = ironGatheringSpot.tier;

          gatheringSpotInfo.appendChild(gatheringSpotTier);

          ironWrapper.appendChild(gatheringSpotInfo);
        });

        gatheringSpotsWrapper.appendChild(ironWrapper);
      }
      resultDetails.appendChild(gatheringSpotsWrapper);
    }

    resultWrapper.appendChild(resultDetails);
    searchResultsWrapper.appendChild(resultWrapper);
  });
};

{
  /* <div class="result">
<div class="result__details">
    <p>Chests:</p>
    <div class="result__details--chests">
        <div class="result__details--green">

            <div class="chest-info">
                <span class="green-chest">1x</span>
                <span class="green-chest__tier">VI</span>
            </div>
            <div class="chest-info">
                <span class="green-chest">2x</span>
                <span class="green-chest__tier">VIII</span>
            </div>

        </div>

        <div class="result__details--blue">
            <div class="chest-info">
            <span class="blue-chest">2x</span>
            <span class="blue-chest__tier">VI</span>
            </div>
        </div>
        <div class="result__details--chest">
            <div class="chest-info">
        <span class="gold-chest">3x</span> 
        <span class="gold-chest__tier">VIII</span> 
        </div>
        </div>
    </div>
    <p>Dungeons:</p>
    <div class="result__details--dungeons">
        <div class="dungeon-info">
            <span class="dungeon">2x</span>
            <span class="dungeon__tier">VI</span>
        </div>
        <div class="dungeon-info">
            <span class="dungeon">2x</span>
            <span class="dungeon__tier">VIII</span>
        </div>
    </div>
    <p>Gathering spots:</p>
    <div class="result__details--gatheringspots">
        <div class="result_details--leather">
            <div class="gatheringspot-info">
                <span class="gatheringspot--leather">2x</span>
                <span class="gatheringspot__tier">V</span>
            </div>
            <div class="gatheringspot-info">
                <span class="gatheringspot--leather">2x</span>
                <span class="gatheringspot__tier">VI</span>
            </div>
        </div>
        <div class="result_details--iron">
            <div class="gatheringspot-info">
                <span class="gatheringspot--iron">2x</span>
                <span class="gatheringspot__tier">VIII</span>
            </div>
            <div class="gatheringspot-info">
                <span class="gatheringspot--iron">2x</span>
                <span class="gatheringspot__tier">VII</span>
            </div>
        </div>
    </div>
</div>
</div> */
}

if (
  document.readyState === "interactive" ||
  document.readyState === "complete"
) {
  console.log("loaded");
  fetchAvaRoads();

  const userInput = document.getElementsByTagName("input")[0].value;

  const searchBtn = document.getElementById("search__btn");
  searchBtn.addEventListener("click", () => fetchAvaRoads(userInput));
}
