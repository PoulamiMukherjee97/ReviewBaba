import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';
import './Homepage.css';

const Homepage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [genre, setGenres] = useState([]);
    const genreClickHandler = (searchKey) => {
        // axios.get(`http://localhost:5000/api?genre=${searchKey}`).then(res => console.log(res));
        dispatch({ type: 'SAVE_SEARCH_KEY', payload: searchKey});
        navigate(`/genre/${searchKey.toLowerCase().split(' ').join('')}`);
    }
    useEffect(() => {
        axios.get("http://localhost:5000/api/genres").then(res => setGenres(res.data));
    }, [])
    return <div style={{background: `url("https://th.bing.com/th/id/R.d2edb29f3f970c36aadecbb01ed0bb79?rik=z%2bAuuobpN0KNSg&riu=http%3a%2f%2fisquad.tv%2fwp-content%2fuploads%2f2018%2f08%2fNetflix-Background.jpg&ehk=Ij4PSd%2bZkTcESSlAVWoGpNmExM0fu3BgteNT6AnS9lM%3d&risl=&pid=ImgRaw&r=0")`}}>
        <div className="border shadow-lg " style={{background: "rgba(1,1,1,0.5)"}}>
            <div className="mb-3 logo-container">
                <div className="d-flex justify-content-center">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5N9j-hqXWi9Gsum3rMfLolk6kGAzPfBwDzBIih9vzxhk5GleWOpYhX2YuHjW9Iur67ok&usqp=CAU" className="d-block logo p-3" width="300px" height="300px" />
                </div>
                <div className="logo-text text-center">
                    <h2>REVIEW BABA</h2>
                </div>
            </div>
            <h3 className="text-center mt-5 text-light">Genre</h3>
            <div className="row mx-0 justify-content-center">
                {genre.map(item => (<button key={item.id} className="col-md-3 btn btn-transperant genre-btn" onClick={() => genreClickHandler(item.title)}>
                    <div className="border shadow-lg p-2 my-3 mx-1 genre-container bg-light">
                        <div className="d-flex flex-direction-column p-2 genre">
                            <div className='border'>
                                <img className="w-100 d-block" src={item.img} width="100px" height="200px" />
                            </div>
                            <div className="d-flex justify-content-center">
                                <h5 className="genre-text w-100 text-center p-1 mx-2">{item.title}</h5>
                            </div>
                        </div>
                    </div>
                </button>))}
            </div>
        </div>
    </div>;
};

export default Homepage;