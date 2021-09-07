export const sha256 = async (data: string): Promise<string> => {
    const byteArray = new TextEncoder().encode(data);
    const hashAsByteArray = await crypto.subtle.digest('SHA-256', byteArray);
    const hashAsArrayOfNumber = Array.from(new Uint8Array(hashAsByteArray));

    return hashAsArrayOfNumber.map(b => ('00'+ b.toString(16)).slice(-2)).join('');
}

export const uuid = (): string => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }