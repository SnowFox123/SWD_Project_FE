import { useState, useEffect } from "react";

const Header = () => {
  const messages = [
    "Thế giới đồ chơi an toàn chính hãng",
    "Hỗ trợ 24/7",
    "Miễn phí giao hàng đơn từ 500k",
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeIndex === messages.length) {
        setIsTransitioning(false); // Disable the transition
        setActiveIndex(0); // Reset the index to 0 instantly
      } else {
        setIsTransitioning(true); // Enable transition for smooth slide
        setActiveIndex((prevIndex) => prevIndex + 1);
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [activeIndex, messages.length]);

  return (
    <div
      className="header-slider"
      style={{
        overflow: "hidden", // Ensure overflow is hidden
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative", // Add relative position for slider
        width: "100%", // Full width of container
      }}
    >
      <div
        className="slide"
        style={{
          display: "flex",
          width: `${(messages.length + 1) * 100}%`, // Extra width for duplicate slide
          transform: `translateX(-${activeIndex * 100}%)`,
          transition: isTransitioning ? "transform 1s ease-in-out" : "none", // Smooth transition only if active
        }}
      >
        {messages.concat(messages[0]).map((message, index) => (
          <div
            key={index}
            className="py-3"
            style={{
              backgroundColor: "#EC1F27",
              color: "#fff",
              minWidth: "100%",
              fontSize: "16px",
              display: "flex",
              fontWeight: "bold",
              justifyContent: "center", // Center horizontally
              alignItems: "center", // Center vertically
              boxSizing: "border-box",
            }}
          >
            <p className="font-bold text-white text-center">{message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
