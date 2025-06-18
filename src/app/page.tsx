import Chatbox from "./components/Chatbox";
import Products from "./components/Products";
import Recommendations from "./components/Recommendations";
import Navbar from "./components/Navbar";
export default function Home() {
  return (
    <>
      <h1>SkinCareAI</h1>
      <Navbar />
      <Chatbox />
      <Products />
      <Recommendations />
    </>
  );
}
