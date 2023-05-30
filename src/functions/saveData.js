export const saveData = (data) => {
    localStorage.setItem(
      "data",
      JSON.stringify(data)
    );
    
  };