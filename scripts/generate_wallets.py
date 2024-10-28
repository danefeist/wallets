from solathon import Client, Keypair
import json
import random
import time

FOLDERS = ['Personal', 'Business', 'Trading', 'DeFi', 'Gaming']
NUM_WALLETS = 25  # Adjust this number as needed
AIRDROP_AMOUNT = 1000000  # 0.001 SOL in lamports

def generate_wallets():
    client = Client("https://api.devnet.solana.com")
    wallets = []
    
    print(f"Generating {NUM_WALLETS} Solana wallets...")
    
    for i in range(NUM_WALLETS):
        # Create new wallet using Solathon
        keypair = Keypair()
        
        try:
            # Request airdrop for testing (devnet only)
            client.request_airdrop(keypair.public_key, AIRDROP_AMOUNT)
            # Wait briefly to allow airdrop to process
            time.sleep(1)
            
            # Get actual balance
            balance = client.get_balance(keypair.public_key)
            
            wallet = {
                "publicKey": str(keypair.public_key),
                "privateKey": keypair.private_key.hex(),
                "balance": balance / 1e9,  # Convert lamports to SOL
                "folder": random.choice(FOLDERS)
            }
            
            wallets.append(wallet)
            print(f"Created wallet {i+1}/{NUM_WALLETS}: {wallet['publicKey'][:16]}...")
            
        except Exception as e:
            print(f"Error processing wallet {i+1}: {str(e)}")
            continue
    
    # Save wallets to JSON file
    with open('src/data/wallets.json', 'w') as f:
        json.dump(wallets, f, indent=2)
    
    print(f"\nSuccessfully generated {len(wallets)} wallets!")
    print("Wallets saved to src/data/wallets.json")

if __name__ == "__main__":
    generate_wallets()