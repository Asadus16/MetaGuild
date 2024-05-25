// import React, { useEffect, useState } from 'react';
// import { useAddress } from '@thirdweb-dev/react';

// const ConnectWallet2 = () => {
//     const address = useAddress();
//     const [isLoggedIn, setIsLoggedIn] = useState(false)
// //   const { connectWallet, wallet } = useWeb3();
// //   const [address, setAddress] = useState(null);

// //   const connect = async () => {
// //     try {
// //       const connectionOptions = {
// //         provider: 'metamask', // Wallet provider you want to connect to
// //         chainId: 1                // The chain you want to connect to
// //       };
      
// //       const address = await connectWallet(connectionOptions);
// //       setAddress(address);
// //     } catch (error) {
// //       console.error('Failed to connect wallet', error);
// //     }
// //   };

//   useEffect(()=>{
//     if(address){
//         setIsLoggedIn(true)
//     }
//     console.log('logged in address : ',address)
//   },[address])

//   return (
//     <div>
//       {/* <button onClick={connect}>Connect Wallet</button> */}
//       {isLoggedIn ?  <p>Connected Address: {address}</p>: 'Not logged in'}
//     </div>
//   );
// };

// export default ConnectWallet2;
