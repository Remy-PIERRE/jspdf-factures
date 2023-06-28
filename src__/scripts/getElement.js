const getElementByParentId = (elementTag, parentId) => {
  const element = document.querySelector(`#${parentId} ${elementTag}`);

  return element;
};

/* */
/* */
/* */
export { getElementByParentId };
