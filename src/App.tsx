import BookFlip from './components/BookFlip'
import { tracks } from './data/tracks'

function App() {
  return (
    <div className="App">
      <BookFlip tracks={tracks} />
    </div>
  )
}

export default App
