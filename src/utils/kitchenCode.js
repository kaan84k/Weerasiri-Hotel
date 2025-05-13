// Generate a 5-digit code
const generateCode = () => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

// Get today's date in YYYY-MM-DD format
const getToday = () => {
  return new Date().toISOString().split('T')[0];
};

// Get or generate today's code
export const getKitchenCode = () => {
  const today = getToday();
  const storedCode = localStorage.getItem('kitchen_code');
  const storedDate = localStorage.getItem('kitchen_code_date');

  if (storedDate === today && storedCode) {
    return storedCode;
  }

  const newCode = generateCode();
  localStorage.setItem('kitchen_code', newCode);
  localStorage.setItem('kitchen_code_date', today);
  return newCode;
};

// Validate the entered code
export const validateKitchenCode = (enteredCode) => {
  const currentCode = getKitchenCode();
  return enteredCode === currentCode;
}; 