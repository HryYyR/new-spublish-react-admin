import React from 'react'
import { Link } from 'react-router-dom'
export default function error() {
    return (
        <div>
            <h1>error</h1>
            <Link to="/home">返回主页</Link>
        </div>
    )
}
