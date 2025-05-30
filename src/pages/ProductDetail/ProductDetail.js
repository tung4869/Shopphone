import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import moment from "moment";
import { getImage } from "../../shared/ultils";
import { useEffect, useState } from "react";
import {
  createProductComment,
  getProductComment,
  getProductDetail,
} from "../../services/Api";
import PaginationProductDetail from "../../shared/components/PaginationProductDetail";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux-setup/reducers/cart";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [comment, setComment] = useState([]);
  const [changeValue, setChangeValue] = useState({});
  const [pages, setPages] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const onClickAddToCart = (type) => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        qty: 1,
      })
    );
    if (type === "buy-now") {
      return navigate("/cart");
    }
  };
  const clickSubmit = (e) => {
    e.preventDefault();
    createProductComment(id, changeValue)
      .then(({ data }) => {
        if (data.status === "success") {
          getComment(id);
          setChangeValue({});
        }
      })
      .catch((error) => console.log(error));
  };
  const inputValue = (e) => {
    const { name, value } = e.target;
    return setChangeValue({ ...changeValue, [name]: value });
  };

  const getComment = (id) => {
    getProductComment(id, {
      params: {
        limit: 5,
        page,
      },
    })
      .then(({ data }) => {
        setComment(data.data.docs);
        setPages(data.data.pages);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getProductDetail(id)
      .then(({ data }) => setProduct(data.data))
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    getComment(id);
  }, [page]);
  return (
    <>
      <div>
        <div id="product">
          <div id="product-head" className="row">
            <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
              <img alt="anh" src={getImage(product.image)} />
            </div>
            <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
              <h1>{product.name}</h1>
              <ul>
                <li>
                  <span>Bảo hành:</span> 12 Tháng
                </li>
                <li>
                  <span>Đi kèm:</span> {product.accessories}
                </li>
                <li>
                  <span>Tình trạng:</span> {product.status}
                </li>
                <li>
                  <span>Khuyến Mại:</span> {product.promotion}
                </li>
                <li id="price">Giá Bán (chưa bao gồm VAT)</li>
                <li id="price-number">{product.price}đ</li>
                <li
                  className={product.is_stock ? "" : "text-danger"}
                  id="status"
                >
                  {product.is_stock ? "Còn Hàng" : "Hết Hàng"}
                </li>
              </ul>
              {product.is_stock && (
                <div id="add-cart">
                  <button
                    onClick={() => onClickAddToCart("buy-now")}
                    className="btn btn-warning mr-2"
                  >
                    Mua ngay
                  </button>

                  <button onClick={onClickAddToCart} className="btn btn-info">
                    Thêm vào giỏ hàng
                  </button>
                </div>
              )}
            </div>
          </div>
          <div id="product-body" className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <h3>Đánh giá về {product.name}</h3>
              {product.details}
            </div>
          </div>
          {/*	Comment	*/}
          <div id="comment" className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <h3>Bình luận sản phẩm</h3>
              <form method="post">
                <div className="form-group">
                  <label>Tên:</label>
                  <input
                    onChange={inputValue}
                    name="name"
                    required
                    type="text"
                    className="form-control"
                    value={changeValue.name || ""}
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    onChange={inputValue}
                    name="email"
                    required
                    type="email"
                    className="form-control"
                    id="pwd"
                    value={changeValue.email || ""}
                  />
                </div>
                <div className="form-group">
                  <label>Nội dung:</label>
                  <textarea
                    onChange={inputValue}
                    name="content"
                    required
                    rows={8}
                    className="form-control"
                    value={changeValue.content || ""}
                  />
                </div>
                <button
                  onClick={clickSubmit}
                  type="submit"
                  name="sbm"
                  className="btn btn-primary"
                >
                  Gửi
                </button>
              </form>
            </div>
          </div>
          {/*	End Comment	*/}
          {/*	Comments List	*/}
          <div id="comments-list" className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              {comment.map((item, index) => (
                <div key={index} className="comment-item">
                  <ul>
                    <li>
                      <b>{item.name}</b>
                    </li>
                    <li>
                      {moment(item.createdAt).format("HH:mm:ss, DD-MM-YYYY")}
                    </li>
                    <li>
                      <p>{item.content}</p>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
          {/*	End Comments List	*/}
        </div>
        {/*	End Product	*/}
        <div id="pagination">
          <PaginationProductDetail pages={pages} />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
