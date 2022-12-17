// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
 import "hardhat/console.sol";

contract VotingBooth {

    address public owner;

    // these members are refer to who are going to participants in Voting booth so that candidate can vote for him/her
    mapping(uint256 => _Member) public members;

    // candidate's votes store on this mapping
    // address refers to voters and uint256 refer to id of member from _Member struct
    mapping(address => uint256) public votes;

    uint256 public idCount;
    uint256 public voteCount;

    struct _Member {
        uint256 id;
        string name;
        string sign;
    }

    // Member event will be triggered when a member is created
    event Member(uint id, string name, string sign);

    // Vote event will be triggered when someone vote for members listed
    event Vote(uint id, address voter);

    constructor() {
        owner = msg.sender;
    }

    function createMember(string memory _name, string memory _sign) public {

        // Only Owner of the Booth can create members
        require(owner == msg.sender);

        idCount++;

        // update members mapping
        members[idCount] = _Member(
            idCount,
            _name,
            _sign
        );

        // emit Member event
        emit Member(idCount, _name, _sign);
    }

    function vote(uint _id) public returns(bool success){

        // reject invalid address
        require(msg.sender != address(0));

        // prevent duplicate votes
        require(votes[msg.sender] != _id);

        // update vote count
        voteCount++;

        votes[msg.sender] = _id;

        emit Vote(_id, msg.sender);

        return true;
    }
}
