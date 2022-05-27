let stripTags = (original) => {
  return original.replace(/(<([^>]+)>)/gi, "");
}

export {stripTags};