//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandRegistration {
    struct Land {
        address owner;
        string location;
        uint256 area;
        bool isRegistered;
    }

    mapping(uint256 => Land) public lands;
    uint256 public landCount;

    event LandRegistered(uint256 indexed landId, address indexed owner, string location, uint256 area);

    // Function to register a new land
    function registerLand(address _owner, string memory _location, uint256 _area) public returns (uint256) {
        require(_owner != address(0), "Invalid owner address");
        require(bytes(_location).length > 0, "Invalid location");
        require(_area > 0, "Invalid area");

        landCount++;
        lands[landCount] = Land(_owner, _location, _area, true);
        emit LandRegistered(landCount, _owner, _location, _area);
        return landCount;
    }

    // Function to transfer ownership of a land
    function transferLandOwnership(uint256 _landId, address _newOwner) public {
        require(_newOwner != address(0), "Invalid new owner address");
        require(lands[_landId].isRegistered, "Land does not exist");

        Land storage land = lands[_landId];
        require(msg.sender == land.owner, "Only the owner can transfer the land");

        land.owner = _newOwner;
    }

    // Function to get land details
    function getLandDetails(uint256 _landId) public view returns (address owner, string memory location, uint256 area, bool isRegistered) {
        require(lands[_landId].isRegistered, "Land does not exist");
        Land storage land = lands[_landId];
        return (land.owner, land.location, land.area, land.isRegistered);
    }
}
