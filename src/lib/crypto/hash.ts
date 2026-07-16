export type HashAlgorithm = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';

const encoder = new TextEncoder();

export const SUPPORTED_ALGORITHMS: HashAlgorithm[] = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];

const webCryptoMap: Record<HashAlgorithm, string> = {
	'SHA-1': 'SHA-1',
	'SHA-256': 'SHA-256',
	'SHA-384': 'SHA-384',
	'SHA-512': 'SHA-512'
};

export function bytesToHex(bytes: ArrayBuffer): string {
	return Array.from(new Uint8Array(bytes), (value) => value.toString(16).padStart(2, '0')).join('');
}

export async function generateHash(text: string, algorithm: HashAlgorithm): Promise<string> {
	const data = encoder.encode(text);
	const digest = await crypto.subtle.digest(webCryptoMap[algorithm], data);
	return bytesToHex(digest);
}

export async function copyToClipboard(text: string): Promise<void> {
	if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
		throw new Error('Clipboard API is not available in this browser.');
	}

	await navigator.clipboard.writeText(text);
}

export function countCharacters(text: string): number {
	return Array.from(text).length;
}
