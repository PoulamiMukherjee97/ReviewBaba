import { lazy } from 'react';

const LogIn = lazy(() => import('../modules/login/Login'));
const SignUp = lazy(() => import('../modules/signup/Signup'));
const Homepage = lazy(() => import('../modules/home/Homepage'));
const Genre = lazy(() => import('../modules/genre/Genre'));
const Review = lazy(() => import('../modules/review/Review'));


const routes = [{
    id:1,
    path: '/',
    element: LogIn,
    exact: true,
},
{
    id:2,
    path: '/signup',
    element: SignUp,
    exact: true,
},
{
    id:3,
    path: '/home',
    element: Homepage,
    exact: true,
},
{
    id:4,
    path: '/genre/:genre',
    element: Genre,
    exact: true
},
{
    id:5,
    path: '/review/:id',
    element: Review,
    exact: true
}];

export default routes;