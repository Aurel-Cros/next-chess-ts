export default function deepEqual(a: any, b: any): boolean {
    if (a === b) {
        return true;
    }

    if (Array.isArray(a) && Array.isArray(b)) {
        const commonItems = a.filter(i => {
            const r = b.find((j) => deepEqual(j, i));
            return r ?? false;
        });

        if (commonItems.length === a.length && commonItems.length === b.length)
            return true;
    }

    if (typeof a === "object" && typeof b === "object") {
        if (Object.keys(a).length !== Object.keys(b).length)
            return false;

        let isValid = true;
        Object.keys(a).forEach((key) => {
            if (!isValid) return;
            if (!Object.keys(b).find(i => i === key)) {
                isValid = false;
                return;
            }
            isValid = deepEqual(a[key], b[key]);
        });

        return isValid;
    }

    return false;
};