import {BOC, Slice} from "ton3-core";

const dc = BOC.from("te6cckEBAQEAQAAAfHNi0JwAAAHemAeQR0O5rKAIAclGd+pMG1Sl7aYVF/fNJ2tEqI5itAPUBTcoOl4wECV2AAABwgAAFdKg+Z7/8t9aFg==")[0]

const ds = Slice.parse(dc)

ds.skip(32 + 64)
ds.loadCoins()
ds.loadAddress()
ds.skip(1)
const x = ds.loadUint(32)

console.log(x) // error code
