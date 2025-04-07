import CartCard from "./CartCard";
import { useState, useEffect } from "react";
import { getCart, increaseQuantity, decreaseQuantity,deleteProduct } from "../../api/cart";

const CartList = () => {
  const [cartList, setCartList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await getCart();
      const cartItems = response.data.map(item => ({
        id: item.productID,
        name: item.productName,
        price: item.price.toLocaleString(),
        quantity: item.quantity,
        checked: false,
        thumbnailImage: item.thumbnailImage
      }));
      setCartList(cartItems);
    } catch (error) {
      setError(error.message || "장바구니를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try{
      await deleteProduct(id);
      setCartList((prevList) => prevList.filter((item) => item.id !== id));
    }catch(error){
      alert(error.message || "삭제에 실패했습니다.");
    }
    
  };

  const handleCheck = (id) => {
    setCartList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleIncrease = async (id) => {
    try {
      await increaseQuantity(id);
      setCartList((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } catch (error) {
      alert(error.message || "수량 증가에 실패했습니다.");
    }
  };

  const handleDecrease = async (id) => {
    try {
      await decreaseQuantity(id);
      setCartList((prev) =>
        prev.map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } catch (error) {
      alert(error.message || "수량 감소에 실패했습니다.");
    }
  };

  const handleCheckAll = () => {
    setCartList((prev) => prev.map((item) => ({ ...item, checked: true })));
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (cartList.length === 0) return <div>장바구니가 비어있습니다.</div>;

  return (
    <div>
      {cartList.map((item) => (
        <CartCard
          key={item.id}
          item={item}
          onDelete={handleDelete}
          onCheck={handleCheck}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />
      ))}
    </div>
  );
};

export default CartList;