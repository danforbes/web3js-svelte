<script lang="ts">
	import { web3 } from '../stores/web3';

	let blockNumber = 0n;
	web3.blockNumber().subscribe((value) => {
		blockNumber = value;
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
Current block number: {blockNumber}
