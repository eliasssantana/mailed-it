import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import axios, { AxiosError } from 'axios'
import api from './API'

function App(){

  const [email, setEmail] = useState<string>('')
  const [subject, setSubject] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if(!email || !subject || !message){
      return toast.error("Favor, preencher todo os campos")
    }
    try{ 

      setLoading(true)

      const { data } = await axios.post(`${api.BASEURL}/api/email`, {
        email,
        subject,
        message
      })

      setLoading(false)
      toast.success(data.message)
    }
    catch (e: any | AxiosError ){
      console.log(e)
      setLoading(false)
      if(axios.isAxiosError(e)){
        toast.error(
          e.response?
          e.response.statusText :
          e.message
        )
      }
    }
  }

  return (
    <div className="App">
      <ToastContainer position="top-right" limit={1}/>
      <header className="App-header">
        <form onSubmit={submitHandler}>
          <h1>Envie seu E-mail</h1>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" onChange={(e) =>setEmail(e.target.value) }></input>
          </div>
          <div>
            <label htmlFor="subject">Assunto</label>
            <input id="subject" type="text" onChange = {e => setSubject(e.target.value)}></input>
          </div>
          <div>
            <label htmlFor="message">Mensagem</label>
            <textarea 
            id="message"
            onChange={e => setMessage(e.target.value)}>
            </textarea>
          </div>
          <div className="button-container">
            <label></label>
            <button disabled={loading} type="submit">
              {loading? "Enviando...": "Enviar"}
            </button>
          </div>
        </form>
      </header>
    </div>
  )
}

export default App
