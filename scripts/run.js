const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();

    // Compile contract, genertate artifacts & Starts new blockchain network
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');

    // Constructor runs on deploy
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    // Owner wave
    let waveTxn = await waveContract.wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

    // Random person wave
    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();
// 1. Creating a new local Ethereum network.
// 2. Deploying your contract.
// 3. Then, when the script ends Hardhat will automatically destroy that local network.
