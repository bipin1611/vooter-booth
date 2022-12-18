import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {loadAccount} from "../store/interactions";
import {useDispatch, useSelector} from "react-redux";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import config from '../config.json'

const Menu = () => {

    const dispatch = useDispatch()

    const provider = useSelector(state => state.provider.connection)
    const account = useSelector(state => state.provider.account)
    const chainId = useSelector(state => state.provider.chainId)
    const balance = useSelector(state => state.provider.balance)

    const connectWallet = async () => {
        await loadAccount(provider, dispatch)
    }


    const networkHandler = async (event) => {

        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{chainId: event.target.value}]
        })
    }
    return (
        <Navbar bg="light" expand="lg">
            <Container>

                <Navbar.Brand >Voting Booth</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link disabled>Home</Nav.Link>

                        {chainId && (

                            <Form.Select name='network' aria-label="Default select example"
                                         value={config[chainId] ? `0x${chainId.toString()}` : `0`}
                                         onChange={networkHandler}>
                                <option value="0" disabled>Choose Network</option>
                                <option value="0x7A69">Localhost</option>
                                <option value="0x5">Goerli</option>
                                <option value="0x13881">Polygon Mumbai</option>
                            </Form.Select>
                        )}

                    </Nav>
                </Navbar.Collapse>

                <Navbar>
                    <Nav.Link>
                        {balance ? (
                            <small> My Balance : {balance} ETH </small>

                        ) : (
                            <small> My Balance : 0 ETH </small>

                        )}
                    </Nav.Link>


                    {account ? (
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip id="button-tooltip-2">{account}</Tooltip>}

                        >
                            <Button variant="primary" onClick={connectWallet}>{account.slice(0, 10)}</Button>

                        </OverlayTrigger>

                    ) : (
                        <Button variant="primary" onClick={connectWallet}>Connect Wallet</Button>

                    )}

                </Navbar>

            </Container>
        </Navbar>
    );
}

export default Menu;