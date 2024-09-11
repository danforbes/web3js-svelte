import { type Readable, readonly, writable } from 'svelte/store';

import { type SupportedProviders, Web3 } from 'web3';

class Web3Store {
	private _web3: Web3;
	constructor() {
		if (!window.ethereum) {
			throw new Error('No injected providers.');
		}

		this._web3 = new Web3(window.ethereum);
	}

	public blockNumber(): Readable<bigint> {
		const blockNumber = writable(0n);
		this._web3.eth.subscribe('newBlockHeaders').then((subscription) => {
			subscription.on('data', (data) => {
				blockNumber.set(this._web3.utils.toBigInt(data.number));
			});
		});
		return readonly(blockNumber);
	}
}

export const web3 = new Web3Store();

declare global {
	interface Window {
		ethereum: SupportedProviders;
	}
}
