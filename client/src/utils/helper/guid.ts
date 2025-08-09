export function generateGuid(): string {

    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return (
        s4() + s4() + "-" +
        s4() + "-" +
        "4" + s4().substring(0, 3) + "-" + // "4" ensures this is a version 4 UUID
        ((8 + Math.floor(Math.random() * 4)).toString(16)) + s4().substr(0, 3) + "-" +
        s4() + s4() + s4()
    );
}

export function generateGuidV2(): string {

  return crypto.randomUUID();
}