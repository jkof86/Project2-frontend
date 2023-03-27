import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Game from "./components/GameScreen/GameTable/Game";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import { autoLogin } from "./features/authSlice";
import { fetchCsrfToken } from "./features/csrfSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { RootState } from "./redux/store";
import { getJwt } from "./util/getJwt";

export const Root = () => {
  const dispatch = useAppDispatch();
  const csrfToken = useAppSelector((state: RootState) => state.csrf.token);
  const loggedIn = getJwt() != null;

  useEffect(() => {
    if (!csrfToken) {
      dispatch(fetchCsrfToken());
    }
  }, [dispatch, csrfToken]);

  useEffect(() => {
    if (getJwt() != null) {
      dispatch(autoLogin());
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/App" element={loggedIn? <App /> : <Navigate replace to={"/Login"}/>}/>
        <Route path='/blackjack/:tableId' element={loggedIn? <Game /> : <Navigate replace to={"/Login"}/>} />
        <Route path="/" element={<Landing />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/*" element={loggedIn? <Navigate replace to={"/App"}/> : <Navigate replace to={"/Login"}/>}/>
      </Routes>
    </BrowserRouter>
  );
};
