import React, { Suspense } from 'react';
import { Route, Routes, Link, useLocation  } from 'react-router-dom';
import routes from './routes';

const RouteComponent = () => {
  const location = useLocation();
    return (<div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="">Review Baba</Link>
                {(location.pathname !== "/signup" && location.pathname !== "/") && <div className=" ">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                        </svg>
                    </button>
                </div>}
            </div>
        </nav>
        <Suspense fallback={<div className="text-center m-5 p-5">
  <div className="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>}>
            <Routes>
                {routes.map(route => {
                const Component = route.element;
                return <Route
                    path={route.path}
                    element={<Component />}
                    exact={route.exact}
                    key={route.id}
                />})}
            </Routes>
        </Suspense>
    </div>);
};

export default RouteComponent;
