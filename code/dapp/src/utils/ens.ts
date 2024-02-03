import { http } from 'viem'
import { mainnet } from 'viem/chains'
import { createEnsPublicClient } from '@ensdomains/ensjs'

// Create the client
export const client = createEnsPublicClient({
    chain: mainnet,
    transport: http(),
})

export async function getEnsName(address: `0x${string}`[])
{
    const promise = address.map( async (addr) => {
        const res = await client.getName({address: addr})
        if (res !== null)
            return {name: res.name, address: addr}
        return {name : undefined, address: addr}
    });
    const resolve = await Promise.all(promise)
    if (resolve.length > 0)
    {
        const res = Object.fromEntries(resolve.map((value) => [value.address, value.name]))
        return res
    }
    return {}
}