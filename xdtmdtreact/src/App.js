import React, {Fragment} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes/index';
import DefaultComponent from './components/DefaultComoponent/DefaultComponent';
import {useEffect} from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';


function App() {

  // const fetchApi = async () => {
  //   const res = await axios.get('http://localhost:3001/api/product/get-all-product');
  //   return res.data
  // }
  
  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi });
  // console.log("query", query);
  

  // useEffect(() => {
  //   fetchApi();
  // }, []);

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            return (
              <Route path={route.path} key={route.path} element = {
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
