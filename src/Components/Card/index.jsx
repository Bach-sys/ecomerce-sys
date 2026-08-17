import { useContext } from 'react'
import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'

const Card = (data) => {
    const context = useContext(ShoppingCartContext)

    const showProduct = (productDetail) => {
        context.openProductDetail()
        context.setProductToShow(productDetail)
    }

    const addProductsToCart = (event, productData) => {
        event.stopPropagation()
        context.setCount(context.count + 1)
        context.setCartProducts([...context.cartProducts, productData])
        context.closeProductDetail()
    }

    const renderIcon = (id) => {
        const isInCart = context.cartProducts.filter(product => product.id === id).length > 0

        if (isInCart) {
            return (
                <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 shadow-lg">
                    <CheckIcon className='h-5 w-5 text-white' />
                </div>
            )
        }

        return (
            <div
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white/90 shadow-sm transition hover:scale-105 hover:bg-amber-50"
                onClick={(event) => addProductsToCart(event, data.data)}>
                <PlusIcon className='h-5 w-5 text-slate-900' />
            </div>
        )
    }

    return (
        <div
            className="group mx-auto w-full max-w-[280px] cursor-pointer overflow-hidden rounded-[26px] border border-slate-200/80 bg-white/80 p-2 shadow-[0_15px_35px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_50px_rgba(15,23,42,0.1)]"
            onClick={() => showProduct(data.data)}>
            <figure className="relative mb-3 overflow-hidden rounded-[20px]">
                <span className="absolute left-3 top-3 z-10 rounded-full border border-amber-200 bg-[#fff7d6] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-700 rotate-[-5deg]">
                    {data.data.category.name}
                </span>
                <img
                    className="h-56 w-full rounded-[20px] object-cover transition duration-500 group-hover:scale-105"
                    src={data.data.images[0]}
                    alt={data.data.title}
                />
                {renderIcon(data.data.id)}
            </figure>
            <div className="flex items-center justify-between gap-3 px-1 pb-1">
                <span className="truncate text-sm font-medium text-slate-700">{data.data.title}</span>
                <span className="text-base font-black tracking-[-0.05em] text-slate-900">${data.data.price}</span>
            </div>
        </div>
    )
}

export default Card












