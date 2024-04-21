import React, { useEffect } from 'react'
import axios from 'axios'
import { getUserInfo } from './../../http/api/index';
import { routers } from './../../route/index';
import { Route, useLocation } from 'react-router';
export default function home(props) {

console.log(useLocation());

  useEffect(() => {
    let res= getUserInfo()
  }, [])

  const getUserInfo = async () => {
    let res = await axios.get('/getUserInfo')
    return res
  }

  return (
    <div>home</div>
  )
}
