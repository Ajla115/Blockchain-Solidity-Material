const { expect } = require("chai");

let instance;

describe("Lightsaber", function() {
    this.beforeEach(async function () {
        let Contract = await ethers.getContractFactory("Lightsaber") //naziv contracta

        instance = await Contract.deploy() //construcotr ili nema, ili samo owner, ali msm da nema
    })

    it("should activate lightsaber", async function() {
        const [owner] = await ethers.getSigners();

        await expect(instance.activateLightsaber()).to.emit(instance, 'LightsaberActivated').withArgs(owner.address)
        expect(await instance.getBatteryLevel()).to.equal(100)

        await expect(instance.activateLightsaber()).to.be.revertedWith('Lightsaber is already activated!')
    })

   it("should only allow the wielder to activate the lightsaber", async function() {
        const [owner, address1] = await ethers.getSigners();
        let instance2 = instance.connect(address1)

        await expect(instance2.activateLightsaber()).to.be.revertedWith('Only the wielder can use the lightsaber.')
    })

   it("should deactivate lightsaber", async function() {
        const [owner] = await ethers.getSigners();
        
        await instance.activateLightsaber()
        await expect(instance.deactivateLightsaber()).to.emit(instance, 'LightsaberDeactivated').withArgs(owner.address)

        await expect(instance.deactivateLightsaber()).to.be.revertedWith('Lightsaber is not activated!')
    })

    it("should only allow the wielder to deactivate the lightsaber", async function() {
        const [owner, address1] = await ethers.getSigners();
        let instance2 = instance.connect(address1)

        await expect(instance2.deactivateLightsaber()).to.be.revertedWith('Only the wielder can use the lightsaber.')
    })

   it("should swing lightsaber", async function() {
        const [owner] = await ethers.getSigners();
        
        await expect(instance.swingLightsaber()).to.be.revertedWith('Lightsaber is not activated!')

        await instance.activateLightsaber()
        await expect(instance.swingLightsaber()).to.emit(instance, 'LightsaberSwing').withArgs(owner.address, 99)
        await expect(instance.swingLightsaber()).to.emit(instance, 'LightsaberSwing').withArgs(owner.address, 98)
        await expect(instance.swingLightsaber()).to.emit(instance, 'LightsaberSwing').withArgs(owner.address, 97)

        expect(await instance.getBatteryLevel()).to.equal(97)
    })

    it("should recharge lightsaber", async function() {
        const [owner] = await ethers.getSigners();
        
        await instance.activateLightsaber()
        await instance.swingLightsaber()
        await instance.swingLightsaber()
        await instance.swingLightsaber()

        await expect(instance.rechargeBattery(2)).to.emit(instance, 'LightsaberRecharged').withArgs(99)
       expect(await instance.getBatteryLevel()).to.equal(99)

        await instance.rechargeBattery(10)
        expect(await instance.getBatteryLevel()).to.equal(100)
    })

   it("should only allow the wielder to use the lightsaber", async function() {
        const [owner, address1] = await ethers.getSigners();
        
        await instance.activateLightsaber()
        
        let instance2 = instance.connect(address1)

        await expect(instance2.swingLightsaber()).to.be.revertedWith('Only the wielder can use the lightsaber.')
        await expect(instance2.rechargeBattery(10)).to.be.revertedWith('Only the wielder can use the lightsaber.')
    })
})