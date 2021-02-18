import React, {Fragment} from 'react';
import Search from "./Search";
import {Link, Route} from "react-router-dom";
import {useAlert} from "react-alert";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../actions/userActions";

const Header = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const {user, loading} = useSelector(state => state.auth)

    const logoutHandler = () => {
        dispatch(logout())
        alert.success('Logged out successfully')
    }

    return (
        <Fragment>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <Link to={'/'}>
                            <img src={process.env.PUBLIC_URL + '/images/shopit_logo.png'} alt="logo"/>
                        </Link>
                    </div>
                </div>

                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <Route render={({history}) => <Search history={history}/>}/>
                </div>

                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <Link to="/cart" style={{textDecoration: 'none'}}>
                        <span id="cart" className="ml-3">Cart</span>
                        <span className="ml-1" id="cart_count">2</span>
                    </Link>

                    {user ? (
                        <div className="ml-4 dropdown d-inline">
                            <Link to="#!" className="btn dropdown-toggle text-white mr-4" id="dropDownMenuButton"
                                  type="button" data-toggle="dropdown" aria-haspopup="true"
                                  aria-expanded="false">
                                <figure className="avatar avatar-nav">
                                    <img src={user.avatar && user.avatar.url} alt="user && user.name"
                                         className="rounded-circle"/>
                                </figure>
                                <span>{user && user.name}</span>
                            </Link>

                            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
                                {user && user.role !== 'admin' ? (
                                    <Link to="/orders/me" className="dropdown-item">Orders</Link>
                                ) : (
                                    <Link to="/dashboard" className="dropdown-item">Dashboard</Link>
                                )}
                                <Link to="/me" className="dropdown-item">Profile</Link>
                                <Link to="/" className="dropdown-item text-danger" onClick={logoutHandler}>Logout</Link>
                            </div>

                        </div>
                    ) : !loading && <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>}
                </div>
            </nav>
        </Fragment>
    )
}

export default Header