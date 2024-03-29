export interface SignUp{
    name:string,
    email:string,
    password: string
}

export interface Login{
    email:string,
    password: string
}

export interface Product{
    id?:string,
    name:string,
    price:number,
    category:string,
    color:string,
    image:string,
    description:string,
    quantity: undefined| number,
    productId: undefined | string
}

export interface Cart{
    id?:string | undefined,
    name:string,
    price:number,
    category:string,
    color:string,
    image:string,
    description:string,
    quantity: undefined| number
    productId?: string,
    userId:string
}
