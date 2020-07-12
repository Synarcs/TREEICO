pragma solidity ^0.4.17;

contract Erc {
    address public ownerContract;
    uint256 public totalSypply; // total number of tokens emitted
    string public name = "ICO20";
    string public symbol = "ICO";
    string public standard = "1.0.1";

    uint256 totalActiveICoForMainRoot;

    uint256 private balance;

    // emit  for this token
    // subscribe to token
    event Transfer(
        address indexed _from, // msg.sender
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _sender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf; // keep a track for all token balnce
    mapping(address => mapping(address => uint256)) allowed; // address allowed to withdraw monry from the owner account for a third party

    function getCurreentTokensAvailable() public view returns (uint256) {
        return balanceOf[msg.sender];
    }

    function Erc(uint256 _initialSupply) public {
        ownerContract = msg.sender;
        balanceOf[ownerContract] = _initialSupply;
        totalSypply = _initialSupply;
    }

    function totalSupply() public view returns (uint256) {
        return totalSypply;
    }

    struct BorrowedPeople {
        address loaners;
    }
    
    BorrowedPeople[] currentUsersActive;
    
    // transfer tokens and trade tokens //available for admin contract people
    function transfer(address _to, uint256 numTokens) public returns (bool) {
        require(balanceOf[ownerContract] >= numTokens);
        // require(numTokens < uint256(0.5 * totalSypply));
        balanceOf[ownerContract] = balanceOf[ownerContract] - numTokens;
        balanceOf[_to] = balanceOf[_to] + numTokens;
        Transfer(msg.sender, _to, numTokens);
        totalSypply = totalSypply -  numTokens;
        totalActiveICoForMainRoot += 1;
        BorrowedPeople memory val = BorrowedPeople({
            loaners:msg.sender
        });
        currentUsersActive.push(val);
        balance = this.balance;
        return true;
    }
    
    function endRequest(uint256 totalTokens) public returns(bool){
        balanceOf[ownerContract] = balanceOf[ownerContract] + totalTokens;
        return true;
    }

    // msg.sender to approve a delegate account holder to withdraw token from his account
    // allow th spender to buy only strict amount of tokens
    function approve(address _spender, uint256 value) public returns (bool) {
        require(_spender != ownerContract);
        allowed[msg.sender][_spender] = value;
        Approval(msg.sender, _spender, value);
        return true;
    }

    //  returns the current approved number of tokens by an owner to a specificaddress or a clinet
    function allowance(address owner, address _delegate)
        public
        view
        returns (uint256)
    {
        return allowed[owner][_delegate];
    }

    // sender is the legitimate account holder
    // without third party the sender is itself an buyer without any middlemen
    function transferFrom(
        address owner,
        address buyer,
        uint256 _value
    ) public returns (bool) {
        require(balanceOf[owner] >= _value && balanceOf[owner] != 0);
        require(_value <= allowed[owner][msg.sender]);
        balanceOf[owner] = balanceOf[owner] - _value;
        allowed[owner][msg.sender] = allowed[owner][msg.sender] - _value;
        balanceOf[buyer] = balanceOf[buyer] + _value;
        Transfer(owner, buyer, _value);
        //return allowed[owner][buyer];
        return true;
    }
}

contract Sale {
    address private SystemAdmin;
    Erc public tokenContract; /// use to access parent members of contract
    uint256 public tokenPrice;
    uint256 public tokenSold;
    uint256 public totalTokensfromParent;

    uint256 public minTokenForSatisfaction;

    event Sell(address _adre, uint256 tokens);

    function Sale(Erc _tokenContract, uint256 _tokenPrice) public {
        require(msg.sender != _tokenContract.ownerContract());
        SystemAdmin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }

    // free for first so that the contract sender get only some amount to sale
    // show case total amount
    function getInitTokensfromAdmin(
        uint256 percentForSale,
        uint256 _minAmountForSatisfaction
    ) public returns (bool) {
        require(percentForSale > 0);
        require(tokenContract.totalSypply() >= percentForSale);
        require(tokenContract.totalSypply() - percentForSale > 0);
        require(msg.sender != tokenContract.ownerContract()); // not viable for owner to sale a subpart of tokens
        require(tokenContract.transfer(msg.sender, percentForSale)); // other than deployer for this contract
        totalTokensfromParent = tokenContract.balanceOf(msg.sender);
        minTokenForSatisfaction = _minAmountForSatisfaction;
        require(minTokenForSatisfaction < totalTokensfromParent);

        // totalTokensfromParent = percentForSale; // tokens in contract
        return true;
    }

    function multiply(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    function currentTokenSold() public view returns (uint256) {
        return tokenSold;
    }

    function currentTokenPrice() public view returns (uint256) {
        return tokenPrice;
    }

    // return the balance in
    function icobalance() public view returns (uint256) {
        return multiply(tokenSold, tokenPrice);
    }

    // for external part as to sale for the user to take part init
    function buyTokens(uint256 _token) public payable returns (bool) {
        require(msg.value == multiply(_token, tokenPrice));
        require(
            msg.sender != tokenContract.ownerContract() &&
                msg.sender != address(tokenContract) &&
                msg.sender != SystemAdmin
        );
        totalTokensfromParent -= _token;
        require(tokenSold < minTokenForSatisfaction);
        tokenSold += _token;
        Sell(msg.sender, _token);
    }

    function end() public {
        require(msg.sender == SystemAdmin);
        require(tokenSold <= minTokenForSatisfaction);
        require(
            tokenContract.endRequest(tokenSold)
        );
        selfdestruct(SystemAdmin);
    }
}
