import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getProductCategory, getProductsByCategory } from "../../services/Api";
import ProductsItem from "../../shared/components/productsItem";
import PaginationCategory from "../../shared/components/PaginationCategory";

const Category = () => {
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [pages, setPages] = useState({});
  const page = Number(searchParams.get("page")) || 1;
  useEffect(() => {
    getProductsByCategory(id, {
      params: {
        limit: 12,
        page,
      },
    })
      .then(({ data }) => {
        setCategory(data.data.docs);
        setPages(data.data.pages);
      })
      .catch((error) => console.log(error));

    getProductCategory(id)
      .then(({ data }) => setCategories(data.data.name))
      .catch((error) => console.log(error));
  }, [id, page]);
  return (
    <>
      <div>
        <div className="products">
          <h3>
            {categories} (hiện có {pages.total} sản phẩm)
          </h3>
          <div className="product-list card-deck">
            {category.map((item, index) => (
              <ProductsItem item={item} />
            ))}
          </div>
        </div>
        {/*	End List Product	*/}
        <div id="pagination">
          <PaginationCategory pages={pages} />
        </div>
      </div>
    </>
  );
};

export default Category;
