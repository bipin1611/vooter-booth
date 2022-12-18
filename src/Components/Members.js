import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useDispatch, useSelector} from "react-redux";
import {doVote} from "../store/interactions";
import {membersSelector} from "../store/selectores";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Badge from 'react-bootstrap/Badge';

function Members() {

    const dispatch = useDispatch()

    const members = useSelector(membersSelector)

    const vote = useSelector(state => state.vote.contract)
    const provider = useSelector(state => state.provider.connection)


    const submitHandler = (e, member) => {
        e.preventDefault()
        doVote(vote, provider, member, dispatch)
    }

    return (
        <Container>
            <Row>
                <section className='text-center'>
                    <h3>Vote for Listed Members</h3>

                    {!members || members.length === 0 ? (
                        <p>No Members Found</p>
                    ) : (
                        <div className='text-center d-flex justify-content-center flex-wrap'>

                            {members && members.map((member, index) => {

                                return (
                                    <div className='w-30 m-2' key={index}>
                                        <Card className=" mt-2">
                                            <Card.Header>{member.sign}</Card.Header>
                                            <Card.Body>
                                                <Card.Title>{member.name}</Card.Title>
                                                <small>
                                                    Click below botton to give Vote
                                                </small>
                                                <Form onSubmit={(e) => submitHandler(e, member.id.toString())}>

                                                    {member.isVotedByMe === true ? (
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={<Tooltip id="button-tooltip-2">You have already
                                                                voted for someone.</Tooltip>}

                                                        >

                                                            <Badge bg="secondary">Voted</Badge>
                                                        </OverlayTrigger>
                                                    ) : (
                                                        <Button type='submit'>
                                                            Vote
                                                        </Button>
                                                    )}
                                                </Form>

                                            </Card.Body>
                                        </Card>
                                    </div>
                                )
                            })}
                        </div>
                    )}


                </section>
            </Row>

        </Container>
    )
        ;
}

export default Members;