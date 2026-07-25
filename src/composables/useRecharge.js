import { ref } from "vue";

export function useRecharge() {

  // State
  const amount = ref("");
  const selectedMethod = ref("upi");
  const loading = ref(false);
  const error = ref("");
  const success = ref("");

  // Quick amounts
  const quickAmounts = [100, 200, 500, 1000, 2000, 5000];

  // Payment methods
  const paymentMethods = [
    {
      id: "upi",
      name: "UPI",
      icon: "bi bi-phone"
    },
    {
      id: "paytm",
      name: "Paytm",
      icon: "bi bi-wallet2"
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: "bi bi-bank"
    }
  ];

  // Set amount
  function setAmount(value) {
    amount.value = value;
  }

  // Validate recharge
  function validate() {

    error.value = "";

    if (!amount.value || amount.value <= 0) {
      error.value = "Please enter a valid amount";
      return false;
    }

    if (amount.value < 100) {
      error.value = "Minimum recharge is ₹100";
      return false;
    }

    return true;
  }

  // Fake API call (replace with backend later)
  async function recharge() {

    if (!validate()) return;

    loading.value = true;
    success.value = "";

    try {

      // Simulated API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      success.value = `Recharge of ₹${amount.value} successful via ${selectedMethod.value}`;

      // reset
      amount.value = "";

    } catch (err) {

      error.value = "Recharge failed. Please try again.";

    } finally {

      loading.value = false;

    }

  }

  // Clear messages
  function clearMessages() {
    error.value = "";
    success.value = "";
  }

  return {

    amount,
    selectedMethod,
    loading,
    error,
    success,

    quickAmounts,
    paymentMethods,

    setAmount,
    validate,
    recharge,
    clearMessages

  };

}