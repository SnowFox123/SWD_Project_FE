// export const formatCurrency = (price) => {
//     return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
//   };


export const formatCurrency = (price) => {
  return (
    <span style={{ color: 'red', fontWeight: "bold" }}>
      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}
    </span>
  );
};


export const greenSpan = (text) => {
  return (
    <span style={{ color: '#fff',backgroundColor: 'green' }}>
      {text}
    </span>
  );
};
