import { createContext, useState, useEffect, useMemo } from 'react'

export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({children}) => {
    const [count, setCount] = useState(0)
    const [cartProducts, setCartProducts] = useState([])
    const [order, setOrder] = useState([])

    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
    const [productToShow, setProductToShow] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const [items, setItems] = useState(null)
    const [filteredItems, setFilteredItems] = useState(null)
    const [searchByTitle, setSearchByTitle] = useState(null)
    const [searchByCategory, setSearchByCategory] = useState(null)

    const [account, setAccount] = useState(null)
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)

    const openProductDetail = () => setIsProductDetailOpen(true)
    const closeProductDetail = () => setIsProductDetailOpen(false)
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

    useEffect(() => {
        const loadUserSession = () => {
            const savedAccount = localStorage.getItem('account')
            const savedIsAuth = localStorage.getItem('isUserAuthenticated')
            const savedOrder = localStorage.getItem('order')
            
            if (savedAccount && savedIsAuth === 'true') {
                setAccount(JSON.parse(savedAccount))
                setIsUserAuthenticated(true)
            }
            
            if (savedOrder) {
                setOrder(JSON.parse(savedOrder))
            }

            setIsLoading(false)
        }

        loadUserSession()
    }, [])

    useEffect(() => {
        if (order.length > 0) {
            localStorage.setItem('order', JSON.stringify(order))
        }
    }, [order])

    const handleSignIn = (email, password) => {
        const savedAccount = localStorage.getItem('account')
        if (savedAccount) {
            const acc = JSON.parse(savedAccount)
            if (acc.email === email && acc.password === password) {
                setAccount(acc)
                setIsUserAuthenticated(true)
                localStorage.setItem('isUserAuthenticated', 'true')

                const pendingCart = localStorage.getItem('pendingCart')
                if (pendingCart) {
                    setCartProducts(JSON.parse(pendingCart))
                    localStorage.removeItem('pendingCart')
                }
                
                return true
            }
        }
        return false
    }

    const handleSignUp = (email, password, name) => {
        const newAccount = { email, password, name }
        setAccount(newAccount)
        setIsUserAuthenticated(true)
        localStorage.setItem('account', JSON.stringify(newAccount))
        localStorage.setItem('isUserAuthenticated', 'true')
    }

    const handleSignOut = () => {
        setIsUserAuthenticated(false)
        setAccount(null)
        
        
        setCartProducts([])
        setCount(0)
        
        
        localStorage.setItem('isUserAuthenticated', 'false')
        localStorage.removeItem('pendingCart')
        
        closeProductDetail()
        closeCheckoutSideMenu()
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://api.escuelajs.co/api/v1/products')
                const data = await response.json()
                setItems(data)
            } catch (error) {
                console.error('Error fetching products:', error)
                setItems([])
            }
        }

        fetchProducts()
    }, [])

    
    const filteredItemsByTitle = useMemo(() => {
        if (!searchByTitle || !items) return items
        return items.filter(item => 
            item.title.toLowerCase().includes(searchByTitle.toLowerCase())
        )
    }, [items, searchByTitle])

    const filteredItemsByCategory = useMemo(() => {
        if (!searchByCategory) return filteredItemsByTitle
        if (!filteredItemsByTitle) return null
        return filteredItemsByTitle.filter(item =>
            item.category.name.toLowerCase().includes(searchByCategory.toLowerCase())
        )
    }, [filteredItemsByTitle, searchByCategory])

    
    useEffect(() => {
        setFilteredItems(filteredItemsByCategory)
    }, [filteredItemsByCategory])

    // Cart methods
    const addToCart = (product) => {
        setCartProducts(prev => [...prev, product])
        setCount(prev => prev + 1)
        openCheckoutSideMenu()
    }

    const removeFromCart = (id) => {
        setCartProducts(prev => prev.filter(product => product.id !== id))
        setCount(prev => prev - 1)
    }

    const contextValue = {
        count,
        setCount,
        cartProducts,
        setCartProducts,
        addToCart,
        removeFromCart,
        order,
        setOrder,

        isProductDetailOpen,
        openProductDetail,
        closeProductDetail,
        isCheckoutSideMenuOpen,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        productToShow,
        setProductToShow,
        isLoading,

        items,
        filteredItems,
        searchByTitle,
        setSearchByTitle,
        searchByCategory,
        setSearchByCategory,

        account,
        isUserAuthenticated,
        handleSignIn,
        handleSignUp,
        handleSignOut
    }

    return (
        <ShoppingCartContext.Provider value={contextValue}>
            {children}
        </ShoppingCartContext.Provider>
    )
}