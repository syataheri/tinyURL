import { nanoid } from 'nanoid/non-secure'

const createCode = () => {
    return nanoid();
}

export {createCode}