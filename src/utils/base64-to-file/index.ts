export const base64toFile = (base64: string, filename: string): File => {
    const arr = base64.split(','),
        mime = arr?.[0].match(/:(.*?);/)?.[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    for (let i = 0; i < n; i++) {
        u8arr[i] = bstr.charCodeAt(i);
    }

    return new File([u8arr], filename, { type: mime });
};