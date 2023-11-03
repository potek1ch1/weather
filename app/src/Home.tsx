import React from 'react'
import "./Components/css/Home.css"
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='main'>
      <ul>
        <li><Link to={"./Current"}>現在の天気</Link></li>
        <li><Link to={"./History"}>過去の天気</Link></li>
        <li>天気予報 ← 作成中</li>
      </ul>
    </div>
  )
}
