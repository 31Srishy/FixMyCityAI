/* eslint-disable react/jsx-no-target-blank */
import React,{useState, useEffect} from "react";
import Link from "next/link";
import axios from "axios";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Index() {

  const [cards, setCards] = useState([]);

//   const [blobUrl, setBlobUrl] = useState("");

// const fetchBlob = async () => {
//   try {
//     const response = await fetch(
//       "sv=2022-11-02&ss=bfqt&srt=c&sp=rwdlacupiyx&se=2025-02-23T00:00:08Z&st=2025-02-22T16:00:08Z&spr=https&sig=1eBSj4K%2FNjmrVYeSJi5qiPU80Flz%2Fb9TbW%2FEvn0rMd0%3D"
//     );
//     if (!response.ok) {
//       throw new Error("Failed to fetch blob");
//     }
//     const blobData = await response.blob();
//     const url = URL.createObjectURL(blobData);
//     setBlobUrl(url);
//   } catch (error) {
//     console.error(error.message);
//   }
// };



useEffect(() => {
  
  axios
    .get("http://127.0.0.1:8000/Complaints/display-complaints")
    .then((response) => {
      setCards(response.data);
    })
    .catch((error) => {
      console.error("Error fetching cards:", error);
    });
}, []);


  const handleLike = async (id) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id
          ? { ...card, liked: !card.liked, vote: card.liked ? card.vote - 1 : card.vote + 1 }
          : card
      )
    );
  
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/Complaints/add-vote/",
        { id, action: "toggle" }, // Send toggle action
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      console.log("Vote response:", response.data);
    } catch (error) {
      console.error("Error voting:", error.response?.data || error.message);
    }
  };
  
  
  return (
    <>
      <IndexNavbar fixed />
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h2 className="font-semibold text-4xl text-blueGray-600">
                Fix My City With Azure AI
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                Implemented by Bug Slayers{" "}
                
              </p>
              {/* <div className="mt-12">
                <a
                  href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/overview/notus?ref=nnjs-index"
                  target="_blank"
                  className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-400 active:bg-blueGray-500 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                >
                  Get started
                </a>
                <a
                  href="https://github.com/creativetimofficial/notus-nextjs?ref=nnjs-index"
                  className="github-star ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg"
                  target="_blank"
                >
                  Github Star
                </a>
              </div> */}
            </div>
          </div>
        </div>
        <img
          className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860-px"
          src="/img/pattern_nextjs.png"
          alt="..."
        />
      </section>

      <section className="mt-48 md:mt-40 pb-40 relative bg-blueGray-100">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-100 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto flex flex-wrap justify-center">
              {cards.map((card, index) => (
                <div
                  key={card.id}
                  className="w-full md:w-5/12 lg:w-3/12 px-2 mb-4"
                >
                  <div className="relative flex flex-col bg-white shadow-lg rounded-lg bg-blueGray-700">
                    {/* <img
                      src={card.image?.url || "/img/default-img.png"} 
                      alt="Card Image" 
                      onError={(e) => e.target.src = "/img/default-img.png"}
                      className="w-full h-40 object-cover rounded-t-lg"
                    /> */}
                    <div className="p-4">
                      <h4 className="text-lg font-bold text-white">{card.classified_domain}</h4>
                      <p className="text-sm font-light mt-1 text-white">
                        {card.summary}
                      </p>
                      <div className="flex justify-between mt-3 items-center">
                        <span className="text-sm font-light text-white">
                          Assignee: {card.full_name}
                        </span>
                        <button
                          className={`rounded-full p-1 transition duration-300 ${
                            card.liked ? "bg-yellow-400" : "bg-gray-200 hover:bg-yellow-400"
                          }`}
                          onClick={() => handleLike(card.id)}
                        >
                          👍{" "}
                          <span className={`ml-1 ${card.vote ? "text-black" : "text-yellow-400"}`}>
                            {card.vote}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input from backend */}


        {/* deleted code A */}
        </section>
        {/* deleted code A (Remove the section above )*/}

      <Footer />
    </>
  );
}
