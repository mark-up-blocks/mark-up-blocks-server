function validateTagBlockProperty(property) {
  if (typeof property !== "object") {
    return false;
  }

  if (Array.isArray(property)) {
    return false;
  }

  return Object.values(property).every((value) => {
    if (typeof value === "string") {
      return true;
    }

    if (value === null) {
      return false;
    }

    if (typeof value === "object") {
      return validateTagBlockProperty(value);
    }

    return false;
  });
}

module.exports = { validateTagBlockProperty };
