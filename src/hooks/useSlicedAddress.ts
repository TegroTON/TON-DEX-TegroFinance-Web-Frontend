import { useMemo } from 'react';
import { Address } from 'ton3-core';

export function useSlicedAddress(address: string | null | undefined) {
    return useMemo(() => {
        if (!address) {
            return '';
        }

        // use any library to convert address from 0:<hex> format to user-friendly format
        const userFriendlyAddress = new Address(address).toString('base64', { bounceable: true });

        return `${userFriendlyAddress.slice(0, 4)}...${userFriendlyAddress.slice(-3)}`;
    }, [address]);
}
