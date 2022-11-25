import axios from 'axios';
export const getMovies = (type,searchKey) => async (dispatch)=>{
    const res = await axios.get(`http://localhost:5000/api?${type}=${searchKey}`);
    if(res.status === 200){
        dispatch({type: "SET_MOVIES", payload: res.data});
    } else{
        dispatch({ type: 'SET_MOVIES_ERROR'});
    }
    console.log(res.data);
}