import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

function App() {
  return (
    <Router>
      <Box minH="100vh">
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          {/* 다른 라우트들 추가 예정 */}
        </Routes>
      </Box>
    </Router>
  )
}

export default App