import NewsList from '../components/NewsList'
import LoginForm from '../components/LoginForm'

const Home = () => {
  return (
    <div style={{ padding: 20 }}>
      <h1>CleanCoders - Noticias</h1>
      <LoginForm />
      <NewsList />
    </div>
  )
}

export default Home
