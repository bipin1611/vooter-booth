import {createSelector} from "reselect";
import {get} from "lodash";

const members = state => get(state,'vote.allMembers.data', [])
const votes = state => get(state, 'vote.votes.data', [])
const account = state => get(state, 'provider.account', [])

export const membersSelector = createSelector(members, votes, account,(members, votes, account) =>{

     members = checkVotes(members, votes, account)

    return members
})

const checkVotes = (members, votes, account) =>{

    return members.map((member) =>{

        member = checkVote(member, votes, account)

        return member
    })
}
const checkVote = (member, votes, account)=>{

    let isVotedByMe = votes.some((v) => v.voter.toString() === account.toString())

    return({
        ...member,
        isVotedByMe
    })
}