import MyAlgoConnect from "@randlabs/myalgo-connect";

interface ConnectionSettings {
  shouldSelectOneAccount?: boolean;
  openManager?: boolean;
}
const myAlgoWallet = new MyAlgoConnect();

// Funcion para conectar wallet de MyAlgo
const connectToMyAlgo = async () => {
  try {
    const settings: ConnectionSettings = {
      shouldSelectOneAccount: false,
      openManager: false,
    };
    const accounts = await myAlgoWallet.connect(settings);
    //oobtenemos las address de la walleet
    const addresses = accounts.map((account) => account.address);
    const dataUserUpdate = {
      algo_address: addresses[0],
    };
    //almancenamos la direccioón en la base de datos.
    await saveAlgoAddress(dataUserUpdate);
  } catch (err) {
    throw err;
  }
};
