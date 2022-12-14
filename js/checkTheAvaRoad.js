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
  if (!results.length) {
    const notFoundParagraph = document.createElement("p");
    notFoundParagraph.innerHTML =
      "We couldnt find a result matching your applied filters/requirements. We might not have that kind of Avalonian Road in our database or it simply doesnt exist.";
    notFoundParagraph.className = "results-not-found";
    notFoundParagraph.id = "results-not-found";
    console.log(notFoundParagraph);
    searchResultsWrapper.appendChild(notFoundParagraph);
  }
  results.length &&
    document.getElementById("results-not-found") &&
    document.getElementById("results-not-found").remove();
  results.length &&
    results.forEach((el) => {
      const resultWrapper = document.createElement("div");
      resultWrapper.className = "result";
      const mapThumbnail = document.createElement("img");
      mapThumbnail.src = el.imgSrc;
      mapThumbnail.alt = `${el.name} map`;
      // TO REMOVE AFTER GETTING MAP IMAGES TO 360PX WITH GIMP
      mapThumbnail.style.width = "360px";

      resultWrapper.appendChild(mapThumbnail);

      const mapName = createMyElement(
        "h4",
        getClassNameForMapName(el),
        el.name
      );
      resultWrapper.appendChild(mapName);

      const mapTier = createMyElement("h5", "", `Tier: ${el.mapTier}`);
      resultWrapper.appendChild(mapTier);

      const resultDetails = createMyElement("div", "result__details");

      if (
        el.blueChests.length ||
        el.greenChests.length ||
        el.goldChests.length
      ) {
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

//filters

const filtersAmount = {
  greenChests: 1,
  blueChests: 1,
  goldChests: 1,
  dungeons: 1,
  gatheringSpots: 1,
};

const filtersAmountRequirements = {
  greenChests: 3,
  blueChests: 3,
  goldChests: 3,
  dungeons: 3,
  gatheringSpots: 11,
};

const createRemoveBtn = (type, fieldsetId, btnId, wrapperId) => {
  const removeBtn = document.createElement("button");
  removeBtn.className = "add-filter-btn";
  removeBtn.id = `${fieldsetId}-btn-${filtersAmount[type]}`;
  removeBtn.innerHTML = "-";

  const wrapper = document.getElementById(wrapperId);
  //get latest id number by getting last fieldset from wrapper's children
  const latestIdNumber = Array.from(wrapper.children)
    .filter((child) => child.id.includes(fieldsetId))
    .splice(-1)[0]
    .id.split("-")
    .splice(-1)[0];
  const fieldset = document.getElementById(`${fieldsetId}-${latestIdNumber}`);
  removeBtn.onclick = () => {
    fieldset.remove();
    filtersAmount[type]--;
    const addFilterBtn = document.getElementById(btnId);
    addFilterBtn.classList.remove("hidden");
  };

  fieldset.appendChild(removeBtn);
};

const getProperId = (type, fieldsetId, currentId) => {
  let freeId = currentId;
  const wrapper = document.getElementById(`${fieldsetId}-${freeId}`);
  if (!wrapper) {
    return freeId;
  }
  if (wrapper) {
    const incremented = ++freeId;

    return getProperId(type, fieldsetId, incremented);
  }
};

const createFilters = (type, wrapperId, htmlNodeName, btnId, fieldsetId) => {
  if (filtersAmount[type] !== filtersAmountRequirements[type]) {
    createRemoveBtn(type, fieldsetId, btnId, wrapperId);
  }
  if (filtersAmount[type] >= filtersAmountRequirements[type]) {
    return;
  }
  filtersAmount[type]++;
  const id = getProperId(type, fieldsetId, 1);
  const addFilterBtn = document.getElementById(btnId);
  addFilterBtn.remove();
  const wrapper = document.getElementById(wrapperId);

  const chestWrapper = createMyElement("div", "filters__chests--chest");
  chestWrapper.id = `${fieldsetId}-${id}`;
  const tierWrapper = createMyElement("div", "filters__chests--tier");
  const tierLabel = document.createElement("label");
  tierLabel.htmlFor = `${htmlNodeName}-tier`;
  tierLabel.innerHTML = "Tier:";
  tierWrapper.appendChild(tierLabel);
  const tierSelect = document.createElement("select");
  tierSelect.className = "chest-tier-select";
  tierSelect.name = `${htmlNodeName}-tier`;
  tierSelect.id = `${htmlNodeName}-tier-${id}`;

  const tierSelectOptionIVTier = document.createElement("option");
  tierSelectOptionIVTier.value = "IV";
  tierSelectOptionIVTier.innerHTML = "IV";
  tierSelect.appendChild(tierSelectOptionIVTier);

  const tierSelectOptionVITier = document.createElement("option");
  tierSelectOptionVITier.value = "VI";
  tierSelectOptionVITier.innerHTML = "VI";
  tierSelect.appendChild(tierSelectOptionVITier);

  const tierSelectOptionVIIITier = document.createElement("option");
  tierSelectOptionVIIITier.value = "VIII";
  tierSelectOptionVIIITier.innerHTML = "VIII";
  tierSelect.appendChild(tierSelectOptionVIIITier);

  tierWrapper.appendChild(tierSelect);
  chestWrapper.appendChild(tierWrapper);

  const amountWrapper = createMyElement("div", "filters__chests--amount");
  const amountLabel = document.createElement("label");
  amountLabel.htmlFor = `${htmlNodeName}-amount`;
  amountLabel.innerHTML = "At least(amount):";
  amountWrapper.appendChild(amountLabel);
  const amountInput = document.createElement("input");
  amountInput.name = `${htmlNodeName}-amount`;
  amountInput.type = "number";
  amountInput.min = "1";
  amountInput.max = "5";
  amountInput.value = "1";
  amountInput.className = `chest-amount ${htmlNodeName}`;
  amountInput.id = `${htmlNodeName}-amount-${id}`;

  amountWrapper.appendChild(amountInput);
  chestWrapper.appendChild(amountWrapper);

  // if (filtersAmount[type] !== 3) {
  //   chestWrapper.appendChild(addFilterBtn);
  // }

  const errorMsgs = Array.from(wrapper.children).filter((el) =>
    el.className.includes("error")
  );
  if (errorMsgs) {
    errorMsgs.forEach((errorMsg) => {
      errorMsg.remove();
    });
    wrapper.appendChild(chestWrapper);

    errorMsgs.forEach((errorMsg) => {
      wrapper.appendChild(errorMsg);
    });
  } else {
    wrapper.appendChild(chestWrapper);
  }

  const length = Array.from(wrapper.children).filter((child) =>
    child.id.includes(fieldsetId)
  ).length;
  chestWrapper.appendChild(addFilterBtn);
  if (length === 3) {
    addFilterBtn.classList.add("hidden");
  }
};

/// -------------------------------- TO ESTABLISH KEY FORMAT
const categoryNameIdTabIdDictionary = {
  "green-chest": {
    categoryNameId: "category-name-green-chests",
    tabId: "filters-option-chests-tab",
  },
  "blue-chest": {
    categoryNameId: "category-name-blue-chests",
    tabId: "filters-option-chests-tab",
  },
  "gold-chest": {
    categoryNameId: "category-name-gold-chests",
    tabId: "filters-option-chests-tab",
  },
  dungeons: {
    categoryNameId: "category-name-dungeons",
    tabId: "filters-option-dungeons-tab",
  },
  leather: {
    categoryNameId: "category-name-leather-spots",
    tabId: "filters-option-gatheringspots-tab",
  },
  iron: {
    categoryNameId: "category-name-iron-spots",
    tabId: "filters-option-gatheringspots-tab",
  },
  wood: {
    categoryNameId: "category-name-wood-spots",
    tabId: "filters-option-gatheringspots-tab",
  },
  stone: {
    categoryNameId: "category-name-stone-spots",
    tabId: "filters-option-gatheringspots-tab",
  },
  flux: {
    categoryNameId: "category-name-flux-spots",
    tabId: "filters-option-gatheringspots-tab",
  },
};

const mainItemCheckboxesDictionary = {
  greenChest: {
    type: "greenChests",
    filterId: "green-chest-filter",
    htmlNodeName: "green-chest",
    btnId: "add-filter-green-chest",
    checkboxId: "green-chest-checkbox",
    fieldsetId: "green-chest-fieldset",
    // categoryNameId: "category-name-green-chests",
    // tabId: "filters-option-chests-tab",
  },
  blueChest: {
    type: "blueChests",
    filterId: "blue-chest-filter",
    htmlNodeName: "blue-chest",
    btnId: "add-filter-blue-chest",
    checkboxId: "blue-chest-checkbox",
    fieldsetId: "blue-chest-fieldset",
    // categoryNameId: "category-name-blue-chests",
    // tabId: "filters-option-chests-tab",
  },
  goldChest: {
    type: "goldChests",
    filterId: "gold-chest-filter",
    htmlNodeName: "gold-chest",
    btnId: "add-filter-gold-chest",
    checkboxId: "gold-chest-checkbox",
    fieldsetId: "gold-chest-fieldset",
    // categoryNameId: "category-name-gold-chests",
    // tabId: "filters-option-chests-tab",
  },
  dungeons: {
    type: "dungeons",
    filterId: "dungeons-filter",
    htmlNodeName: "dungeons",
    btnId: "add-filter-dungeons",
    checkboxId: "dungeons-checkbox",
    fieldsetId: "dungeons-fieldset",
    // categoryNameId: "category-name-dungeons",
    // tabId: "filters-option-dungeons-tab",
  },
  leather: {
    type: "gatheringSpots",
    filterId: "leather-filter",
    htmlNodeName: "leather",
    btnId: "add-filter-leather",
    checkboxId: "leather-checkbox",
    fieldsetId: "leather-fieldset",
    // categoryNameId: "category-name-leather-spots",
    // tabId: "filters-option-gatheringspots-tab",
  },
  iron: {
    type: "gatheringSpots",
    filterId: "iron-filter",
    htmlNodeName: "iron",
    btnId: "add-filter-iron",
    checkboxId: "iron-checkbox",
    fieldsetId: "iron-fieldset",
    // categoryNameId: "category-name-iron-spots",
    // tabId: "filters-option-gatheringspots-tab",
  },
  wood: {
    type: "gatheringSpots",
    filterId: "wood-filter",
    htmlNodeName: "wood",
    btnId: "add-filter-wood",
    checkboxId: "wood-checkbox",
    fieldsetId: "wood-fieldset",
    // categoryNameId: "category-name-wood-spots",
    // tabId: "filters-option-gatheringspots-tab",
  },
  stone: {
    type: "gatheringSpots",
    filterId: "stone-filter",
    htmlNodeName: "stone",
    btnId: "add-filter-stone",
    checkboxId: "stone-checkbox",
    fieldsetId: "stone-fieldset",
    // categoryNameId: "category-name-stone-spots",
    // tabId: "filters-option-gatheringspots-tab",
  },
  flux: {
    type: "gatheringSpots",
    filterId: "flux-filter",
    htmlNodeName: "flux",
    btnId: "add-filter-flux",
    checkboxId: "flux-checkbox",
    fieldsetId: "flux-fieldset",
    // categoryNameId: "category-name-flux-spots",
    // tabId: "filters-option-gatheringspots-tab",
  },
};

//listeners
const listenToMainCheckboxes = () => {
  for (const [_key, valueObj] of Object.entries(mainItemCheckboxesDictionary)) {
    const config = valueObj;
    const mainItemCheckbox = document.getElementById(config.checkboxId);
    //rethink if its good practise to use 'old ref' to element
    const addFilterBtnReference = document.getElementById(config.btnId);

    mainItemCheckbox.addEventListener("change", () => {
      const addFilterBtn = document.getElementById(config.btnId);
      const wrapper = document.getElementById(config.filterId);
      if (!mainItemCheckbox.checked) {
        !wrapper.classList.contains("hidden") &&
          wrapper.classList.add("hidden");
        wrapper.classList.contains("error-wrapper") &&
          wrapper.classList.remove("error-wrapper");
        //clear fields and add button for 1st row
        if (wrapper.children.length > 1) {
          const lastFieldsetIdx =
            Array.from(wrapper.children).filter((el) => el.id).length - 1;
          Array.from(wrapper.children).forEach((nodeEl, idx) => {
            if (idx !== lastFieldsetIdx) nodeEl.remove();
          });
          filtersAmount[config.type] = 1;
          addFilterBtnReference.classList.contains("hidden") &&
            addFilterBtnReference.classList.remove("hidden");
          wrapper.children[0].appendChild(addFilterBtnReference);
        }
        // if (addFilterBtn) {
        //   //check if btn has already declared onClick method;
        //   // if (!!addFilterBtn.onclick) {
        //   //   addFilterBtn.onclick = "";
        //   // }
        // }
      } else {
        wrapper.classList.remove("hidden");

        if (addFilterBtn && !addFilterBtn.onclick) {
          addFilterBtn.onclick = () => {
            createFilters(
              config.type,
              config.filterId,
              config.htmlNodeName,
              config.btnId,
              config.fieldsetId,
              config.categoryNameId,
              config.tabId
            );
          };
        }
      }
    });
  }
};

listenToMainCheckboxes();

const checkboxesIdToFiltersIdDic = {
  "green-chest-checkbox": "green-chest-filter",
  "blue-chest-checkbox": "blue-chest-filter",
  "gold-chest-checkbox": "gold-chest-filter",
  "dungeons-checkbox": "dungeons-filter",
  "leather-checkbox": "leather-filter",
  "iron-checkbox": "iron-filter",
  "stone-checkbox": "stone-filter",
  "wood-checkbox": "wood-filter",
  "flux-checkbox": "flux-filter",
};

const tiersIdToAmountsIdDic = {
  "green-chest-tier": "green-chest-amount",
  "blue-chest-tier": "blue-chest-amount",
  "gold-chest-tier": "gold-chest-amount",
  "dungeons-tier": "dungeons-amount",
  "leather-tier": "leather-amount",
  "iron-tier": "iron-amount",
  "stone-tier": "stone-amount",
  "wood-tier": "wood-amount",
  "flux-tier": "flux-amount",
};

//to change values
const errorMsgsDictionary = {
  tier: "You cant look for the same tiers of the same thing in two different fieldsets of the same thing",
  amount:
    "Amount of thing you are looking for must be more than 1 and less than 7",
};

let validation = {
  result: "no-errors",
  fieldsetsInfo: {
    "green-chest-filter": {},
    "blue-chest-filter": {},
    "gold-chest-filter": {},
    "dungeons-filter": {},
    "leather-filter": {},
    "iron-filter": {},
    "stone-filter": {},
    "wood-filter": {},
    "flux-filter": {},
  },
};

const validateFilters = () => {
  // const validation = {
  //   result: "no-errors",
  //   fieldsetsInfo: {
  //     "green-chest-filter": {},
  //     "blue-chest-filter": {},
  //     "gold-chest-filter": {},
  //     "dungeons-filter": {},
  //     "leather-filter": {},
  //     "iron-filter": {},
  //     "stone-filter": {},
  //     "wood-filter": {},
  //     "flux-filter": {},
  //   },
  // };
  clearErrorMessages(validation.fieldsetsInfo);
  const checkedFilters = [];
  for (const [checkboxId, filterId] of Object.entries(
    checkboxesIdToFiltersIdDic
  )) {
    const checkbox = document.getElementById(checkboxId);
    checkbox.checked &&
      checkedFilters.push({
        checkbox,
        filter: document.getElementById(filterId),
      });
  }
  checkedFilters.length &&
    checkedFilters.forEach((el) => {
      const filterCategoryId = el.checkbox.id.split("-");
      filterCategoryId.splice(-1);
      const categoryId =
        filterCategoryId.length > 1
          ? filterCategoryId.join("-")
          : filterCategoryId.toString();
      const selectedTiers = [];
      Array.from(el.filter.children).forEach((fieldsetRow) => {
        if (fieldsetRow.id) {
          const fieldsetRowId = fieldsetRow.id.split("-").splice(-1);
          const tierValue = document.getElementById(
            `${categoryId}-tier-${fieldsetRowId}`
          ).value;
          const amountValue = +document.getElementById(
            `${categoryId}-amount-${fieldsetRowId}`
          ).value;

          if (selectedTiers.includes(tierValue)) {
            validation.result = "error";
            validation.fieldsetsInfo[el.filter.id]["tier"] =
              errorMsgsDictionary.tier;
          }
          !selectedTiers.includes(tierValue) && selectedTiers.push(tierValue);
          if (amountValue > 7 || amountValue < 1) {
            validation.result = "error";
            validation.fieldsetsInfo[el.filter.id]["amount"] =
              errorMsgsDictionary.amount;
          }
        }
      });
    });

  if (validation.result === "error") {
    //create
    createErrorMsg(validation.fieldsetsInfo);
  }

  if (!checkedFilters.length) validation.result = "no-filters";

  return validation;
};

const clearErrorMessages = (fieldsetsObj) => {
  Object.keys(fieldsetsObj).forEach((fieldsetId) => {
    const fieldset = document.getElementById(fieldsetId);
    const fieldsetIdSplit = fieldsetId.split("-");
    fieldsetIdSplit.pop();
    const categoryNameJoined = fieldsetIdSplit.join("-");
    const categoryNameId =
      categoryNameIdTabIdDictionary[categoryNameJoined].categoryNameId;
    const tabId = categoryNameIdTabIdDictionary[categoryNameJoined].tabId;
    const categoryNameNodeEl = document.getElementById(categoryNameId);
    const tabNodeEl = document.getElementById(tabId);
    Array.from(fieldset.children).forEach((children) => {
      children.className.includes("error") && children.remove();
      // Array.from(fieldset.classList).includes("error-wrapper") &&
      //   fieldset.classList.remove("error-wrapper");
      categoryNameNodeEl.classList.contains("category-exclamation") &&
        categoryNameNodeEl.classList.remove("category-exclamation");
      tabNodeEl.classList.contains("tab-exclamation") &&
        tabNodeEl.classList.remove("tab-exclamation");
    });
  });
  validation = {
    result: "no-errors",
    fieldsetsInfo: {
      "green-chest-filter": {},
      "blue-chest-filter": {},
      "gold-chest-filter": {},
      "dungeons-filter": {},
      "leather-filter": {},
      "iron-filter": {},
      "stone-filter": {},
      "wood-filter": {},
      "flux-filter": {},
    },
  };
};

const createErrorMsg = (fieldsetsObj) => {
  for (const [fieldsetId, fieldsetError] of Object.entries(fieldsetsObj)) {
    //to fix in refactor step
    const fieldsetIdSplit = fieldsetId.split("-");
    fieldsetIdSplit.pop();
    const categoryNameJoined = fieldsetIdSplit.join("-");
    const categoryNameId =
      categoryNameIdTabIdDictionary[categoryNameJoined].categoryNameId;
    const tabId = categoryNameIdTabIdDictionary[categoryNameJoined].tabId;
    const categoryNameNodeEl = document.getElementById(categoryNameId);
    const tabNodeEl = document.getElementById(tabId);
    if (Object.keys(fieldsetError).length) {
      const fieldset = document.getElementById(fieldsetId);
      Object.values(fieldsetError).forEach((errorMsg, idx) => {
        const errorText = document.createElement("p");
        errorText.innerHTML = errorMsg;
        errorText.className = `error-${idx}`;
        fieldset.appendChild(errorText);
        categoryNameNodeEl.classList.add("category-exclamation");
        tabNodeEl.classList.add("tab-exclamation");
        // fieldset.classList.add("error-wrapper");
      });
    }
  }
};

const fetchAvaRoads = () => {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  let results;

  const isValidated = validateFilters();

  if (isValidated.result !== "error") {
    const resultsShown = document.getElementsByClassName("result");
    if (resultsShown.length > 0) {
      Array.from(resultsShown).forEach((resultShown) => resultShown.remove());
    }
    results = searchInput
      ? AVA_ROADS.filter((avaRoad) =>
          avaRoad.name.toLowerCase().includes(searchInput)
        )
      : AVA_ROADS;

    // switch(isValidated.result){
    //   case 'no-filters':
    //   results = searchInput
    //   ? AVA_ROADS.filter((avaRoad) =>
    //       avaRoad.name.toLowerCase().includes(searchInput)
    //     )
    //   : AVA_ROADS;
    //   break;
    //   case 'no-errors':
    //     results = getFilteredResults();
    if (isValidated.result === "no-errors") {
      results = getFilteredResults();
    }

    // if filters are applied

    createResults(results);
  }
};
fetchAvaRoads();

const filterDictionary = {
  "green-chest": "greenChests",
  "blue-chest": "blueChests",
  "gold-chest": "goldChests",
  dungeons: "dungeons",
  leather: "leatherGatheringSpots",
  iron: "ironGatheringSpots",
  wood: "woodGatheringSpots",
  stone: "stoneGatheringSpots",
  flux: "fluxGatheringSpots",
};

const getFilteredResults = (searchValue) => {
  const filters = document.querySelectorAll(`input[id*="checkbox"]`);
  const appliedFilters = Array.from(filters).filter((filter) => filter.checked);
  const filtersValue = {};
  //get data from checked filters/inputted data in filters
  appliedFilters.forEach((appliedFilter) => {
    const appliedFilterId = appliedFilter.id.split("-");
    appliedFilterId.splice(-1);
    const categoryId = appliedFilterId.join("-");
    const filterfieldsetId = `${categoryId}-filter`;
    const tierId = `${categoryId}-tier`;
    const amountId = `${categoryId}-amount`;
    const filterFieldset = document.getElementById(filterfieldsetId);
    Array.from(filterFieldset.children).forEach((fieldset, idx) => {
      const fieldsetId = fieldset.id.split("-").splice(-1);
      const tierValue = document.getElementById(
        `${tierId}-${fieldsetId}`
      ).value;
      const amountValue = document.getElementById(
        `${amountId}-${fieldsetId}`
      ).value;
      filtersValue[categoryId] = {
        ...filtersValue[categoryId],
        [idx]: {
          amount: +amountValue,
          tier: tierValue,
        },
      };
    });
  });

  //compare AVA_ROADS with data from filters
  const avaRoads = searchValue
    ? AVA_ROADS.filter((avaRoad) =>
        avaRoad.name.toLowerCase().includes(searchInput)
      )
    : AVA_ROADS;

  const filteredRoads = [];
  avaRoads.forEach((avaRoad) => {
    const doesValueExistArr = [];
    for (const [filterKey, filterValue] of Object.entries(filtersValue)) {
      if (avaRoad[filterDictionary[filterKey]]) {
        const filterValArr = Object.values(filterValue);
        if (filterValArr.length > avaRoad[filterDictionary[filterKey]].length) {
          doesValueExistArr.push(false);
          return;
        }
        filterValArr.forEach((filterVal) => {
          const doesNodeExist = avaRoad[filterDictionary[filterKey]].find(
            (avaNode) => avaNode.tier === filterVal.tier
          );
          if (!doesNodeExist) doesValueExistArr.push(false);
          if (doesNodeExist) {
            if (filterVal.amount > doesNodeExist.amount) {
              doesValueExistArr.push(false);
            }
          }
        });
      }
    }
    if (!doesValueExistArr.includes(false)) filteredRoads.push(avaRoad);
  });

  return filteredRoads;
};

const clearFilters = () => {
  const filters = document.querySelectorAll(`input[id*="checkbox"]`);
  const appliedFilters = Array.from(filters).filter((filter) => filter.checked);
  appliedFilters.forEach((appliedFilter) => appliedFilter.click());
  clearErrorMessages(validation.fieldsetsInfo);
};

const searchBtn = document.getElementById("search__btn");
searchBtn.addEventListener("click", () => fetchAvaRoads());

const clearFiltersBtn = document.getElementById("clear-filters");
clearFiltersBtn.addEventListener("click", () => clearFilters());

// const searchInput = document.getElementById("searchInput");

document.querySelector("body").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchBtn.click();
  }
});

const filterTabsIdTofilterOptionsId = {
  "filters-option-chests-tab": "filters-option-chests",
  "filters-option-dungeons-tab": "filters-option-dungeons",
  "filters-option-gatheringspots-tab": "filters-option-gatheringspots",
};

const showFilterOptions = (id, currentFilterTabId) => {
  Object.keys(filterTabsIdTofilterOptionsId).forEach((filterTabId) => {
    const filterTab = document.getElementById(filterTabId);
    if (filterTabId === currentFilterTabId)
      !filterTab.classList.contains("active") &&
        filterTab.classList.add("active");
    else {
      filterTab.classList.contains("active") &&
        filterTab.classList.remove("active");
    }
  });
  Object.values(filterTabsIdTofilterOptionsId).forEach((filterOptionId) => {
    const filterOption = document.getElementById(filterOptionId);
    if (filterOption.id !== id) {
      filterOption.classList.contains("show") &&
        filterOption.classList.remove("show");
      filterOption.classList.add("covered");
    } else {
      filterOption.classList.contains("covered") &&
        filterOption.classList.remove("covered");
      filterOption.classList.add("show");
    }
  });
};

showFilterOptions(
  Object.values(filterTabsIdTofilterOptionsId)[0],
  Object.keys(filterTabsIdTofilterOptionsId)[0]
);

const filtersTabs = document.getElementsByClassName("filters__tabs")[0];

Array.from(filtersTabs.children).forEach((filterTab) => {
  filterTab.addEventListener("click", () => {
    showFilterOptions(
      filterTabsIdTofilterOptionsId[filterTab.id],
      filterTab.id
    );
  });
});

const hideFiltersBtn = document.getElementById("hide-filters");
hideFiltersBtn.addEventListener("click", () => {
  const filters = document.getElementById("filters");
  if (filters.classList.contains("show-animated")) {
    filters.classList.remove("show-animated");
    filters.classList.add("covered-animated");
    hideFiltersBtn.innerHTML = "Show filters";
    clearFilters();
  } else {
    filters.classList.contains("covered") &&
      filters.classList.remove("covered");
    filters.classList.remove("covered-animated");
    filters.classList.add("show-animated");
    hideFiltersBtn.innerHTML = "Hide filters";
  }
});
