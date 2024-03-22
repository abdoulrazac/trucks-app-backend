export const transformToBoolean = (input) => { 
    const value = `${input}`.trim().toLowerCase();
    if(value == 'null' || value == 'undefined') return null;
    if (value == 'true' || value == '1') return true;
    if (value == 'false' || value == '0') return false;
    return null;
  }