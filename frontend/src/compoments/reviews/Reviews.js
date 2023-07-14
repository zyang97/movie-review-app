import {useEffect, useRef, useContext} from 'react';
import api from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from './ReviewForm';
import { UserContext } from "../userContext/UserContext";

import React from 'react'

const Reviews = ({getMovieData, movie, reviews, setReviews}) => {

    const {loggedin} = useContext(UserContext);

    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(()=>{
        getMovieData(movieId);
    },[])

    async function addReview() {
        e.preventDefault();

        const review = reviewText.current;

        api.post('/api/v1/reviews', {reviewBody:rev.value,imdbId:movieId}).then((res) => {
            try {
                const updatedReviews = [...reviews, {body:rev.value}];
                rev.value = "";
                setReviews(updatedReviews);
            } catch (err) {
                console.error(err);
            }
        })
    }

  return (
    <Container>
        <Row className="mt-5">
            <Col>
                <img src={movie?.poster} alt="" />
            </Col>
            <Col>
                {
                    loggedin &&
                    <ReviewForm handleSubmit={addReview} revText={revText} labelText = "Write a review?" />  
                }
                {
                    !loggedin &&
                    <h5>Login first to write a review!</h5>
                }
                <br/>
                <div className='border-bottom mb-4'>
                    <h3>Reviews</h3>
                </div>
                {
                    reviews?.map((review) => {
                        return(
                            <div key={review._id}>
                                {review.body}
                                <hr />   
                            </div>                       
                        )
                    })
                }
            </Col>
        </Row>
        <Row>
            <Col>
                <hr />
            </Col>
        </Row>        
    </Container>
  )
}

export default Reviews