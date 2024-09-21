import axios from 'axios';
import { ActionTypes } from './../actionTypes';

axios.defaults.baseURL = 'http://localhost:5000'

// senkron  aksiyonlor
export const setBasketLoading = () => ({
    type: ActionTypes.SET_BASKET_LOADİNG,
});

export const setBasket = (payload) => ({
    type: ActionTypes.SET_BASKET,
    payload,
});

export const setBasketError = () => ({
    type: ActionTypes.SET_BASKET_ERROR,
});

//asenkron aksiyonlar
// api'dan sepetteki ürünleri alıp
// store'a aktarır
export const getBasketData = () => (dispatch) => {
    axios
        .get('/basket')
        .then((res) => dispatch(setBasket(res.data)))
        .catch((err) => dispatch(setBasketError()));
};


// sepete yeni ürün ekler
// ekleme başarılı olursa
// ve eklenen ürünü reducer a aktarır
export const addToBasket = (product) => (dispatch) => {
    // 1) yeni bir obje oluşturup ürün bilgilerine adet ekleme
    const newProduct = { ...product, adet: 1 };


    // 2)objeden gereksiz verileri kaldır
    delete newProduct.renk;
    delete newProduct.ozellikler;
    delete newProduct.baslik;


    // 3)api'ya yeni ürünü kaydet
    axios
        .post('/basket', newProduct)
        .then((res) =>
            dispatch({
                type: ActionTypes.ADD_TO_BASKET,
                payload: newProduct,
            })
        )
        .catch((err) => setBasketError());
};

// api'deki ürünün miktarını 
// 1 arttırır ve reducer 'a bilgi gönderir
export const updateItem = (product) => (dispatch) => {
    axios
        .patch(`/basket/${product.id}`, { adet: product.adet + 1 })
        .then(() =>
            // api güncellenirse reducer u güncelliyecek
            //olan axiosu çalıştır
            dispatch({ type: ActionTypes.UPDATE_ITEM, payload: product.id })
        );
};

//api'dan bir ürün kaldırır
// devamında kaldırdığı ürün id'sini reducer'a gönderir
export const removeItem = (delete_id) => (dispatch) => {
    axios
    .delete(`/basket/${delete_id}`)
    .then(() => 
        //ekranın güncellenmesi için reducer'a haber vericez
      dispatch({type: ActionTypes.REMOVE_ITEM, payload:delete_id})
    );
};

