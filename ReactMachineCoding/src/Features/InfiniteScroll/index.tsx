/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

// Implement infinite scroll in React.js

// Requirement:
//     -   Implement infinite scrolling for fetching more products when the user reaches the bottom
//         of the page.
//     -   https://dummyjson.com/products
//     -   Ensure that loading indicators are displayed appropriately while fetching data.
//     -   Implement optimizations to prevent excessive API request during scrolling.

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import "../../App.css";

const InfiniteScroll = () => {
  const [productsList, setProductsList] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://dummyjson.com/products?limit=${page * 10}`
      );
      const data = res.data;
      setProductsList(data);
      setPage(page + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const myThrottle = (cb: any, d: number) => {
    let last = 0;
    return (...args: any) => {
      const now = new Date().getTime();
      if (now - last >= d) {
        cb(...args);
        last = now;
      }
    };
  };

  const handleScroll = useCallback(
    myThrottle(() => {
      // document.documentElement.offSetHeight => The whole height of the document top to bottom.
      // window.innerHeight => Height of the viewport (the page which we can see)
      // document.documentElement.scrollTop => The height of out current scroll bar from top
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.offsetHeight
      ) {
        if (productsList.products.length < productsList.total && !loading) {
          // API call // There will be many api calls when the condition will met so it is not
          // optimized properly, so to optimize this we need to use throttling
          fetchData();
        }
      }
    }, 500),
    [productsList, loading]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const { products: allProducts } = productsList;

  console.log({ productsList });

  return (
    <div>
      <h1>Infinite scroll</h1>
      {allProducts?.length > 0 && (
        <div className="products">
          {allProducts?.map((product: any) => {
            return (
              <div className="products__single" key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <span>{product.title}</span>
              </div>
            );
          })}
        </div>
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default InfiniteScroll;

// condition to trigger fetch

//  -----------------------------------------------------------------------   |
// |                                                                       |  |
// |                             ViewPort                                  |  |
// |                                                                       |  |
//  -----------------------------------------------------------------------   |
//                                                                            |
//  -----------------------------------------------------------------------   |
// |                                                                       |  |
// |                    Content + Padding + Borders                        |  |   document.documentElement.offSetHeight
// |                       (HTML Document Height)                          |  |
// |                                                                       |  |
//  -----------------------------------------------------------------------   |
//                                                                            |
//  -----------------------------------------------------------------------   |
// |                                                                       |  |
// |                            +500 Pixels                                |  |
// |                                                                       |  |
//  -----------------------------------------------------------------------   |   window.innerHeight + document.documentElement.scrollTop + 500
