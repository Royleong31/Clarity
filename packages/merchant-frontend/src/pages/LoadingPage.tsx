import loadingImage from "../assets/loading.gif";

export default function LoadingPage() {
  return (
    // Center div in the middle of the screen
    <div
      className="
        flex 
        flex-col
        items-center 
        justify-center 
        h-screen
        text-center
    "
    >
      <img className="p-6" src={loadingImage} alt="loading" />
      <h1
        className="
        text-2xl
        font-bold
        w-full
      "
      >
        Loading
      </h1>
      <p className="text-gray-500">Good things come to those who wait</p>
    </div>
  );
}
