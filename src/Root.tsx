import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

  useEffect(() => {
    if (!csrfToken) {
      dispatch(fetchCsrfToken());
    }
  }, [dispatch, csrfToken]);

  useEffect(() => {
    if (getJwt != null) {
      dispatch(autoLogin());
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/App" element={<App />} />
        <Route path='/blackjack/:tableId' element={<Game />} />
        <Route path="/" element={<Landing />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
