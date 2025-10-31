import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

function App() {
  return (
    <Router>
      <Box minH="100vh">
        <Routes>
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </Box>
    </Router>
  )
}

export default App