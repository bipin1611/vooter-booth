import {ethers} from "ethers";
import config from '../config.json'
import VOTE_ABI from '../abis/vote.json'

export const loadProvider = (dispatch) => {

    const connection = new ethers.providers.Web3Provider(window.ethereum)

    dispatch({type: 'PROVIDER_LOADED', connection})

    return connection
}

export const loadNetwork = async (provider, dispatch) => {
    const {chainId} = await provider.getNetwork()

    dispatch({type: 'NETWORK_LOADED', chainId})

    return chainId
}


export const loadAccount = async (provider, dispatch) => {

    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})

    const account = ethers.utils.getAddress(accounts[0])

    dispatch({type: 'ACCOUNT_LOADED', account})

    let balance = await provider.getBalance(account)
    balance = ethers.utils.formatEther(balance)

    dispatch({type: 'BALANCE_LOADED', balance})

}

export const loadContract = async (chainId, provider, dispatch) => {

    const contractAddress = config[chainId].vote.address

    const contract = new ethers.Contract(contractAddress, VOTE_ABI, provider)

    dispatch({type: 'VOTE_LOADED', contract})

    return contract
}

export const subscriberEvents = (vote, dispatch) => {

    vote.on('Member', (id, name, sign, event) => {
        const member = event.args
        dispatch({type: "MEMBER_ADDED", member, event})
    })

    vote.on('Vote', (id, voter, event) => {
        const vote = event.args
        dispatch({type: "VOTE_ADDED", vote, event})
    })

}


export const getMembers = async (vote, provider, dispatch) => {

    const block = await provider.getBlockNumber()

    const getMembers = await vote.queryFilter('Member', 0, block)
    const members = getMembers.map(event => event.args)

    dispatch(({type: 'MEMBERS_LOADED', members}))

}


export const canAccessCreateMember = async (vote, account, dispatch) => {

    const owner = await vote.owner()

    dispatch({type: "CAN_ACCESS_MEMBER", owner})
}


export const createMember = async (vote, provider, name, sign, dispatch) => {

    dispatch({type: 'MEMBER_REQUEST'})

    try {

        let transaction
        const signer = await provider.getSigner()

        transaction = await vote.connect(signer).createMember(name, sign)
        await transaction.wait()

    } catch (e) {
        dispatch({type: 'MEMBER_FAIL'})

    }

}


export const doVote = async (vote, provider, id, dispatch) => {

    dispatch({type: 'VOTE_REQUEST'})

    try {

        let transaction
        const signer = await provider.getSigner()

        transaction = await vote.connect(signer).vote(id)
        await transaction.wait()

    } catch (e) {
        dispatch({type: 'VOTE_FAIL'})

    }

}


export const loadVotes = async (vote, provider, dispatch) => {

    const block = await provider.getBlockNumber()
    const getVotes = await vote.queryFilter('Vote', 0, block)
    const votes = getVotes.map(event => event.args)


    dispatch({type: 'VOTES_LOADED', votes})

}
