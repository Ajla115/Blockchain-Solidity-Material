// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
 
contract Lightsaber {

    event LightsaberActivated(address _addr);
    event LightsaberDeactivated(address addr2);
    event LightsaberSwing(address _Addr3, uint battery_status);
    event LightsaberRecharged(uint added_battery);
    bool public isActivated;
    uint public battery = 100;
    address public wiedler; //this is owner

    constructor(){
        wiedler = msg.sender;
        isActivated = false;
    }

    /*function initialize(uint batteryAmount) external {
        wiedler = msg.sender;
        isActivated = false;
        battery = batteryAmount;
    }*/

    modifier onlyWiedler(){
        require(msg.sender == wiedler, "Only the wielder can use the lightsaber.");
        _;
    }

    modifier notActivated(){
        require(!isActivated, "Lightsaber is already activated!");
        _;
    }

    modifier activatedLight(){
        require(isActivated, "Lightsaber is not activated!");
        _;
    }

    function activateLightsaber() external onlyWiedler notActivated {
        isActivated = true;
        emit LightsaberActivated(msg.sender);

    }

    function getBatteryLevel() external  view returns (uint) {
        if(battery > 100){
            return 100;
        }
        return battery;
    }

    function deactivateLightsaber() external onlyWiedler activatedLight {
        isActivated = false;
        emit LightsaberDeactivated(msg.sender);

    }

    function swingLightsaber() external onlyWiedler activatedLight{
        battery -= 1;
        emit LightsaberSwing(msg.sender, battery);

    }

    function rechargeBattery(uint number) external onlyWiedler {
        battery += number;
        emit LightsaberRecharged(battery);
    }
}