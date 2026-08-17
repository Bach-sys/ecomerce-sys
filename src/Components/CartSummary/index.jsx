import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'
import OrderCard from '../OrderCard'
import { totalPrice } from '../../utils'
import Layout from '../Layout'

const CartSummary = () => {
  const context = useContext(ShoppingCartContext)
  const navigate = useNavigate()

  const handleCheckout = () => {
    const orderToAdd = {
      date: new Date().toLocaleDateString(),
      products: context.cartProducts,
      totalProducts: context.cartProducts.length,
      totalPrice: totalPrice(context.cartProducts)
    }
    
    context.setOrder([...context.order, orderToAdd])
    context.setCartProducts([])
    context.setSearchByTitle(null)
    navigate('/my-orders/last')
  }

  return (
    <Layout>
      <div className='relative mx-auto mb-6 flex w-full max-w-md items-center justify-center'>
        <button
          className='absolute left-0 rounded-full p-2 hover:bg-slate-100'
          onClick={() => navigate(-1)}>
          <ChevronLeftIcon className='h-5 w-5 text-slate-800'/>
        </button>
        <h1 className='text-xl font-semibold text-slate-900'>Cart Summary</h1>
      </div>

      <div className='mx-auto flex w-full max-w-md flex-col'>
        {context.cartProducts.map(product => (
          <OrderCard
            key={product.id}
            id={product.id}
            title={product.title}
            imageUrl={product.images}
            price={product.price}
          />
        ))}

        <div className='mt-4 rounded-[22px] border border-slate-200 bg-white/80 p-5'>
          <p className='mb-4 flex items-center justify-between'>
            <span className='text-slate-500'>Total:</span>
            <span className='text-2xl font-bold text-slate-900'>${totalPrice(context.cartProducts)}</span>
          </p>
          {context.isUserAuthenticated ? (
            <button
              className='w-full rounded-full bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-700'
              onClick={handleCheckout}>
              Checkout
            </button>
          ) : (
            <div className='space-y-2'>
              <button
                className='w-full rounded-full bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-700'
                onClick={() => navigate('/sign-in')}>
                Sign In
              </button>
              <button
                className='w-full rounded-full border border-slate-300 bg-white py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100'
                onClick={() => navigate('/sign-up')}>
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default CartSummary