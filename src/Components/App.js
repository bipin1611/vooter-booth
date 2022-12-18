import {useEffect} from "react";
import {
    canAccessCreateMember,
    getMembers,
    loadAccount,
    loadContract,
    loadNetwork,
    loadProvider, loadVotes,
    subscriberEvents
} from "../store/interactions";
import {useDispatch, useSelector} from "react-redux";
import Menu from "./Navbar";
import Body from "./Body";
import AlertMessage from "./AlertMessage";

function App() {

    const dispatch = useDispatch()
    const account = useSelector(state => state.provider.account)

    const loadBlockchainData = async () => {
        // connect blockchain network
        const provider = loadProvider(dispatch)
        const chainId = await loadNetwork(provider, dispatch)

        // load
        await loadAccount(provider, dispatch)
        const vote = await loadContract(chainId, provider, dispatch)

        window.ethereum.on('chainChanged', () => {
            window.location.reload()
        })

        window.ethereum.on('accountsChanged', () => {
            loadAccount(provider, dispatch)

            canAccessCreateMember(vote, account, dispatch)

        })


        subscriberEvents(vote, dispatch)

        getMembers(vote, provider, dispatch)

        canAccessCreateMember(vote, account, dispatch)

        loadVotes(vote, provider, dispatch)

    }
    useEffect(() => {
        loadBlockchainData()
    })

    return (
        <div className="App">

            <Menu/>

            <Body/>

            <AlertMessage />
        </div>
    );
}

export default App;
