/* eslint-disable react/jsx-no-target-blank */
import React,{useState, useEffect} from "react";
import Link from "next/link";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Index() {
  const [liked, setLiked] = useState(false);

  // const handleLike = () => {
  //   setLiked(!liked);
  // };
  const [cards, setCards] = useState([]);

  // useEffect(() => {
  //   // Fetch data from the backend
  //   fetch("/api/cards") // Replace with your backend API endpoint
  //     .then((response) => response.json())
  //     .then((data) => setCards(data))
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);

  useEffect(() => {
    // Simulating backend data
    setCards([
      {
        id: 1,
        title: "Great for your awesome project",
        description:
          "Putting together a page has never been easier than matching together pre-made components.",
        assignee: "John Doe",
        image:
          "https://th.bing.com/th/id/OIP.sC87oZruk3srbdptjSmlNAHaE9?rs=1&pid=ImgDetMain",
        upvotes: 10,
      },
      {
        id: 2,
        title: "Boost your workflow",
        description:
          "Enhance productivity with easy-to-use, customizable layouts.",
        assignee: "Jane Doe",
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=700&q=80",
        upvotes: 5,
      },
      {
        id: 3,
        title: "Designed for modern UI",
        description:
          "A sleek, stylish design that fits seamlessly with any web project.",
        assignee: "Alex Smith",
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=700&q=80",
        upvotes: 8,
      },
      {
        id: 4,
        title: "Designed for modern UI",
        description:
          "A sleek, stylish design that fits seamlessly with any web project.",
        assignee: "Alex Smith",
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=700&q=80",
        upvotes: 8,
      },
      {
        id: 5,
        title: "Designed for modern UI",
        description:
          "A sleek, stylish design that fits seamlessly with any web project.",
        assignee: "Alex Smith",
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=700&q=80",
        upvotes: 8,
      },
    ]);
  }, []);


  const handleLike = (id) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id
          ? { ...card, upvotes: card.liked ? card.upvotes - 1 : card.upvotes + 1, liked: !card.liked }
          : card
      )
    );
  };
  
  return (
    <>
      <IndexNavbar fixed />
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h2 className="font-semibold text-4xl text-blueGray-600">
                Notus NextJS - A beautiful extension for Tailwind CSS.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                Notus NextJS is Free and Open Source. It does not change any of
                the CSS from{" "}
                <a
                  href="https://tailwindcss.com/?ref=creativetim"
                  className="text-blueGray-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tailwind CSS
                </a>
                . It features multiple HTML elements and it comes with dynamic
                components for ReactJS, Vue and Angular.
              </p>
              <div className="mt-12">
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
              </div>
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
        {/* <div className="container mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blueGray-700">
                <img
                  alt="..."
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
                  className="w-full align-middle rounded-t-lg"
                />
                <blockquote className="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 w-full block h-95-px -top-94-px"
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      className="text-blueGray-700 fill-current"
                    ></polygon>
                  </svg>
                  <h4 className="text-xl font-bold text-white">
                    Great for your awesome project
                  </h4>
                  <p className="text-md font-light mt-2 text-white">
                    Putting together a page has never been easier than matching
                    together pre-made components. From landing pages
                    presentation to login areas, you can easily customise and
                    built your pages.
                  </p>
                </blockquote>
              </div>
            </div> */}
      
            {/* Input from backend */}
            <div className="container mx-auto flex flex-wrap justify-center">
              {cards.map((card, index) => (
                <div
                  key={card.id}
                  className="w-10/12 md:w-6/12 lg:w-4/12 px-4 mb-6"
                >
                  <div className="relative flex flex-col bg-white shadow-lg rounded-lg bg-blueGray-700">
                    <img
                      alt="Project preview"
                      src={card.image}
                      className="w-full align-middle rounded-t-lg"
                    />
                    <div className="p-8">
                      <h4 className="text-xl font-bold text-white">{card.title}</h4>
                      <p className="text-md font-light mt-2 text-white">
                        {card.description}
                      </p>
                      <div className="flex justify-between mt-4 items-center">
                        <span className="text-md font-light text-white">
                          Assignee: {card.assignee}
                        </span>
                        <button
                            className={`rounded-full p-2 transition duration-300 ${
                              card.liked ? "bg-yellow-400" : "bg-gray-200 hover:bg-yellow-400"
                            }`}
                            onClick={() => handleLike(card.id)}
                          >
                            👍{" "}
                            <span className={`ml-1 ${card.liked ? "text-white" : "text-yellow-400"}`}>
                              {card.upvotes}
                            </span>
                          </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Input from backend */}

          {/* commented circular buttons */}
            {/* <div className="w-full md:w-6/12 px-4">
              <div className="flex flex-wrap">
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col mt-4">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-sitemap"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        CSS Components
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                        Notus NextJS comes with a huge number of Fully Coded CSS
                        components.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-drafting-compass"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        JavaScript Components
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                        We also feature many dynamic components for React,
                        NextJS, Vue and Angular.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col min-w-0 mt-4">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-newspaper"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">Pages</h6>
                      <p className="mb-4 text-blueGray-500">
                        This extension also comes with 3 sample pages. They are
                        fully coded so you can start working instantly.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-file-alt"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        Documentation
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                        Built by developers for developers. You will love how
                        easy is to to work with Notus NextJS.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
        {/* commented circular buttons */}

        {/* deleted code A */}
        </section>
        {/* deleted code A (Remove the section above )*/}

      <Footer />
    </>
  );
}
