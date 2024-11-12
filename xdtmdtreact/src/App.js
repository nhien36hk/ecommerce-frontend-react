import React, {Fragment, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes/index';
import DefaultComponent from './components/DefaultComoponent/DefaultComponent';
import {useEffect} from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { isJsonString } from './utils';
import jwtDecode from 'jwt-decode';
import * as UserService from '../src/service/UserService';
import {useDispatch, useSelector} from 'react-redux'
import { updateUser } from './redux/slides/userSlide';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  

  useEffect(() => {
    const {storageData,decoded} = handleDecoded()
    if(decoded?.id) {
      handleGetDetailsUser(decoded?.id,storageData )
    }
  }, []);

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token');
    let decoded = {};
    if(storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData)
    }
    return {decoded,storageData}
  }


  //Hàm này sẽ xử lý trước khi gọi đến handleGetDetailsUser
  //Nếu token hết hạn, gọi đến Userservice.js/refreshToken để cấp access_token mới
  UserService.axiosJWT.interceptors.request.use(async function(config) {
    const currentTime = new Date()
    const {decoded} = handleDecoded()
    if(decoded?.exp < currentTime.getTime() / 1000) {
      const data = await UserService.refreshToken();
      config.headers['token'] = `Bearer ${data?.access_token}`;
    }
    return config;
  }, function(error) {
    return Promise.reject(error);
  }
)

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id,token);
    dispatch(updateUser({...res?.data, access_token: token}));
  }

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            const isCheckAuth = !route.isPrivated || user.isAdmin
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            return (
              <Route path={route.path} key= {isCheckAuth && route.path} element = {
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
