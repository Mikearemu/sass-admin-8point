import { useState, useMemo, useEffect, useRef } from "react";
import {
  Search, Plus, Minus, Trash2, X, Maximize, Pause, Users, DollarSign,
  CreditCard, Banknote, Edit, Archive, Keyboard, HelpCircle,
  Percent, Tag, Settings, LayoutGrid, List, Package, Image as ImageIcon
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// --- TYPE DEFINITIONS ---
interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  upc: string;
  imageUrl?: string; // Optional image URL
}

interface Customer {
  id: string;
  name: string;
}

type Discount = {
  type: "percentage" | "fixed";
  value: number;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  originalPrice: number;
  upc: string;
  discount: Discount | null;
}

interface HeldOrder {
  id: string;
  items: CartItem[];
  timestamp: Date;
  customerName: string;
  total: number;
}

interface ViewSettings {
    showImage: boolean;
    viewMode: 'grid' | 'list';
    showUPC: boolean;
}

// --- MOCK DATA ---
const cashierName = "Jane Doe";

const initialProducts: Product[] = [
  { id: "1", name: "Espresso", price: 1500, stock: 100, category: "Hot Coffee", upc: "123456789011", imageUrl: "/placeholder.svg" },
  { id: "2", name: "Latte", price: 2200, stock: 80, category: "Hot Coffee", upc: "123456789012", imageUrl: "/placeholder.svg" },
  { id: "3", name: "Cappuccino", price: 2200, stock: 90, category: "Hot Coffee", upc: "123456789013", imageUrl: "/placeholder.svg" },
  { id: "4", name: "Iced Coffee", price: 2000, stock: 100, category: "Cold Drinks", upc: "123456789014", imageUrl: "/placeholder.svg" },
  { id: "5", name: "Iced Tea", price: 1800, stock: 75, category: "Cold Drinks", upc: "123456789015",imageUrl: "/placeholder.svg" },
  { id: "6", name: "Smoothie", price: 3000, stock: 40, category: "Cold Drinks", upc: "123456789016", imageUrl: "/placeholder.svg" },
  { id: "7", name: "Croissant", price: 1200, stock: 50, category: "Pastries", upc: "123456789017", imageUrl: "/placeholder.svg" },
  { id: "8", name: "Muffin", price: 1500, stock: 60, category: "Pastries", upc: "123456789018",imageUrl: "/placeholder.svg" },
  { id: "9", name: "Bagel", price: 1700, stock: 45, category: "Food", upc: "123456789019" ,imageUrl: "/placeholder.svg"},
  { id: "10", name: "Chicken Sandwich", price: 4500, stock: 30, category: "Food", upc: "123456789020", imageUrl: "/placeholder.svg" },
  { id: "11", name: "Salad", price: 5000, stock: 25, category: "Food", upc: "123456789021",imageUrl: "/placeholder.svg" },
  { id: "12", name: "Bottled Water", price: 500, stock: 150, category: "Extras", upc: "123456789022",imageUrl: "/placeholder.svg" },
];

const initialCustomers: Customer[] = [
    { id: "walk-in", name: "Walk-in Customer" },
    { id: "1", name: "Ade Williams" },
    { id: "2", name: "Chioma Nwosu" },
    { id: "3", name: "Tunde Johnson" },
]

// --- HELPER FUNCTION ---
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
}

const POSPage = () => {
  // --- STATE MANAGEMENT ---
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [heldOrders, setHeldOrders] = useState<HeldOrder[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCustomerId, setSelectedCustomerId] = useState("walk-in");
  
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isHoldOpen, setIsHoldOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(true);
  
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [amountTendered, setAmountTendered] = useState(0);

  // --- New states for settings and modals ---
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [viewSettings, setViewSettings] = useState<ViewSettings>({
      showImage: true,
      viewMode: 'grid',
      showUPC: false,
  });

  // --- Discount States ---
  const [cartDiscount, setCartDiscount] = useState<Discount>({ type: "fixed", value: 0 });
  const [isCartDiscountOpen, setIsCartDiscountOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CartItem | null>(null);
  const [itemEditPrice, setItemEditPrice] = useState(0);
  const [itemEditDiscount, setItemEditDiscount] = useState<Discount>({ type: "fixed", value: 0 });

  const { toast } = useToast();
  const searchRef = useRef<HTMLInputElement>(null);

  // --- DERIVED STATE & CALCULATIONS ---

  const getItemTotal = (item: CartItem) => {
    let finalPrice = item.price;
    if (item.discount) {
        if (item.discount.type === 'fixed') {
            finalPrice = Math.max(0, item.price - item.discount.value);
        } else { // percentage
            finalPrice = item.price * (1 - item.discount.value / 100);
        }
    }
    return finalPrice * item.quantity;
  }

  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + getItemTotal(item), 0);
  }, [cart]);

  const cartTax = useMemo(() => cartSubtotal * 0.075, [cartSubtotal]); // 7.5% VAT

  const cartDiscountValue = useMemo(() => {
    if (cartDiscount.type === 'fixed') {
        return cartDiscount.value;
    }
    return cartSubtotal * (cartDiscount.value / 100);
  }, [cartDiscount, cartSubtotal]);

  const cartTotal = useMemo(() => {
    return cartSubtotal + cartTax - cartDiscountValue;
  }, [cartSubtotal, cartTax, cartDiscountValue]);

  const changeDue = useMemo(() => (amountTendered > cartTotal ? amountTendered - cartTotal : 0), [amountTendered, cartTotal]);

  const categories = useMemo(() => ["All", ...new Set(products.map((p) => p.category))], [products]);

  const filteredProducts = useMemo(() => products.filter((product) => {
    const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
    const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.upc.includes(searchTerm);
    return categoryMatch && searchMatch;
  }), [products, selectedCategory, searchTerm]);

  const selectedCustomerName = customers.find(c => c.id === selectedCustomerId)?.name || "Walk-in Customer";

  // --- CORE FUNCTIONS ---
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id && item.discount === null && item.price === product.price);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1, originalPrice: product.price, discount: null }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
  
  const handleScanOrSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.length > 0) {
        const productByUpc = products.find(p => p.upc === searchTerm);
        if (productByUpc) {
            addToCart(productByUpc);
            setSearchTerm("");
            toast({ title: "Item Added", description: `${productByUpc.name} added to cart.` });
        } else {
            toast({ title: "Search Filtered", description: "Showing results for your search." });
        }
    }
  }

  const handleUpdateItem = () => {
    if (!editingItem) return;
    setCart(cart.map(item => 
        item.id === editingItem.id 
        ? { ...item, price: itemEditPrice, discount: itemEditDiscount.value > 0 ? itemEditDiscount : null } 
        : item
    ));
    toast({ title: "Item Updated", description: `${editingItem.name} has been updated.` });
    setEditingItem(null);
  }

  const clearCart = () => {
    setCart([]);
    setCartDiscount({ type: "fixed", value: 0 });
    setAmountTendered(0);
  };

  const holdOrder = () => {
    if (cart.length === 0) {
        toast({ title: "Cart is empty", description: "Add items before holding an order.", variant: "destructive"});
        return;
    }
    const newHeldOrder: HeldOrder = {
      id: `H-${Date.now()}`,
      items: cart,
      timestamp: new Date(),
      customerName: selectedCustomerName,
      total: cartTotal,
    };
    setHeldOrders((prev) => [...prev, newHeldOrder]);
    clearCart();
    setIsHoldOpen(false);
    toast({ title: "Order Held", description: `Order ${newHeldOrder.id} (${selectedCustomerName}) has been suspended.` });
  };

  const resumeOrder = (orderId: string) => {
    const orderToResume = heldOrders.find(order => order.id === orderId);
    if (orderToResume) {
        setCart(orderToResume.items);
        const customer = customers.find(c => c.name === orderToResume.customerName);
        setSelectedCustomerId(customer ? customer.id : "walk-in");
        setHeldOrders(prev => prev.filter(order => order.id !== orderId));
        toast({ title: "Order Resumed", description: `Order ${orderId} is now active.` });
    }
  }
  
  const handleAddCustomer = (name: string) => {
    if (!name) return;
    const newCustomer: Customer = { id: `C-${Date.now()}`, name };
    setCustomers(prev => [...prev, newCustomer]);
    setSelectedCustomerId(newCustomer.id);
    toast({ title: "Customer Added", description: `${name} has been added.` });
    setIsAddCustomerOpen(false);
  }

  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = { ...product, id: `P-${Date.now()}` };
    setProducts(prev => [newProduct, ...prev]);
    toast({ title: "Product Added", description: `${product.name} has been added.` });
    setIsAddProductOpen(false);
  }

  const processPayment = () => {
    if (paymentMethod === "Cash" && amountTendered < cartTotal) {
        toast({ title: "Payment Error", description: "Amount tendered is less than the total.", variant: "destructive"});
        return;
    }
    // In a real app, you would integrate with a payment gateway here.
    console.log({
        cart,
        total: cartTotal,
        paymentMethod,
        amountTendered: amountTendered,
        change: changeDue,
        customer: selectedCustomerName,
        cashier: cashierName,
    });

    toast({ title: "Payment Successful!", description: `Total: ${formatCurrency(cartTotal)}. Change: ${formatCurrency(changeDue)}` });
    clearCart();
    setIsPaymentOpen(false);
    setAmountTendered(0);
    setSelectedCustomerId("walk-in");
  };

  // --- FULL SCREEN HANDLER ---
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const toggleRegister = () => {
    setIsRegisterOpen(!isRegisterOpen);
    toast({
        title: `Register ${isRegisterOpen ? 'Closed' : 'Opened'}`,
        description: `The cash drawer is now ${isRegisterOpen ? 'secured' : 'accessible'}.`
    });
  }

  // --- USEEFFECT FOR KEYBOARD SHORTCUTS ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        // Stop if any dialog is open
        if (isPaymentOpen || isHoldOpen || isCartDiscountOpen || editingItem || isShortcutsOpen || isSettingsOpen || isAddCustomerOpen || isAddProductOpen) return;
        
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            searchRef.current?.focus();
        }
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            if(cart.length > 0) setIsPaymentOpen(true);
        }
        if (e.ctrlKey && e.key === 'h') {
            e.preventDefault();
            if(cart.length > 0) setIsHoldOpen(true);
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cart, isPaymentOpen, isHoldOpen, isCartDiscountOpen, editingItem, isShortcutsOpen, isSettingsOpen, isAddCustomerOpen, isAddProductOpen]);
  
  // --- USEEFFECT FOR FULLSCREEN CHANGE ---
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullScreenChange);
  }, []);

  return (
    <div className="flex h-screen bg-muted/30 p-2 -mt-6 rounded-[20px] gap-2">
      {/* --- LEFT PANEL: CART & ACTIONS --- */}
      <Card className="w-2/5 flex flex-col overflow-hidden">
        <CardHeader className="flex-row items-center bg-background/95 justify-between p-2">
            <div className="flex items-center gap-2 flex-1">
                <Select value={selectedCustomerId} onValueChange={setSelectedCustomerId}>
                    <SelectTrigger id="customer-select" className="w-full">
                        <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                        {customers.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Button variant="outline" size="icon" className="h-9 w-9 flex-shrink-0" onClick={() => setIsAddCustomerOpen(true)}>
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
            <div className="text-right p-2">
                <Badge variant={isRegisterOpen ? "default" : "destructive"}>
                    Register: {isRegisterOpen ? 'Open' : 'Closed'}
                </Badge>
                <p className="text-xs text-foreground mt-1">Cashier: {cashierName}</p>
            </div>
        </CardHeader>
        
        {/* --- SCROLLABLE CART ITEMS --- */}
        <div className="flex-grow bg-background/95 overflow-y-auto px-3">
            {cart.length === 0 ? (
                <div className="text-center text-muted-foreground h-full flex items-center justify-center">
                    <p>Scan an item or select from the right</p>
                </div>
            ) : (
                <div className="">
                    {[...cart].reverse().map((item) => {
                        const itemTotal = getItemTotal(item);
                        const priceHasChanged = item.price !== item.originalPrice || item.discount !== null;
                        return (
                            <div key={`${item.id}-${item.price}-${item.discount?.value}`} className="flex items-center gap-1 p-1 rounded-md hover:bg-muted/50">
                                <div className="flex-grow">
                                    <p className="font-medium text-sm leading-tight">{item.name}</p>
                                    <div className="flex items-center gap-1 text-sm">
                                        <span className={priceHasChanged ? 'line-through text-muted-foreground' : ''}>{formatCurrency(item.originalPrice)}</span>
                                        {priceHasChanged && <span className="font-bold">{formatCurrency(itemTotal / item.quantity)}</span>}
                                        <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => { 
                                            setEditingItem(item); 
                                            setItemEditPrice(item.price);
                                            setItemEditDiscount(item.discount || { type: 'fixed', value: 0 });
                                        }}>
                                            <Edit className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => updateQuantity(item.id, -1)}><Minus className="h-4 w-4"/></Button>
                                    <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                                    <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => updateQuantity(item.id, 1)}><Plus className="h-4 w-4"/></Button>
                                </div>
                                <span className="w-24 text-sm text-right font-semibold">{formatCurrency(itemTotal)}</span>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>

        {/* --- STICKY FOOTER --- */}
        <div className="mt-auto p-3 border-t bg-background/95">
            <div className="space-y-1 mb-3">
                <div className="flex justify-between text-sm"><span>Subtotal</span><span>{formatCurrency(cartSubtotal)}</span></div>
                <div className="flex justify-between text-sm"><span>Tax (7.5%)</span><span>{formatCurrency(cartTax)}</span></div>
                <div className="flex justify-between text-sm items-center">
                    <span>Discount</span>
                    <div className="flex items-center gap-2">
                        {cartDiscountValue > 0 && <span className="text-red-500">-{formatCurrency(cartDiscountValue)}</span>}
                        <Button variant="outline" className="h-6 px-2" onClick={() => setIsCartDiscountOpen(true)}>
                            <Tag className="h-3 w-3 mr-1"/> Apply Discount
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between font-bold text-lg pt-1"><span>Total</span><span>{formatCurrency(cartTotal)}</span></div>
            </div>
            <div className="grid grid-cols-2 gap-2">
               <Button variant="destructive" className="" onClick={clearCart}>
                    <X /> Cancel
               </Button>
               <Button className="" onClick={() => cart.length > 0 ? setIsPaymentOpen(true) : toast({ title: "Cart is empty" })}>
                    Make Payment
               </Button>
            </div>
        </div>
      </Card>

      {/* --- RIGHT PANEL: PRODUCTS & TABS --- */}
      <div className="w-3/5 flex flex-col p-3 rounded-[20px] bg-background/95 gap-2">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-grow">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input 
                    ref={searchRef}
                    placeholder="Scan Barcode or Search..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    onKeyDown={handleScanOrSearch}
                    className="w-full" />
            </div>
            <div className="flex items-center gap-1.5 pl-2">
                <Button variant="outline" size="sm" onClick={toggleRegister}><Archive className="mr-2 h-4 w-4"/> Register</Button>
                <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => cart.length > 0 ? setIsHoldOpen(true) : toast({ title: "Cart is empty" })}><Pause className="h-4 w-4"/></Button>
                <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => setIsSettingsOpen(true)}><Settings className="h-4 w-4"/></Button>
                <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => setIsShortcutsOpen(true)}><HelpCircle className="h-4 w-4"/></Button>
                <Button variant="outline" size="icon" className="h-9 w-9" onClick={toggleFullScreen}><Maximize className="h-4 w-4"/></Button>
            </div>
        </div>
        <Tabs defaultValue="products" className="h-full flex flex-col">
            <TabsList>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="held">Held Orders ({heldOrders.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="products" className="flex-grow mt-1">
                <Card className="h-full flex flex-col">
                    <CardHeader className="p-3 flex-row justify-between items-center">
                        <div className="flex items-center gap-2 overflow-x-auto pb-1.5">
                            {categories.map(category => (
                                <Button key={category} size="sm" variant={selectedCategory === category ? 'default' : 'outline'} onClick={() => setSelectedCategory(category)}>
                                    {category}
                                </Button>
                            ))}
                        </div>
                        <Button size="sm" onClick={() => setIsAddProductOpen(true)}>
                            <Plus className="h-4 w-4 mr-2" /> Add Product
                        </Button>
                    </CardHeader>
                    {viewSettings.viewMode === 'grid' ? (
                        <CardContent className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 overflow-y-auto p-3">
                            {filteredProducts.map(product => (
                                <Button key={product.id} variant="classic" className="h-auto flex-col gap-1 text-center p-2" onClick={() => addToCart(product)}>
                                    {viewSettings.showImage && (
                                        <div className="w-full h-20 bg-muted rounded-md flex items-center justify-center overflow-hidden">
                                            {product.imageUrl ? <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover"/> : <ImageIcon className="h-8 w-8 text-muted-foreground"/>}
                                        </div>
                                    )}
                                    <p className="text-sm font-semibold whitespace-normal leading-tight">{product.name}</p>
                                    {viewSettings.showUPC && <p className="text-xs text-sidebar-foreground">{product.upc}</p>}
                                    <p className="text-sm text-sidebar-foreground font-bold">{formatCurrency(product.price)}</p>
                                </Button>
                            ))}
                        </CardContent>
                    ) : (
                        <CardContent className="overflow-y-auto p-3 space-y-2">
                             {filteredProducts.map(product => (
                                <div key={product.id} className="flex items-center gap-3 p-2 border rounded-md">
                                    {viewSettings.showImage && (
                                        <div className="w-12 h-12 bg-muted rounded-md flex-shrink-0 flex items-center justify-center overflow-hidden">
                                           {product.imageUrl ? <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover"/> : <ImageIcon className="h-6 w-6 text-muted-foreground"/>}
                                        </div>
                                    )}
                                    <div className="flex-grow">
                                        <p className="font-semibold">{product.name}</p>
                                        <p className="text-sm text-muted-foreground">{formatCurrency(product.price)}</p>
                                        {viewSettings.showUPC && <p className="text-xs text-sidebar-foreground">{product.upc}</p>}
                                    </div>
                                    <Button size="sm" onClick={() => addToCart(product)}>Add</Button>
                                </div>
                             ))}
                        </CardContent>
                    )}
                </Card>
            </TabsContent>
            <TabsContent value="held" className="flex-grow mt-1">
               <Card className="h-full">
                  <CardHeader className="p-3"><CardTitle>Suspended Orders</CardTitle></CardHeader>
                  <CardContent className="space-y-2 p-3">
                      {heldOrders.length === 0 ? (
                          <p className="text-muted-foreground">No orders are currently on hold.</p>
                      ) : (
                          heldOrders.map(order => (
                              <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                                  <div>
                                      <p className="font-bold">{order.customerName} - {order.id}</p>
                                      <p className="text-sm text-muted-foreground">
                                          {order.items.length} items - Total: {formatCurrency(order.total)}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                          Held at: {order.timestamp.toLocaleTimeString()}
                                      </p>
                                  </div>
                                  <Button onClick={() => resumeOrder(order.id)}>Resume</Button>
                              </div>
                          ))
                      )}
                  </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
      </div>

      {/* --- DIALOGS --- */}
      
      {/* --- PAYMENT DIALOG --- */}
       <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
            <DialogDescription>Select payment method and confirm.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center text-4xl font-bold tracking-tight">{formatCurrency(cartTotal)}</div>
            <Select onValueChange={setPaymentMethod} defaultValue="Cash">
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cash"><div className="flex items-center gap-2"><Banknote className="h-4 w-4"/> Cash</div></SelectItem>
                <SelectItem value="Bank Transfer"><div className="flex items-center gap-2"><Banknote className="h-4 w-4"/> Bank Transfer</div></SelectItem>
                <SelectItem value="Credit Card"><div className="flex items-center gap-2"><CreditCard className="h-4 w-4"/> POS Terminal</div></SelectItem>
                <SelectItem value="Other"><div className="flex items-center gap-2"><DollarSign className="h-4 w-4"/> Other</div></SelectItem>
              </SelectContent>
            </Select>
            {paymentMethod === 'Cash' && (
                <div className="space-y-2">
                    <Label htmlFor="amount-tendered">Amount Tendered</Label>
                    <Input id="amount-tendered" type="number" placeholder="0.00" value={amountTendered || ''} onChange={e => setAmountTendered(parseFloat(e.target.value) || 0)}/>
                    {amountTendered >= cartTotal && <div className="text-right text-muted-foreground">Change Due: <span className="font-bold">{formatCurrency(changeDue)}</span></div>}
                </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentOpen(false)}>Cancel</Button>
            <Button onClick={processPayment} disabled={paymentMethod === 'Cash' && amountTendered < cartTotal}>Confirm Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- HOLD ORDER DIALOG --- */}
      <Dialog open={isHoldOpen} onOpenChange={setIsHoldOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Hold Order</DialogTitle>
                <DialogDescription>This order will be held under the selected customer: <span className="font-bold">{selectedCustomerName}</span>.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsHoldOpen(false)}>Cancel</Button>
                <Button onClick={holdOrder}>Confirm Hold</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* --- EDIT ITEM DIALOG --- */}
      <Dialog open={editingItem !== null} onOpenChange={() => setEditingItem(null)}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit Item: {editingItem?.name}</DialogTitle>
                <DialogDescription>Override price or apply an item-specific discount.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
                <div>
                    <Label>Override Price</Label>
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-semibold">₦</span>
                        <Input type="number" value={itemEditPrice} onChange={e => setItemEditPrice(parseFloat(e.target.value) || 0)} className="text-xl h-11"/>
                    </div>
                </div>
                <div>
                    <Label>Apply Discount</Label>
                    <RadioGroup value={itemEditDiscount.type} onValueChange={(val: "fixed" | "percentage") => setItemEditDiscount(prev => ({ ...prev, type: val }))}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="fixed" id="item-fixed" />
                            <Label htmlFor="item-fixed">Fixed Amount (₦)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="percentage" id="item-percent" />
                            <Label htmlFor="item-percent">Percentage (%)</Label>
                        </div>
                    </RadioGroup>
                    <Input 
                        type="number" 
                        placeholder="Discount Value" 
                        className="mt-2"
                        value={itemEditDiscount.value || ''}
                        onChange={e => setItemEditDiscount(prev => ({ ...prev, value: parseFloat(e.target.value) || 0 }))}
                    />
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setEditingItem(null)}>Cancel</Button>
                <Button onClick={handleUpdateItem}>Save Changes</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- CART DISCOUNT DIALOG --- */}
      <Dialog open={isCartDiscountOpen} onOpenChange={setIsCartDiscountOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Apply Cart Discount</DialogTitle>
                <DialogDescription>Apply a discount to the entire cart subtotal.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
               <RadioGroup value={cartDiscount.type} onValueChange={(val: "fixed" | "percentage") => setCartDiscount(prev => ({ ...prev, type: val }))}>
                  <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fixed" id="cart-fixed" />
                      <Label htmlFor="cart-fixed">Fixed Amount (₦)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                      <RadioGroupItem value="percentage" id="cart-percent" />
                      <Label htmlFor="cart-percent">Percentage (%)</Label>
                  </div>
              </RadioGroup>
              <Input 
                  type="number" 
                  placeholder="Discount Value" 
                  className="mt-2"
                  value={cartDiscount.value || ''}
                  onChange={e => setCartDiscount(prev => ({ ...prev, value: parseFloat(e.target.value) || 0 }))}
              />
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsCartDiscountOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsCartDiscountOpen(false)}>Apply Discount</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* --- SHORTCUTS DIALOG --- */}
       <Dialog open={isShortcutsOpen} onOpenChange={setIsShortcutsOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Keyboard Shortcuts</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <p>Go to Payment</p><Badge variant="outline">Ctrl + P</Badge>
            <p>Hold Order</p><Badge variant="outline">Ctrl + H</Badge>
            <p>Focus Search</p><Badge variant="outline">Ctrl + F</Badge>
            <p>Select Customer</p><Badge variant="outline">Ctrl + C (Not Implemented)</Badge>
          </div>
        </DialogContent>
      </Dialog>

      {/* --- NEW: SETTINGS DIALOG --- */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogContent>
              <DialogHeader><DialogTitle>View Settings</DialogTitle></DialogHeader>
              <div className="space-y-6 py-4">
                  <div className="flex items-center justify-between">
                      <Label htmlFor="view-mode">Product View</Label>
                      <RadioGroup 
                          id="view-mode" 
                          defaultValue="grid" 
                          className="flex items-center gap-2"
                          value={viewSettings.viewMode}
                          onValueChange={(value: 'grid' | 'list') => setViewSettings(prev => ({ ...prev, viewMode: value }))}
                      >
                          <Button variant={viewSettings.viewMode === 'grid' ? 'default' : 'outline'} size="icon"><LayoutGrid className="h-4 w-4" /></Button>
                          <Button variant={viewSettings.viewMode === 'list' ? 'default' : 'outline'} size="icon"><List className="h-4 w-4" /></Button>
                      </RadioGroup>
                  </div>
                  <div className="flex items-center justify-between">
                      <Label htmlFor="show-images">Show Product Images</Label>
                      <Switch 
                          id="show-images"
                          checked={viewSettings.showImage}
                          onCheckedChange={(checked) => setViewSettings(prev => ({ ...prev, showImage: checked }))}
                      />
                  </div>
                  <div className="flex items-center justify-between">
                      <Label htmlFor="show-upc">Show Product UPC</Label>
                      <Switch 
                          id="show-upc"
                          checked={viewSettings.showUPC}
                          onCheckedChange={(checked) => setViewSettings(prev => ({ ...prev, showUPC: checked }))}
                      />
                  </div>
              </div>
          </DialogContent>
      </Dialog>
      
      {/* --- NEW: ADD CUSTOMER DIALOG --- */}
      <Dialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
          <DialogContent>
              <DialogHeader><DialogTitle>Add New Customer</DialogTitle></DialogHeader>
              <form onSubmit={(e) => {
                  e.preventDefault();
                  handleAddCustomer(e.currentTarget.customerName.value);
                  e.currentTarget.reset();
              }}>
                  <div className="py-1">
                      <Label htmlFor="customer-name">Full Name</Label>
                      <Input id="customer-name" name="customerName" placeholder="e.g., Femi Adebayo" required />
                  </div>
                  <div className="py-1">
                      <Label htmlFor="customer-name">Phone Number</Label>
                      <Input id="customer-name" name="customerName" placeholder="09010786146" required />
                  </div>
                  <div className="py-1">
                      <Label htmlFor="customer-name">Email Address</Label>
                      <Input id="customer-name" name="customerName" placeholder="admin@8point.com" required />
                  </div>
                  <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsAddCustomerOpen(false)}>Cancel</Button>
                      <Button type="submit">Save Customer</Button>
                  </DialogFooter>
              </form>
          </DialogContent>
      </Dialog>

      {/* --- NEW: ADD PRODUCT DIALOG --- */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="sm:max-w-[480px]">
            <DialogHeader><DialogTitle>Add New Product</DialogTitle></DialogHeader>
            <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const newProduct = {
                    name: formData.get('name') as string,
                    price: parseFloat(formData.get('price') as string),
                    stock: parseInt(formData.get('stock') as string),
                    category: formData.get('category') as string,
                    upc: formData.get('upc') as string,
                    imageUrl: formData.get('imageUrl') as string || undefined,
                };
                handleAddProduct(newProduct);
                e.currentTarget.reset();
            }}>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" name="name" required className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">Price (₦)</Label>
                        <Input id="price" name="price" type="number" required className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stock" className="text-right">Stock</Label>
                        <Input id="stock" name="stock" type="number" required className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">Category</Label>
                        <Input id="category" name="category" required className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="upc" className="text-right">UPC</Label>
                        <Input id="upc" name="upc" required className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="imageUrl" className="text-right">Image URL</Label>
                        <Input id="imageUrl" name="imageUrl" placeholder="Optional" className="col-span-3" />
                    </div>
                </div>
                 <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsAddProductOpen(false)}>Cancel</Button>
                    <Button type="submit">Save Product</Button>
                </DialogFooter>
            </form>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default POSPage;