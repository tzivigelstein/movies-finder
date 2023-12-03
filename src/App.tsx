import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Movies from './Movies'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Movies />} />
      </Routes>
    </Router>
  )
}
