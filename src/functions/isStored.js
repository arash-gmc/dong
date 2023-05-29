import _ from "lodash";

export const isStored = (peoples,pays) => {
    const stored = JSON.parse(localStorage.getItem("data"));
    if (!stored) return false;
    return (
      _.isEqual(peoples, stored.peoples) &&
      _.isEqual(pays, stored.pays)
    );
  };