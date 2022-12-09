import { AVA_ROADS } from "../utils/avaRoads.js";
import {
  createMyElement,
  createColumnOfDifferentTierItems,
} from "./resultBuildMethods.js";

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

const getClassNameForMapName = (searchResult) => {
  let greenChestsAmount = 0;
  let blueChestsAmount = 0;
  let goldChestsAmount = 0;
  let dungeonsAmount = 0;
  let leatherGatheringSpotsAmount = 0;
  let ironGatheringSpotsAmount = 0;
  let stoneGatheringSpotsAmount = 0;
  let woodGatheringSpotsAmount = 0;
  //naming to check and change
  let fluxGatheringSpotsAmount = 0;
  const thingsOnMapAmountArr = [];

  if (searchResult.greenChests && searchResult.greenChests.length) {
    searchResult.greenChests.forEach(
      (el) => (greenChestsAmount = greenChestsAmount + el.amount)
    );
    thingsOnMapAmountArr.push({
      name: "green-chest-color",
      amount: greenChestsAmount,
    });
  }
  if (searchResult.blueChests && searchResult.blueChests.length) {
    searchResult.blueChests.forEach(
      (el) => (blueChestsAmount = blueChestsAmount + el.amount)
    );
    thingsOnMapAmountArr.push({
      name: "blue-chest-color",
      amount: blueChestsAmount,
    });
  }
  if (searchResult.goldChests && searchResult.goldChests.length) {
    searchResult.goldChests.forEach(
      (el) => (goldChestsAmount = goldChestsAmount + el.amount)
    );
    thingsOnMapAmountArr.push({
      name: "gold-chest-color",
      amount: goldChestsAmount,
    });
  }
  if (searchResult.dungeons && searchResult.dungeons.length) {
    searchResult.dungeons.forEach(
      (el) => (dungeonsAmount = dungeonsAmount + el.amount)
    );
    thingsOnMapAmountArr.push({
      name: "dungeon-color",
      amount: dungeonsAmount,
    });
  }
  if (
    searchResult.leatherGatheringSpots &&
    searchResult.leatherGatheringSpots.length
  ) {
    searchResult.leatherGatheringSpots.forEach(
      (el) =>
        (leatherGatheringSpotsAmount = leatherGatheringSpotsAmount + el.amount)
    );
  }
  if (
    searchResult.ironGatheringSpots &&
    searchResult.ironGatheringSpots.length
  ) {
    searchResult.ironGatheringSpots.forEach(
      (el) => (ironGatheringSpotsAmount = ironGatheringSpotsAmount + el.amount)
    );
  }
  if (
    searchResult.stoneGatheringSpots &&
    searchResult.stoneGatheringSpots.length
  ) {
    searchResult.stoneGatheringSpots.forEach(
      (el) =>
        (stoneGatheringSpotsAmount = stoneGatheringSpotsAmount + el.amount)
    );
  }
  if (
    searchResult.woodGatheringSpots &&
    searchResult.woodGatheringSpots.length
  ) {
    searchResult.woodGatheringSpots.forEach(
      (el) => (woodGatheringSpotsAmount = woodGatheringSpotsAmount + el.amount)
    );
  }
  if (
    searchResult.fluxGatheringSpots &&
    searchResult.fluxGatheringSpots.length
  ) {
    searchResult.fluxGatheringSpots.forEach(
      (el) => (fluxGatheringSpotsAmount = fluxGatheringSpotsAmount + el.amount)
    );
  }
  thingsOnMapAmountArr.push({
    name: "gathering-spot-color",
    amount:
      leatherGatheringSpotsAmount +
      ironGatheringSpotsAmount +
      stoneGatheringSpotsAmount +
      woodGatheringSpotsAmount +
      fluxGatheringSpotsAmount,
  });
  thingsOnMapAmountArr.sort((a, b) => b.amount - a.amount);

  return thingsOnMapAmountArr[0].name;
};

const createResults = (results) => {
  const searchResultsWrapper = document.getElementById("search-results");
  results.forEach((el) => {
    const resultWrapper = document.createElement("div");
    resultWrapper.className = "result";
    const mapThumbnail = document.createElement("img");
    mapThumbnail.src = el.imgSrc;
    mapThumbnail.alt = `${el.name} map`;
    // TO REMOVE AFTER GETTING MAP IMAGES TO 360PX WITH GIMP
    mapThumbnail.style.width = "360px";

    resultWrapper.appendChild(mapThumbnail);

    const mapName = createMyElement("h4", getClassNameForMapName(el), el.name);
    resultWrapper.appendChild(mapName);

    const mapTier = createMyElement("h5", "", `Tier: ${el.mapTier}`);
    resultWrapper.appendChild(mapTier);

    const resultDetails = createMyElement("div", "result__details");

    if (el.blueChests.length || el.greenChests.length || el.goldChests.length) {
      const chestsParagraph = createMyElement("p", "", "Chests:");

      resultDetails.appendChild(chestsParagraph);

      const chestsDetails = createMyElement("div", "result__details--chests");

      //green chest logic
      if (el.greenChests.length) {
        const greenChestDetails = createMyElement(
          "div",
          "result__details--green"
        );
        createColumnOfDifferentTierItems({
          items: el.greenChests,
          divClassName: "chest-info",
          amountSpanClassName: "green-chest",
          tierSpanClassName: "green-chest__tier",
          wrapper: greenChestDetails,
        });

        chestsDetails.appendChild(greenChestDetails);
      }

      //blue chest logic
      if (el.blueChests.length) {
        const blueChestDetails = createMyElement(
          "div",
          "result__details--blue"
        );
        createColumnOfDifferentTierItems({
          items: el.blueChests,
          divClassName: "chest-info",
          amountSpanClassName: "blue-chest",
          tierSpanClassName: "blue-chest__tier",
          wrapper: blueChestDetails,
        });

        chestsDetails.appendChild(blueChestDetails);
      }

      //gold chest logic
      if (el.goldChests.length) {
        const goldChestDetails = createMyElement(
          "div",
          "result__details--gold"
        );
        createColumnOfDifferentTierItems({
          items: el.goldChests,
          divClassName: "chest-info",
          amountSpanClassName: "gold-chest",
          tierSpanClassName: "gold-chest__tier",
          wrapper: goldChestDetails,
        });

        chestsDetails.appendChild(goldChestDetails);
      }

      resultDetails.appendChild(chestsDetails);
    }

    if (el.dungeons.length) {
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
        dungeonAmount.innerHTML = `${dungeon.amount}x `;

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
      const gatheringSpotsParagraph = createMyElement(
        "p",
        "",
        "Gathering spots:"
      );
      resultDetails.appendChild(gatheringSpotsParagraph);

      const gatheringSpotsWrapper = createMyElement(
        "div",
        "result__details--gatheringspots"
      );

      if (el.leatherGatheringSpots) {
        const leatherWrapper = createMyElement(
          "div",
          "result_details--leather"
        );
        createColumnOfDifferentTierItems({
          items: el.leatherGatheringSpots,
          divClassName: "gatheringspot-info",
          amountSpanClassName: "gatheringspot--leather",
          tierSpanClassName: "gatheringspot__tier",
          wrapper: leatherWrapper,
        });

        gatheringSpotsWrapper.appendChild(leatherWrapper);
      }

      if (el.ironGatheringSpots) {
        const ironWrapper = createMyElement("div", "result_details--iron");

        createColumnOfDifferentTierItems({
          items: el.ironGatheringSpots,
          divClassName: "gatheringspot-info",
          amountSpanClassName: "gatheringspot--iron",
          tierSpanClassName: "gatheringspot__tier",
          wrapper: ironWrapper,
        });

        gatheringSpotsWrapper.appendChild(ironWrapper);
      }
      resultDetails.appendChild(gatheringSpotsWrapper);
    }

    resultWrapper.appendChild(resultDetails);
    searchResultsWrapper.appendChild(resultWrapper);
  });
};

const fetchAvaRoads = () => {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();

  const resultsShown = document.getElementsByClassName("result");
  if (resultsShown.length > 0) {
    Array.from(resultsShown).forEach((resultShown) => resultShown.remove());
  }
  const results = searchInput
    ? AVA_ROADS.filter((avaRoad) =>
        avaRoad.name.toLowerCase().includes(searchInput)
      )
    : AVA_ROADS;

  createResults(results);
};
fetchAvaRoads();

const searchBtn = document.getElementById("search__btn");
searchBtn.addEventListener("click", () => fetchAvaRoads());

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchBtn.click();
  }
});
