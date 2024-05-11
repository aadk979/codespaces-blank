import secrets
import hashlib

def generate_secure_key(length):
    return secrets.token_hex(length // 2)  # Generating a hex string of specified length

def save_key_to_file(filename, key):
    with open(filename, 'w') as file:
        file.write(key)

# Generate the security key
security_key = generate_secure_key(50000)
save_key_to_file("/workspaces/codespaces-blank/src/main/security_key.txt", security_key)

# Generate the refresh key
refresh_key = generate_secure_key(50000)
save_key_to_file("/workspaces/codespaces-blank/src/main/refresh_key.txt", refresh_key)

print("Keys generated and saved successfully.")
