import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'

const Navbar = () => {
    const context = useContext(ShoppingCartContext)
    const navigate = useNavigate()

    const navLinkClass = ({ isActive }) =>
        `rounded-full px-3 py-2 text-sm font-medium transition-all ${
            isActive
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-white/80 hover:text-slate-900'
        }`

    const handleSignOut = (e) => {
        e.preventDefault()
        context.handleSignOut()
        navigate('/sign-in')
    }

    return (
        <nav className='fixed top-0 z-30 w-full border-b border-slate-200/80 bg-[#f8f5f0]/85 backdrop-blur-xl'>
            <div className='mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-6'>
                <div className='flex items-center gap-4'>
                    <NavLink to='/' className='flex items-center gap-3'>
                        <span className='flex h-9 w-9 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#111827,#ffb703)] text-sm font-black text-white rotate-[-6deg] shadow-md'>E</span>
                        <span className='text-xl font-black tracking-[-0.06em] text-slate-900'>EStore</span>
                    </NavLink>

                    <ul className='hidden items-center gap-2 md:flex'>
                        <li>
                            <NavLink
                                to='/'
                                onClick={() => { context.setSearchByCategory(null); context.setSearchByTitle(null) }}
                                className={navLinkClass}>
                                All
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/clothes'
                                onClick={() => { context.setSearchByCategory('clothes'); context.setSearchByTitle(null) }}
                                className={navLinkClass}>
                                Clothes
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/electronics'
                                onClick={() => { context.setSearchByCategory('electronics'); context.setSearchByTitle(null) }}
                                className={navLinkClass}>
                                Electronics
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/furnitures'
                                onClick={() => { context.setSearchByCategory('furniture'); context.setSearchByTitle(null) }}
                                className={navLinkClass}>
                                Furnitures
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/toys'
                                onClick={() => { context.setSearchByCategory('toys'); context.setSearchByTitle(null) }}
                                className={navLinkClass}>
                                Toys
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/others'
                                onClick={() => { context.setSearchByCategory('others'); context.setSearchByTitle(null) }}
                                className={navLinkClass}>
                                Others
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className='ml-auto flex items-center gap-3'>
                    {context.isUserAuthenticated ? (
                        <>
                            <span className='hidden text-xs font-medium uppercase tracking-[0.18em] text-slate-500 md:block'>
                                {context.account?.email}
                            </span>
                            <NavLink to='/my-orders' className={navLinkClass}>My Orders</NavLink>
                            <NavLink to='/my-account' className={navLinkClass}>My Account</NavLink>
                            <button
                                onClick={handleSignOut}
                                className='hidden rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900 md:block'>
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <NavLink
                            to='/sign-in'
                            className={({ isActive }) =>
                                `rounded-full px-4 py-2 text-sm font-semibold transition ${
                                    isActive
                                        ? 'bg-slate-900 text-white'
                                        : 'bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-100'
                                }`
                            }>
                            Sign In
                        </NavLink>
                    )}

                    <button
                        className='relative flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
                        onClick={() => context.openCheckoutSideMenu()}>
                        <ShoppingCartIcon className='h-5 w-5 text-slate-800' />
                        <span className='flex h-5 min-w-5 items-center justify-center rounded-full bg-[linear-gradient(135deg,#111827,#ffb703)] px-1 text-[10px] font-bold text-white'>
                            {context.cartProducts.length}
                        </span>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar