function lowercase(value, ignoreAcronym) {
  if (value) {
    if (ignoreAcronym) {
      const isAcronym = value === value.toUpperCase();

      if (isAcronym) {
        return value;
      }


      return value.toLowerCase();
    }


    return value.toLowerCase();
  }


  return '';
}



export default lowercase;
