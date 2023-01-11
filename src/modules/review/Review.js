import React, { useEffect, useState } from "react";
import parse from 'html-react-parser';
import rating from '../../utils/RatingRender';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
import { getMovies } from "../../actions";


const Review = () => {
    const dispatch = useDispatch();
    const { movieReview } = useSelector((state) => state.CommonReducer);
    const [review, setReview] = useState({});
    const { id } = useParams(); 
    const cast = review?.actors;
    useEffect(() =>{
        if(Object.keys(review).length===0){
            dispatch(getMovies("_id", id));
        }
    }, []);
    useEffect(() =>{
        setReview(movieReview);
    }, [movieReview]);

    return <div className="my-2 px-5 pt-2 justify-content-center">
        <div className="row mx-0 bg-secondary px-3 pt-5 border shadow-lg">
            <div className="col-12 col-md-4">
                <img alt="" src={review.image} onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="

                }} width="100%" />
                <div className="mt-3 text-light">
                    <div>
                        <h4>Rating</h4>
                        <p>
                            IMDB
                            <div className="mt-3 row mx-0">
                                <div className="col-md-1 px-0"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="#e8b923" class="bi bi-star-fill" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                </div>
                                <div className="col-md-9">
                                    <p className="px-2 fw-bold mb-0">{review.imdbRating}/10</p>
                                    <p className="px-2 mb-0"><b>{review.imdbReview}</b> reviews</p>
                                    <p className="px-2"><a target="_blank" rel="noreferrer" href={review.imdbLink} className="text-light">Check Here</a></p>
                                </div>
                            </div>
                        </p>
                        <p>
                            Rotten Tomatoes
                            <div className="mt-3 row mx-0">
                                <div className="col-md-1 px-0"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="#e8b923" class="bi bi-star-fill" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                </div>
                                <div className="col-md-9">
                                    <p className="px-2 fw-bold mb-0">{review.rtRating}/5</p>
                                    <p className="px-2 mb-0"><b>{review.rtReview}</b> reviews</p>
                                    <p className="px-2"><a target="_blank" rel="noreferrer" href={review.rtLink} className="text-light">Check Here</a></p>
                                </div>
                            </div>
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-8 mt-md-0 mt-3 text-light">
                <h3>{review.name}</h3>
                {review.release && <p className="mb-1">{review.release}</p>}
                {review.runtime && <p>{review.runtime}</p>}
                <div className="border-bottom">
                    <h4>StoryLine</h4>
                    <p>{review.plot}</p>
                    <p className="mb-0 fw-bold">Director: {review.director}</p>
                    <p className="mb-3 fw-bold">Producer: {review.producer}</p>
                </div>
                {review.actors && review.actors.length > 0 && <div className="mt-2 pb-3 border-bottom">
                    <h4>Top Cast</h4>
                    <div className="row mx-0 mt-4">
                        {cast?.map(actor => <div className="col-md-4 px-0 row mx-0 mb-4">
                            <img alt="" src={actor.actorImage} onError={(e) => { e.target.onerror = null; e.target.src = "data:image/jpeg;base64,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" }} className="img-thumbnail rounded-circle p-0 col-6" style={{height:'7em'}}/>
                            <div className="mt-3 col-6 px-1">
                                <p className="fw-bold mb-1">{actor.actorName}</p>
                                <p>{actor.actorCharacter}</p>
                            </div>
                        </div>)}
                    </div>
                </div>}
                <div className="mt-2 border-bottom pb-3">
                    <h4>ReviewBaba says...</h4>
                    <p>{review.review}</p>

                    <div className="row mx-0">
                        <div className="col-12 col-md-6 p-0">
                            <h5>Good Points</h5>
                            <ol className="px-3">
                                {review.gdpts?.map(pt => <li>{pt}</li>)}
                            </ol>
                        </div>
                        <div className="col-12 col-md-6">
                            <h5>Bad Points</h5>
                            <ol className="px-3">
                                {review.bdpts?.map(pt => <li>{pt}</li>)}
                            </ol>
                        </div>
                    </div>
                    <div className="mt-2">
                        <h5>Performance</h5>
                        <p>{review.performance}</p>
                    </div>
                    <div className="mt-2">
                        <h5>Direction</h5>
                        <p>{review.direction}</p>
                    </div>
                    <div className="mt-2">
                        <h5>Breaks needed</h5>
                        <p>{review.breaks}</p>
                    </div>
                </div>
                <div className="mt-2 pb-4">
                    <h4>ReviewBaba Rating</h4>
                    <div className="row mx-0 mt-4 justify-content-center text-center">
                        <div className="col-12 col-md-6 px-0 mb-3">
                            <h5>Plot</h5>
                            <div>{parse(rating(review.ratingPlot))}</div>
                        </div>
                        <div className="col-12 col-md-6 px-0 mb-3">
                            <h5>Acting</h5>
                            <div>{parse(rating(review.ratingActing))}</div>
                        </div>
                        <div className="col-12 col-md-6 px-0 mb-3">
                            <h5>Screenplay</h5>
                            <div>{parse(rating(review.ratingScreenplay))}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Review;