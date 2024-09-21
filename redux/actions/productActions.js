import axios from "axios";
import { ActionTypes } from "../actionTypes";


// aksiyon oluşturan fonksiyon
export const setLoading = () => {
    return {
        type: ActionTypes.SET_LOADİNG,
    };
};

export const setError = () => {
    return {
        type: ActionTypes.SET_ERROR,
    };
};

export const setProducts = (payload) => {
    return {
        type: ActionTypes.SET_PRODUCTS,
        payload,
    };
};

// Asenkron Thunk Aksiyonu
export const getProductData =() => (dispatch) => {
    axios
      .get('http://localhost:5000/products')
      .then((res) => dispatch(setProducts(res.data)))
      .catch((err) => dispatch(setError()));
}



// asenkron aksiyon 
/* 
   * Redux Thunk
   * Asenkron aksiyon - Thunk Aksiyonu
   

  * Redux Thunk, redux  kütüphanesini genişlten bir
  * middleWare(arayazılım). Redux kendisi senkron işlemleri
  * desteklerken, asenkron eylemleri doğrudan desteklemez
  * işte redux thunk bu durumda devreye girer

  *Redux thunk, redux eylemlerinin(aksiyonların) asenkron
  *olmasını sağlar. Bu özellikle ağ istekleri gibi asonkron
  *işlemleri aksiyon içerisinde gerçekleştirebiliyoruz.

  *Thunk, bir fonksiyonun içerisine farklı bir fonksiyon çağıran anlamına gelir.
*/

// "thunk action creatör"
function ornekThunkAksiyonu( ) {
    //asenkron işlemleri yapıcak asıl fonk.
    return async function (dispatch) {
        const data = await axios.get('...');
        dispatch({ type: 'SET_VERI' , payload:data});
    };
}

// ok fonksiyonu ile kısa yazım
const ornek2 = () => async (dispatch) => {
    const data = await axios.get('...');
    dispatch({type: 'SET_VERI' , payload: data});
};


