import {createContext, useState } from "react"
import { toast } from "react-toastify";

const BasketContext = createContext();

const BasketProvider = ({children}) => {
    const [basket,setBasket] = useState([]);
    
    //sepete ürün eklemek için fonk
const addToBasket = (product) => {
    // sepette ürün var mı kontrol et
    const found = basket.find((i) => i.id === product.id);

    if(!found) {
        //sepetten ürün yoksa
        setBasket(basket.concat({...product, amount: 1}));

        toast.success("Sepete ürün eklendi")
    } else {
        //sepette ürün mevcutsa miktarı bir artır
        const updated = {...found,amount: found.amount + 1};

        // sepetteki ürünlerin içerisinden güncellenen elemanın güncel değerini ekle
        const newBasket = basket.map((i) => (updated.id === i.id ? updated : i));

        // sepeti güncelle
        setBasket(newBasket);

        toast.info(`Ürün miktarı güncellendi.Miktar: ${updated.amount}`);
    }
    
};

    //sepetten eleman kaldırmak için fonk
    const removeFromBasket = (delete_id) => {
   // id'si bilinen ürünü sepetten kaldır
   const filtred = basket.filter((i) => i.id != delete_id);

   // sepeti güncelle
   setBasket(filtred);
   toast.error("Ürün sepetten kaldırıldı")
    };

    // ürün miktarızı azalt
    const decreaseAmount = (delete_id) => {
        // miktarı azaltılıcak ürünü sepette bul
        const found = basket.find((i) => i.id === delete_id);

        // eger ürünün miktarı 1 den fazla ise

        if(found.amount > 1) {

            //miktarı güncelle
const updated = {...found,amount: found.amount - 1};

            //güncel değeri diziye aktar
            const newBasket = basket.map((i) => (i.id == updated.id ? updated: i));
        
            // sepeti güncelle
            setBasket(newBasket);

            toast.info(`Ürün miktarı azaltıldı.Miktar: ${updated.amount}`);
        } else {
            // ürün miktarı 1 e eşitse bunu direkt sil
            removeFromBasket(delete_id);
        }
    };

  return (
   <BasketContext.Provider value={{basket,addToBasket,removeFromBasket,decreaseAmount}}>
    {/*  */}
    {children}
   </BasketContext.Provider>
  )
}

export {BasketProvider,BasketContext};
