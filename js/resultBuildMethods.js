export const createMyElement = (element, className, innerHTML) => {
  const myElement = document.createElement(element);
  if (className) myElement.className = className;
  if (innerHTML) myElement.innerHTML = innerHTML;
  return myElement;
};

// const obj = {
//   items: greenChests,
//   divClassName: "chest-info",
//   amountSpanClassName: "green-chest",
//   tierSpanClassName: "green-chest__tier",
//   wrapper: greenChestDetails,
// };

export const createColumnOfDifferentTierItems = (payload) => {
  payload.items.forEach((item) => {
    const wrapper = createMyElement("div", payload.divClassName);
    const amountSpan = createMyElement(
      "span",
      payload.amountSpanClassName,
      `${item.amount}x `
    );
    wrapper.appendChild(amountSpan);
    const tierSpan = createMyElement(
      "span",
      payload.tierSpanClassName,
      item.tier
    );
    wrapper.appendChild(tierSpan);

    payload.wrapper.appendChild(wrapper);
  });
};
