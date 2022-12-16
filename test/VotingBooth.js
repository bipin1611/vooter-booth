const {expect} = require("chai");
const {ethers} = require('hardhat')


describe("VotingBooth", function () {

    let accounts, VotingBooth, deployer, user1, booth
    let transaction, result

    beforeEach(async () => {
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        user1 = accounts[1]

        VotingBooth = await ethers.getContractFactory('VotingBooth')
        booth = await VotingBooth.deploy()
    })

    describe('Deployment', async () => {

        it('has one owner of the voting booth', async () => {
            expect(await booth.owner()).to.equal(deployer.address)
        })
    })


    describe('Members', async () => {

        describe('Success', async () => {

            it('member should be created', async () => {

                transaction = await booth.connect(deployer).createMember('Bipin Parmar', 'Insane Party')
                await transaction.wait()

                expect(await booth.idCount()).to.equal(1)
            })

            it('must be emit Member event', async () => {
                transaction = await booth.connect(deployer).createMember('Bipin Parmar', 'Insane Party')
                result = await transaction.wait()

                const event = result.events[0]
                const arg = event.args

                expect(event.event).to.equal('Member')
                expect(arg.id).to.equal(1)
                expect(arg.name).to.equal('Bipin Parmar')
                expect(arg.sign).to.equal('Insane Party')

            })

        });
        describe('Failure', async () => {

            it('only owner of the booth can create members', async () => {

                await expect(booth.connect(user1).createMember('Bipin Parmar', 'Insane Party')).to.reverted

            })
        })
    })

    describe('Voting', async () => {

        beforeEach(async () => {

            transaction = await booth.connect(deployer).createMember('Bipin Parmar', 'Insane Party')
            await transaction.wait()

        })

        describe('Success', async () => {

            it('candidate can make vote', async () => {


                transaction = await booth.connect(deployer).vote(1)
                await transaction.wait()

                expect(await booth.voteCount()).to.equal(1)

            })

            it('must be emit Vote event', async () => {

                transaction = await booth.connect(deployer).vote(1)
                result = await transaction.wait()


                const event = result.events[0]
                const arg = event.args

                expect(event.event).to.equal('Vote')
                expect(arg.id).to.equal(1)
                expect(arg.voter).to.equal(deployer.address.toString())

            })

        });

    })


});
