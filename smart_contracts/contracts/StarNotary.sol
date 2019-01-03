pragma solidity >=0.4.23;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract StarNotary is ERC721 {

    struct Star {
        string name;
        string dec;
        string mag;
        string cent;
        string story;
    }

    mapping(uint256 => Star) public tokenIdToStarMap;
    mapping(uint256 => uint256) public starsForSale;
    mapping(bytes32 => bool) public isStarTaken;
    
    event starOnSale(uint256 tokenId, uint256 price);
    event loneOwner(address owner);
   
    function createStar(string memory _name, string memory _dec, string memory _mag, string memory _cent, string memory _story, uint256 _tokenID) public
    {
        //check if token ID already exists by chekcing if any of the coordinates(dec/mag/cent) exists
        require(bytes(tokenIdToStarMap[_tokenID].dec).length == 0);

        //calculating starhash using star coordinates
        bytes32 _starHash = keccak256(abi.encodePacked(_dec, _mag, _cent));

        //check if star already exists
        require(!checkIfStarIsAvailable(_starHash));

        // all the values need to be filled and they are required. Which I will take care in the front end. 
        //if Token ID not exists then map the token id to star data

        Star memory newStar = Star(_name, _dec, _mag, _cent, _story);
        tokenIdToStarMap[_tokenID] = newStar;

        // Marking star as taken and will not allow the user to enter the same star values with different token ID. 

        //Assigning new value to the star that was just created
        isStarTaken[_starHash] = true;

        super._mint(msg.sender, _tokenID);

        address owner = this.ownerOf(_tokenID);

        // created an event here as .ownerOf function is throwing an exception in test cases. This will check for ownership
        emit loneOwner(owner);

    }
    function checkIfStarIsAvailable(bytes32 _starHash) public view returns(bool){
        return isStarTaken[_starHash];
    }

    function putStarUpForSale(uint256 _tokenID, uint256 _price)public
    {
        require(this.ownerOf(_tokenID) == msg.sender);
        //mapping token id to price of the star
        starsForSale[_tokenID] = _price;
        emit starOnSale(_tokenID, _price);
    }

    // Function referred from udacity to buy a star. 
    function buyStar(uint256 _tokenID) public payable { 
        require(starsForSale[_tokenID] > 0);

        uint256 starCost = starsForSale[_tokenID];
        address starOwner = this.ownerOf(_tokenID);
        require(msg.value >= starCost);

        _removeTokenFrom(starOwner, _tokenID);
        _addTokenTo(msg.sender, _tokenID);

        //starOwner.transfer(starCost);

        if(msg.value > starCost) { 
            msg.sender.transfer(msg.value - starCost);
        }

    }

    

}