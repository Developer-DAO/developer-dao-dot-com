import "./App.css";
import React, { useCallback, useState } from "react";
import { getDefaultProvider, Contract } from "ethers";
import { NftProvider, useNft } from "use-nft";

function App() {
  const [developerId, setDeveloperId] = useState(1);

  const ethersConfig = {
    ethers: { Contract },
    provider: getDefaultProvider("homestead"),
  };

  const updateDeveloperId = useCallback((e) => {
    if (e <= 8000) {
      setDeveloperId(e);
    }
  }, []);

  return (
    <div className="App-header">
      <h1>Search developer DAO id</h1>
      <input
        type="text"
        id="header-search"
        placeholder="Search developer id"
        value={developerId}
        onChange={(e) => updateDeveloperId(e.target.value)}
      />
      <NftProvider fetcher={["ethers", ethersConfig]}>
        <Nft developerId={developerId} />
      </NftProvider>
    </div>
  );
}

function Nft(developerId) {
  const { loading, error, nft } = useNft(
    "0x25ed58c027921E14D86380eA2646E3a1B5C55A8b",
    developerId.developerId
  );

  if (loading) return <>Loading…</>;

  if (error || !nft) return <>Error.</>;

  return (
    <section>
      <h1>{nft.name}</h1>
      <img src={nft.image} alt="" className="devImg" />
      <p>Owner: {nft.owner}</p>
    </section>
  );
}

export default App;
