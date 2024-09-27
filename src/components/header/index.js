import { useState, useEffect } from "react";

const Header = () => {
  const messages = [
    "Thế giới đồ chơi an toàn chính hãng",
    "Hỗ trợ 24/7",
    "Miễn phí giao hàng đơn từ 500k",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [messages.length]);

  return (
    <div
      className="header-slider"
      style={{
        overflow: "hidden", // Ensure overflow is hidden
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="slide"
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
          transition: "transform 1s ease-in-out",
          display: "flex",
          width: `${messages.length * 100}%`, // Make container full width
        }}
      >
        {messages.map((message, index) => (
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
              // fontFamily: "Inter-SemiBold",
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
