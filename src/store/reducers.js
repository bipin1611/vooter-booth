export const provider = (state = {}, action) => {
    switch (action.type) {
        case 'PROVIDER_LOADED':
            return {
                ...state,
                connection: action.connection
            }
        case 'NETWORK_LOADED':
            return {
                ...state,
                chainId: action.chainId
            }

        case 'ACCOUNT_LOADED':
            return {
                ...state,
                account: action.account
            }

        case 'BALANCE_LOADED':
            return {
                ...state,
                balance: action.balance
            }

        default:
            return state
    }
}

const VOTE_STATE = {
    loaded: false,
    owner: '',
    contract: {},
    allMembers: {
        data: []
    },
    transaction: {
        isInProgress: false,
        isSuccess: false,
        isFail: false,
    },
    events: []


}
export const vote = (state = VOTE_STATE, action) => {
    let index, data
    switch (action.type) {
        case 'VOTE_LOADED':
            return {
                ...state,
                loaded: true,
                contract: action.contract
            }

        case 'CAN_ACCESS_MEMBER':
            return {
                ...state,
                owner: action.owner
            }

        case 'MEMBER_REQUEST':
            return {
                ...state,
                transaction: {
                    isInProgress: true,
                    isSuccess: false,
                },
                transferInProgress: true,
            }

        case 'MEMBER_SUCCESS':
            return {
                ...state,
                transaction: {
                    isInProgress: false,
                    isSuccess: true,
                },
                transferInProgress: false,
                events: [action.event, ...state.events]
            }


        case 'MEMBER_FAIL':
            return {
                ...state,
                transaction: {
                    isInProgress: false,
                    isSuccess: false,
                    isFail: true,
                },
                transferInProgress: false,
            }



        case 'MEMBER_ADDED':

            index = state.allMembers.data.findIndex(member => member.id.toString() === action.member.id.toString())

            if (index === -1) {
                data = [...state.allMembers.data, action.member]
            } else {
                data = state.allMembers.data
            }

            return {
                ...state,
                allMembers: {
                    ...state.allMembers,
                    data
                },
                transferInProgress: false,
                transaction: {
                    isInProgress: false,
                    isSuccess: true,
                    isFail: false,
                },
                events: [action.event, ...state.events]
            }

        case 'MEMBERS_LOADED':
            return {
                ...state,
                allMembers: {
                    data: action.members
                },
            }


        default:
            return state
    }
}