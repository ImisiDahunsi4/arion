import { ShadowWireClient, initWASM, isWASMSupported } from '@radr/shadowwire';

export class ArionShadowService {
    public client: ShadowWireClient;
    private wasmInitialized: boolean = false;

    constructor() {
        this.client = new ShadowWireClient({
            apiBaseUrl: process.env.NEXT_PUBLIC_SHADOW_API || 'https://api.devnet.shadowwire.io',
            debug: true
        });
    }

    async initialize() {
        if (this.wasmInitialized) return;

        if (isWASMSupported()) {
            try {
                // Point to the file we copied to public/wasm/
                await initWASM('/wasm/settler_wasm_bg.wasm');
                this.wasmInitialized = true;
                console.log('ShadowWire WASM Initialized');
            } catch (err) {
                console.error('Failed to init ShadowWire WASM:', err);
                // Fallback to server-side proving if WASM fails? 
                // For now, we just log error.
            }
        } else {
            console.warn('WASM not supported');
        }
    }

    async getBalance(wallet: string, token: string = 'USD1') {
        try {
            return await this.client.getBalance(wallet, token);
        } catch (e) {
            console.error('Error fetching ShadowWire balance', e);
            return 0;
        }
    }
}

export const shadowService = new ArionShadowService();
