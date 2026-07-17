import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$components: 'src/components',
			'$components/*': 'src/components/*',
			'$components/ui/*': 'src/components/ui/*',
			$lib: 'src/lib',
			'$lib/*': 'src/lib/*',
			$utils: 'src/lib/utils',
			'$utils/*': 'src/lib/utils/*',
			$hooks: 'src/hooks',
			'$hooks/*': 'src/hooks/*'
		}
	}
};

export default config;
