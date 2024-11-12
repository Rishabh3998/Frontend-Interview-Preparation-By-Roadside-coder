/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const maxVisiblePage = 10;
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

  const renderPageKey = (currPage: any, key: any) => {
    return (
      <span
        key={key}
        className={`page-span ${
          page === Number(currPage) + 1 ? "page-active" : ""
        }`}
        onClick={() => handlePageChange(+currPage + 1)}
      >
        {typeof currPage === "number" ? currPage + 1 : currPage}
      </span>
    );
  };

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

  const renderNumbers = () => {
    const pageNumbers = [];
    if (pages <= maxVisiblePage) {
      for (let i = 0; i < pages; i++) {
        pageNumbers.push(renderPageKey(i, i));
      }
    } else {
      const startPage = Math.max(1, page - Math.floor(maxVisiblePage / 2));
      const endPage = Math.min(pages, startPage + maxVisiblePage - 1);

      if (startPage > 1) {
        pageNumbers.push(renderPageKey("...", "ellipses-start"));
      }

      for (let i = startPage; i < endPage; i++) {
        pageNumbers.push(renderPageKey(i, i));
      }

      if (endPage < pages) {
        pageNumbers.push(renderPageKey("...", "ellipses-start"));
      }
    }
    return pageNumbers;
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  if (isLoading) return <div>Loading......</div>;

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
          {renderNumbers()}
          {page !== pages / 10 && (
            <span onClick={() => setPage(page + 1)}>⏩</span>
          )}
        </div>
      )}
    </>
  );
};

export default Pagination;
