import { getDefaultProvider } from '@ethersproject/providers';
import { useEffect, useState } from 'react';
import { providers } from 'ethers';
import ENS from '@ensdomains/ensjs';
const NOM_REGISTRY_ADDRESS = '0x3DE51c3960400A0F752d3492652Ae4A0b2A36FB3';

export function useENS(address) {
  const [ensName, setENSName] = useState();
  const provider = new providers.JsonRpcProvider('https://forno.celo.org');
  const [nom, setNom] = useState();

  useEffect(() => {
    async function resolveENS() {
      if (address) {
        const provider = await getDefaultProvider();
        const name = await provider.lookupAddress(address);
        if (name) setENSName(name);
      }
    }
    resolveENS();
  }, [address]);

  useEffect(() => {
    (async () => {
      const nom = new ENS({ provider, ensAddress: NOM_REGISTRY_ADDRESS });
      try {
        const { name } = await nom.getName(address);
        if (name) setNom(`${name}.nom`);
      } catch (e) {
        console.error('Could not fetch nom data', e);
      }
    })();
  }, [address, provider]);

  return { ensName, nom };
}
