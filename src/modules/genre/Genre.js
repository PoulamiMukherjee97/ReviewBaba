import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import './Genre.css';
import { getMovies } from '../../actions';
import rating from '../../utils/RatingRender';

const Genre = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { searchKey, movies } = useSelector((state) => state.CommonReducer);
    console.log(searchKey, movies);
    const dispatch = useDispatch();
    const [view, setView] = useState('list');
    const [moviesToShow, setMoviesToShow] = useState([]);
    const params = useParams();
    const genre = params.genre.charAt(0).toUpperCase()+params.genre.slice(1);
    console.log(params);
    useEffect(() => {
        if (searchKey.length === 0) {
            dispatch({ type: 'SAVE_SEARCH_KEY', payload: genre });
            dispatch(getMovies("genre", genre));
        } else {
            dispatch(getMovies("genre", searchKey));
        }
    }, []);
    useEffect(() => {
        setMoviesToShow(movies);
    }, [movies]);

    const sortMovies = (key) => {
        switch (key) {
            case 'name-asc':
                sortAsc('name');
                break;
            case 'name-desc':
                sortDesc('name');
                break;
            case 'time':
                sortDesc('released');
                break;
            case 'rating':
                sortDesc('rating');
                break;
            default:
                console.log('No such case');
        }
    }
    const sortAsc = (property) => {
        const moviesCopy = [...movies];
        moviesCopy.sort((a, b) => {
            if (a[property] > b[property]) return 1;
            if (a[property] < b[property]) return -1;
            return 0;
        });
        setMoviesToShow(moviesCopy);
    };
    const sortDesc = (property) => {
        const moviesCopy = [...movies];
        moviesCopy.sort((a, b) => {
            if (a[property] > b[property]) return -1;
            if (a[property] < b[property]) return 1;
            return 0;
        });
        // console.log(movies);
        setMoviesToShow(moviesCopy);
    }
    const toggleView = () => {
        if (view === 'list') {
            setView('tile');
        } else {
            setView("list");
        }
    };
    const handleSearch = (search) => {
        let moviesCopy = [...movies];
        moviesCopy = moviesCopy.filter(movie => {
            if (movie.name.toLowerCase().includes(search.toLowerCase()))
                return movie;
        });
        setMoviesToShow(moviesCopy);
    }
    const checkReview = (movie) => {
        console.log(movie);
        dispatch({ type: 'SET_REVIEW', payload: movie });
        navigate(`/review/${movie._id}`);
    }

    return <div className="p-3">
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Filters</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="filters" id="filter-comedy" value="comedy" />
                            <label className="form-check-label" htmlFor="filter-comedy">
                                Comedy
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="filters" id="filter-thriller" value="thriller" />
                            <label className="form-check-label" htmlFor="filter-thriller">
                                Thriller
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="filters" id="filter-mystery" value="mystery" />
                            <label className="form-check-label" htmlFor="filter-mystery">
                                Mystery
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="filters" id="filter-academyawardwinner" value="academyawardwinner" />
                            <label className="form-check-label" htmlFor="filter-academyawardwinner">
                                Academy Award Winner
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="filters" id="filter-horror" value="horror" />
                            <label className="form-check-label" htmlFor="filter-horror">
                                Horror
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="filters" id="filter-animated" value="animated" />
                            <label className="form-check-label" htmlFor="filter-animated">
                                Animated
                            </label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" >Clear All Filters</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="border shadow-lg px-5">
            <div className="mt-5">
                <div className="bg-secondary p-2">
                    <div className="row mx-0">
                        <div className="col-md-2 d-sm-flex mb-md-0 mb-3">
                            <p className="col-7 col-md-12 my-0 fw-bold text-light py-2">Movies</p>
                            <div className="col-5 dropdown d-flex d-md-none justify-content-end">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Sort
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><button className="dropdown-item btn btn-transperant" onClick={() => sortMovies('name-asc')}>Name- A to Z</button></li>
                                    <li><button className="dropdown-item btn btn-transperant" onClick={() => sortMovies('name-desc')}>Name- Z to A</button></li>
                                    <li><button className="dropdown-item btn btn-transperant" onClick={() => sortMovies('time')}>Time</button></li>
                                    <li><button className="dropdown-item btn btn-transperant" onClick={() => sortMovies('rating')}>Rating</button></li>
                                </ul>
                                <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">Filter</button>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex px-2 px-md-3">
                            <input type="text" className="col-md-11 p-1 text-truncate w-sm-80" placeholder="Enter your search text" id='search-box' />
                            <button className="btn btn-secondary px-1" onClick={() => handleSearch(document.getElementById('search-box').value)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </button>
                        </div>
                        <div className="col-md-4 sort-list d-none d-md-flex">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Sort
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><button className="dropdown-item btn btn-transperant" onClick={() => sortMovies('name-asc')}>Name- A to Z</button></li>
                                    <li><button className="dropdown-item btn btn-transperant" onClick={() => sortMovies('name-desc')}>Name- Z to A</button></li>
                                    <li><button className="dropdown-item btn btn-transperant" onClick={() => sortMovies('time')}>Time</button></li>
                                    <li><button className="dropdown-item btn btn-transperant" onClick={() => sortMovies('rating')}>Rating</button></li>
                                </ul>
                            </div>
                            <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">Filter</button>
                            <button className="btn btn-secondary" onClick={toggleView}>
                                {view === 'tile' ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-list-ul" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-grid-fill" viewBox="0 0 16 16">
                                    <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z" />
                                </svg>}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="my-4 row mx-0">
                    {moviesToShow.map(movie => (
                        <div key={movie.id} className={`row mx-0 border my-2 shadow-lg p-4 d-flex ${view === 'list' ? 'col-md-12' : 'col-md-3'}`}>
                            <div className={`col-12 d-flex justify-content-center ${view === 'list' ? 'col-md-3' : 'col-md-12'}`}>
                                <img src={movie.image} onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="

                }} className="movie-img w-100" />
                            </div>
                            <div className={`col-12  mt-md-0 mt-3 ${view === 'list' ? 'col-md-6' : 'col-md-12 mt-md-3'}`}>
                                <h3>{movie.name}</h3>
                                {view === "list" && <p>{`${movie.plot.substring(0, 200)}...`}</p>}
                                <p className="mb-1"><span className="fw-bold">Directed By:</span> {movie.director}</p>
                                <p className="mb-1"><span className="fw-bold">Released on:</span> {movie.released}</p>
                                {/* <p><span className="fw-bold">Cast:</span> {movie.actors}</p> */}
                                <div className={`d-block ${view === 'list' ? ' d-md-none' : 'd-md-block'}`}>
                                    <h4>Rating</h4>
                                    <div>{parse(rating(movie.rating))}</div>
                                    <p className="mt-3">Number of reviews- {movie.reviews} reviews</p>
                                </div>
                                <button className="btn btn-outline-secondary" onClick={() => checkReview(movie)}>Check Review</button>
                            </div>
                            <div className={`d-none d-md-block col-12 px-md-1 mt-md-0 mt-3 rating ${view === 'list' ? 'col-md-3' : 'd-md-none'}`}>
                                <h4>Rating</h4>
                                <div>{parse(rating(movie.rating))}</div>
                                <p className="mt-3">Based on {movie.reviews} reviews</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>;
};

export default Genre;