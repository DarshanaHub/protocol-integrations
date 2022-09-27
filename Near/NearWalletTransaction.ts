const [isLoading, setIsLoading] = useState(false);
// obtenemos la funciones del provider de Near
const { initContract, connectAccount } = useContext(NearContext);
//funcion para generar la transacción en Near
const NearWalletTransaction = async (
  talentId: string,
  type: string,
  id: string
) => {
  setIsLoading(true);
  const { contract, walletConnectionUser } = await initContract();
  const responseValidation = await walletConnectionUser
    .account()
    .functionCall(
      process.env.NEXT_PUBLIC_CONTRACT_NAME!,
      "addRegisterValidation",
      {
        talentId: talentId,
        typePublish: type,
        id: id,
      }
    );
  //funcion para almacenar el hash de la transacción en la base de datos.
  addNearTransaction(idApplication, responseValidation.transaction.hash);
  setIsLoading(false);
};
