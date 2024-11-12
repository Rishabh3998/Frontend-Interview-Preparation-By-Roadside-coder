interface IProduct {
  id: number;
  thumbnail: string;
  title: string;
}

const Product = ({ product }: { product: IProduct }) => {
  return (
    <div className="single__product">
      <img src={product.thumbnail} alt={product.title} />
      <p>{product.title}</p>
    </div>
  );
};

export default Product;
