import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../../services/Api";
import ProductsItem from "../../shared/components/productsItem";
import Pagination from "../../shared/components/Pagination";

const Search = () => {
  const [product, setProduct] = useState([]);
  const [pages, setPages] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const pageCategory = Number(searchParams.get("page")) || 1;
  useEffect(() => {
    getProducts({
      params: {
        limit: 9,
        name: keyword,
        page: pageCategory,
      },
    })
      .then(({ data }) => {
        setProduct(data.data.docs);
        setPages(data.data.pages);
      })
      .catch((error) => console.log(error));
  }, [keyword, pageCategory]);
  return (
    <>
      <div>
        <div className="products">
          <div id="search-result">
            Kết quả tìm kiếm với sản phẩm <span>{keyword}</span>
          </div>
          <div className="product-list card-deck">
            {product.map((item, index) => (
              <ProductsItem item={item} />
            ))}
          </div>
        </div>
        {/*	End List Product	*/}
        <div id="pagination">
          <Pagination pages={pages} />
        </div>
      </div>
    </>
  );
};

export default Search;
