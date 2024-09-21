import axios from "axios";

export const getPrice = async (srcAddress: string, amount: number) => {
  const res = await axios.get(
    import.meta.env.VITE_PUBLIC_CLARITY_API_URL +
      "/proxy?url=" +
      import.meta.env.VITE_1INCH_URL +
      "&src=" +
      "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" +
      "&dst=" +
      srcAddress +
      "&amount=" +
      amount,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_1INCH_KEY}`, // Replace with your actual token
      },
    }
  );
  return res.data.dstAmount;
};
