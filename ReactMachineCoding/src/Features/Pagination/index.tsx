import { useEffect, useState } from "react";
import Product from "./components/Product";

interface IProduct {
  id: number;
  thumbnail: string;
  title: string;
}

interface IProductsList {
  products: IProduct[];
  limit: number;
  skip: number;
  total: number;
}

const Pagination = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<IProductsList | null>(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);

  const fetchProducts = async () => {
    setIsLoading(true);
    const response = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await response.json();
    if (data && data.products) {
      setProducts(data);
      setPages(Math.ceil(data.total / 10));
    }
    setIsLoading(false);
  };

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  if (isLoading) return <div>Loading......</div>;

  console.log({ pages });

  return (
    <>
      <h1>Pagination</h1>
      <div className="products_pagination">
        {products?.products?.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </div>
      {pages && pages > 0 && (
        <div className="pagination">
          {page !== 1 && <span onClick={() => setPage(page - 1)}>⏪</span>}
          {[...Array(pages)]?.map((_, index) => {
            return (
              <span
                key={index}
                className={`page-span ${
                  page === index + 1 ? "page-active" : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </span>
            );
          })}
          {page !== pages / 10 && (
            <span onClick={() => setPage(page + 1)}>⏩</span>
          )}
        </div>
      )}
    </>
  );
};

export default Pagination;
