import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap';

export default function InputURL({initDownload}){
      const [url, setUrl] = useState('');
      const onSubmit = (e)=>{
            e.preventDefault()
            initDownload(url)
            setUrl('')
      }
      return (
            <div className="input-container">
                  Inserisci l'URL da scaricare:
                  <Form>
            <Form.Control
                  type="url"
                  id="inputUrl"
                  value={url}
                  aria-describedby="inputURL"
                  onChange={(e)=>{setUrl(e.target.value)}}
            />
            <Button className="mt-3"variant="primary" type="submit"  disabled={url === ''}onClick={(e)=>{onSubmit(e)}}>
                  Inizia il Download
            </Button>
            </Form>
            </div>
      )
}