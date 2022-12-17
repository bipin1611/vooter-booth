import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState} from "react";
import {createMember} from "../store/interactions";
import {useDispatch, useSelector} from "react-redux";

function Body() {
    const [name, setName] = useState('')
    const [sign, setSign] = useState('')

    const vote = useSelector(state => state.vote.contract)
    const provider = useSelector(state => state.provider.connection)
    const dispatch = useDispatch()
    const submitHandler = async (e) => {
        e.preventDefault();

        await createMember(vote, provider, name, sign, dispatch)

        setName('')
        setSign('')

    }

    return (
        <Container>
            <Row>
                <Col sm={4}>
                    <section>
                        <h3>Create Member</h3>
                        <Form onSubmit={submitHandler}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" value={name != "" ? name : ''}
                                              onChange={(e) => setName(e.target.value)}/>

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Sign</Form.Label>
                                <Form.Control type="text" placeholder="Enter Sign" value={sign != "" ? sign : ''}
                                              onChange={(e) => setSign(e.target.value)}/>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Add Member
                            </Button>
                        </Form>
                    </section>
                </Col>
                <Col sm={8}>sm=8</Col>
            </Row>

        </Container>
    );
}

export default Body;