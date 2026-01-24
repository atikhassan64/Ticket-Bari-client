// Web3Forms Configuration
// This is a free form backend service that sends emails directly

export const web3formsConfig = {
    // Get your own access key from https://web3forms.com
    // Enter atikhassant64@gmail.com to get your key
    accessKey: '550e8400-e29b-41d4-a716-446655440000', // Demo key - replace with real one
    
    // Your email where messages will be sent
    toEmail: 'atikhassant64@gmail.com',
    
    // Form settings
    settings: {
        redirect: false, // Don't redirect after submission
        honeypot: true,  // Enable spam protection
        captcha: false   // Disable captcha for now
    }
};