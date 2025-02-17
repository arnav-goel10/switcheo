export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export const validateSwapInputs = (
  amount: string,
  fromToken: string,
  toToken: string
): ValidationResult => {
  const trimmed = amount.trim();
  if (trimmed === "") {
    return { valid: false, error: "Please enter an amount." };
  }

  const numeric = parseFloat(trimmed);
  if (isNaN(numeric)) {
    return { valid: false, error: "Invalid amount entered." };
  }
  if (numeric < 0) {
    return { valid: false, error: "Amount cannot be negative." };
  }
  if (numeric === 0) {
    return { valid: false, error: "Amount cannot be zero." };
  }
  if (!fromToken || !toToken) {
    return { valid: false, error: "Please select valid currencies." };
  }

  return { valid: true };
};
