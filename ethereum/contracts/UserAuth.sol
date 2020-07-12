pragma solidity ^0.4.17;

contract UserAuth {
    address public usernameAddress;
    struct UserInfo{
        username string;
        email string;
    };

    function UserAuth(){
        usernameAddress = msg.sender;
    }
    
}
