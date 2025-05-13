// Get today's date in YYYY-MM-DD format
const getTodayString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Get the last used KOT number for today from localStorage
const getLastKOTNumber = () => {
  const today = getTodayString();
  const lastKOT = localStorage.getItem(`lastKOT_${today}`);
  return lastKOT ? parseInt(lastKOT) : 0;
};

// Save the last used KOT number for today to localStorage
const saveLastKOTNumber = (number) => {
  const today = getTodayString();
  localStorage.setItem(`lastKOT_${today}`, number.toString());
};

// Generate a new KOT number
export const generateKOTNumber = () => {
  const lastNumber = getLastKOTNumber();
  const newNumber = lastNumber + 1;
  saveLastKOTNumber(newNumber);
  
  // Format: KOT-YYYYMMDD-XXX (where XXX is the daily sequence number)
  const today = getTodayString().replace(/-/g, '');
  return `KOT-${today}-${newNumber.toString().padStart(3, '0')}`;
};

// Get current KOT number without incrementing
export const getCurrentKOTNumber = () => {
  const lastNumber = getLastKOTNumber();
  const today = getTodayString().replace(/-/g, '');
  return `KOT-${today}-${lastNumber.toString().padStart(3, '0')}`;
}; 