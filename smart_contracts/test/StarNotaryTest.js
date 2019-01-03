//boiler plate version of the code is taken from udacity lectures 
//and modified as per the current project requriements. 


const StarNotary = artifacts.require('StarNotary')


contract('StarNotary', accounts => {
    
    let user1 = accounts[1]
    let user2 = accounts[2]

    let name = 'Wild Star'
    let dec = '24'
    let mag = '21'
    let cent = '2'
    let starStory = 'Found it when low, and got back my energy'
    let tokenId = 1


    beforeEach(async function() {
        this.contract = await StarNotary.new({from: accounts[0]})
    })

    describe('can create a star', () => {

        it('can create a star and return starStory and name of it', async function () {
            await this.contract.createStar(name, dec, mag, cent, starStory, tokenId, {from: accounts[0]})
            //getting the star info from the function defined in solidity contract file. 
            let starInfo = await this.contract.tokenIdToStarMap(tokenId)
            assert.equal(starInfo[0], name)
            assert.equal(starInfo[4], starStory)
        })
    })

    describe('star uniqueness', () => { 
        it('only stars unique stars can be minted', async function() { 

            await this.contract.createStar(name, dec, mag, cent, starStory, tokenId, {from:user1})
            // checking if user tries to create the same star with same params
            await expectThrow(this.contract.createStar(name, dec, mag, cent, starStory, tokenId, {from:user1}))
        })

        it('only stars unique stars can be minted even if their ID is different', async function() { 
            // first we mint our first star
            await this.contract.createStar(name, dec, mag, cent, starStory, tokenId, {from:user1})
            // then we try to mint the same star, and we expect an error
            await expectThrow(this.contract.createStar(name, dec, mag, cent, starStory, tokenId/2, {from:user1}))
        })

        it('minting unique stars does not fail', async function() { 
            for(let i = 0; i < 10; i ++) { 
                let id = i
                let newRa = i.toString()
                let newDec = i.toString()
                let newMag = i.toString()

                await this.contract.createStar(name, starStory, newRa, newDec, newMag, id, {from: user1})

                let starInfo = await this.contract.tokenIdToStarMap(id)
                assert.equal(starInfo[0], name)
                //console.log(starInfo[0])
            }
        })
    })

    describe('buying and selling stars', () => { 

        let starPrice = web3.utils.toWei('.01', "ether")

        beforeEach(async function () { 

            await this.contract.createStar(name, dec, mag, cent, starStory, tokenId, {from: user1})
            
        })

        it('user1 can put up their star for sale', async function () { 

            //condition to check whether the user1 is owner of the star.
            assert.equal(await this.contract.ownerOf(tokenId), user1)
            console.log(this.contract.ownerOf(tokenId))

            //put the star up for sale by sending the required params. 
            await this.contract.putStarUpForSale(tokenId, starPrice, {from: user1})
            
            assert.equal(await this.contract.starsForSale(tokenId), starPrice)
        })

        describe('user2 can buy a star that was put up for sale', () => { 
            beforeEach(async function () { 
                //Before buying checking if user 1 has put the star up for sale. 
                await this.contract.putStarUpForSale(tokenId, starPrice, {from: user1})
            })

            it('user2 is the owner of the star after they buy it', async function() { 
                await this.contract.buyStar(tokenId, {from: user2, value: starPrice, gasPrice: 0})
                //Transfer of oownership to uuser2. 
                assert.equal(await this.contract.ownerOf(tokenId), user2)
            })

            /*it('user2 ether balance changed correctly', async function () { 
                // Add your logic here
                const highBalance = web3.utils.toWei('1', 'ether')
                const balanceBefore = web3.eth.getBalance(user2)
                console.log(balanceBefore)

                await this.contract.buyStar(tokenId, {from: user2, value: highBalance, gasPrice: 0})
                const balanceAfter = web3.eth.getBalance(user2)
                console.log(balanceAfter)

                // there is an error here which I am still figuring out! 
                var diff = balanceBefore - balanceAfter

                assert.strictequal(diff, starPrice)
               
            })*/
        })
    })
})
var expectThrow = async function(promise) { 
    try { 
        await promise
    } catch (error) { 
        assert.exists(error)
        return 
    }

    assert.fail('expected an error, but none was found')
    }

