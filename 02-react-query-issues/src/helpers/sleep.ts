

export const sleep = (s: number = 1):Promise<boolean> =>{

    return new Promise((resolve) =>
        setTimeout(() => {
            resolve(true)},
             s * 1000
        )
    );
}; 