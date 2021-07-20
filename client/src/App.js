import { useMutation, useQuery } from '@apollo/client'
import {useState, useEffect} from 'react'
import './App.css'
import { GET_ALL_USERS, GET_ONE_USER } from './query/user'
import { CREATE_USER } from './mutations/user'

function App() {

  const [username, setUsername] = useState("")
  const [age, setAge] = useState(0)
  const [users, setUsers] = useState([])
  // const {data, loading, error, refetch} = useQuery(GET_ALL_USERS, {pollInterval: 1000})

  const {data, loading, error, refetch} = useQuery(GET_ALL_USERS)

  const {data: oneUser, loading: loadingOneUser} = useQuery(GET_ONE_USER, {
    variables: {
      id: 1
    }
  })

  const [newUser] = useMutation(CREATE_USER)

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers)
    }
  }, [data])

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (!loadingOneUser) {
    console.log(oneUser)
  }

  const addUser = (e) => {
    e.preventDefault()
    newUser({
      variables: {
        input: {
          username, age: +age
        }
      }
    }).then(({data}) => {
      console.log(data)
      setUsername('')
      setAge(0)
    })
  }

  const getAll = e => {
    e.preventDefault()
    refetch()
  }

  return (
    <div className="App">
      <form>
        <input type="text" placeholder="Name" value={username} onChange={e => setUsername(e.target.value)}/>
        <input type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)}/>
        <div>
          <button onClick={addUser}>Create user</button>
          <button onClick={getAll}>Get users</button>
        </div>
      </form>
      <div>
        {users.map(user => (
          <div key={user.id} className="user">{user.id}. {user.username} - {user.age}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
