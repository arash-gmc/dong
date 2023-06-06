

export const isStored = (peoples,pays) => {
    const stored = JSON.parse(localStorage.getItem("data"));
    if (!stored) return false;
    return (
      JSON.stringify(peoples)===JSON.stringify(stored.peoples) &&
      JSON.stringify(pays)===JSON.stringify(stored.pays)
    );
  };