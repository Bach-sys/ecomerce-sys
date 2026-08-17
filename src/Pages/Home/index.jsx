import { useContext } from 'react'
import Layout from '../../Components/Layout'
import Card from '../../Components/Card'
import ProductDetail from '../../Components/ProductDetail'
import { ShoppingCartContext } from '../../Context'

const CardSkeleton = () => (
  <div className="h-72 w-full animate-pulse rounded-[24px] border border-slate-200 bg-white/70 p-3 shadow-sm">
    <div className="mb-3 h-48 w-full rounded-[18px] bg-slate-200"></div>
    <div className="flex items-center justify-between gap-3">
      <div className="h-4 w-2/3 rounded-full bg-slate-200"></div>
      <div className="h-4 w-1/4 rounded-full bg-slate-200"></div>
    </div>
  </div>
)

function Home() {
  const context = useContext(ShoppingCartContext)

  const renderView = () => {
    if (!context.items) {
      return Array.from({ length: 8 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))
    }

    if (context.filteredItems?.length > 0) {
      return context.filteredItems?.map(item => (
        <Card key={item.id} data={item} />
      ))
    }

    return (
      <div className="col-span-full rounded-[24px] border border-dashed border-slate-300 bg-white/50 py-10 text-center text-slate-500">
        No products found matching your search
      </div>
    )
  }

  return (
    <Layout>
      <div className='mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
        <div>
          <span className='mb-3 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700'>Fresh picks</span>
          <h1 className='section-title'>Shop the weirdly good stuff.</h1>
        </div>
        {/* <div className='flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-600 shadow-sm'>
          <span className='inline-block h-2.5 w-2.5 rounded-full bg-emerald-400'></span>
          New drops this week
        </div> */}
      </div>

      <div className='mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
        <div className='relative w-full max-w-md'>
          <input
            type='text'
            placeholder='Search a product'
            value={context.searchByTitle ?? ''}
            className='w-full rounded-full border border-slate-200 bg-white/80 px-5 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-amber-200'
            onChange={(event) => context.setSearchByTitle(event.target.value)}
          />
        </div>
        <div className='inline-flex items-center rounded-full border border-dashed border-slate-300 bg-[#fff8df] px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700'>
          curated living
        </div>
      </div>

      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {renderView()}
      </div>

      <ProductDetail />
    </Layout>
  )
}

export default Home