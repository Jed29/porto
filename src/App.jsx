import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Cursor from './components/Cursor'
import Preloader from './components/Preloader'

function App() {
  return (
    <>
      <Cursor />
      <Preloader />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  )
}

export default App
