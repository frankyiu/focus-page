import { ChangeEvent, FormEvent, useState } from "react"
import { Button, Form } from "react-bootstrap"


function VideoAdder({onSubmitEvent, onExitEvent}: {onSubmitEvent: any, onExitEvent: any}) {

    const [formData, setFormData] = useState<Video>({
        name: '',
        code: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>)=> {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})   
    }

    const addVideo = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if (formData.name && formData.code)
            onSubmitEvent(formData)
    }

    return (
    <>
        <Form onSubmit={addVideo}>
        <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" type="text" value={formData.name} onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="code">
            <Form.Label>Code</Form.Label>
            <Form.Control name="code" type="text" value={formData.code} onChange={handleChange}/>
        </Form.Group>
        <Button className="me-2" variant="light" type="submit" >
            Submit
        </Button>
        <Button variant="outline-light" onClick={onExitEvent} >
            Back
        </Button>
        </Form>
    </>)
}

export default VideoAdder