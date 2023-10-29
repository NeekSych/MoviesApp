import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/app/App'
import RatedMovies from './components/rated/rated'
// import React from 'react';
import { Tabs } from 'antd'

const onChange = (key) => {
  console.log(key)
}
const items = [
  {
    key: '1',
    label: 'All',
    children: <App />,
  },
  {
    key: '2',
    label: 'Rated',
    children: <RatedMovies />,
  },
]
function Tab() {
  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Tab />)
