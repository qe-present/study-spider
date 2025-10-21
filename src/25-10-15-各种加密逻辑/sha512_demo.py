import hashlib

def sha512_hash(text: str) -> str:
    """返回字符串的 sha512 哈希值（十六进制）"""
    sha = hashlib.sha512()
    sha.update(text.encode('utf-8'))
    return sha.hexdigest()

if __name__ == "__main__":
    sample = "hello world"
    print(f"原文: {sample}")
    print(f"SHA512: {sha512_hash(sample)}")

