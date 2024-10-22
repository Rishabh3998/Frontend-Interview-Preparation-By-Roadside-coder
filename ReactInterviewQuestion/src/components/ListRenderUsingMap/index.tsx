const products = [
  { id: 1, name: "Product A", price: 10, category: "Electronics" },
  { id: 2, name: "Product B", price: 20, category: "Clothing" },
  { id: 3, name: "Product C", price: 30, category: "Electronics" },
  { id: 4, name: "Product D", price: 40, category: "Clothing" },
  { id: 5, name: "Product E", price: 50, category: "Electronics" },
  { id: 6, name: "Product F", price: 60, category: "Clothing" },
  { id: 7, name: "Product G", price: 70, category: "Electronics" },
];

const names = ["Alice", "Bob", "Shawn", "Alice", "Shawn"];

const discountedList = products
  ?.filter((product) => product.price > 20)
  ?.map((product) => {
    return {
      ...product,
      discountedPrice: product.price - (product.price * 10) / 100,
    };
  });

const removeDuplicates = (names: string[]) => {
  return [...new Set(names)];
};

const ListRenderUsingMap = () => {
  return (
    <div>
      <ul>
        {products
          ?.filter((product) => product.category === "Electronics")
          ?.map((product) => (
            <li key={product.id}>
              <strong>{product.name}</strong> - ${product.price}, category:{" "}
              {product.category}
            </li>
          ))}
        <li style={{ listStyle: "none", marginTop: "1rem" }}>
          Total price: {products?.reduce((acc, curr) => acc + curr.price, 0)}
        </li>
      </ul>
      <ul>
        <li>
          {discountedList?.map((item) => {
            return (
              <li>
                <strong>{item.name}</strong> - ${item.price} - discountedPrice:{" "}
                ${item.discountedPrice}
              </li>
            );
          })}
        </li>
        <ul>
          {removeDuplicates(names)?.map((item) => (
            <li style={{ listStyle: "none", marginTop: "1rem" }}>{item}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};

export default ListRenderUsingMap;
