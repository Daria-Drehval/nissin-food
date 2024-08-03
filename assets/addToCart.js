/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/*!********************************!*\
  !*** ./scripts/add-to-cart.js ***!
  \********************************/
eval("(function () {\n  const selectors = {\n    cartCount: '.header__cartItems',\n    cartDrawer: '.cartDrawer',\n    product: '.product',\n    productDrawer: '.cartDrawer__product',\n    removeBtnDrawer: '.cartDrawer__productRemove',\n    removeBtn: '.cartItem__remove',\n    productAddBtn: '.productItem__formButton',\n    productSelect: '.productIdSelect--js',\n    content: '.cartDrawer__content',\n    subtotal: '.cartDrawer__footerSubtotal',\n    headerCart: '.header__cart',\n    cartOverlay: '.cartDrawer__overlay',\n    productPrice: '.cartItem__price',\n    productTotal: '.cartItem__productTotal',\n    productQtyInput: '.productItem__formQuantityValue',\n    qtyPlus: '.button--plus',\n    qtyMinus: '.button--minus',\n    cartCountFooter: '.cartTotal__itemQty',\n    cartTotal: '.cartTotal__value',\n    productQty: '.cartItem__contentQuantity',\n    productQtySelect: '.cartItem__quantityInput',\n    productInput: '.productSection__quantity',\n    customSelector: '.customSelect--selected',\n    hiddenSelect: '.productIdSelect--js',\n    customSelects: '.productCustomSelect--js',\n    selectorItemsQty: '.customSelect__items div',\n    cartContentWrapper: '.cartContent__wrapper',\n    cartDesktopProd: '.cartItem__desktop',\n    cartMobileProd: '.cartItem__mobile',\n    cartEmpty: '.cartEmpty',\n    checkoutBtn: '.cartTotal__checkout',\n\n    cartEmptyHiddenClass: 'cartEmpty--hidden',\n    cartContentWrapperHiddenClass: 'cartContent__wrapper--hidden',\n\n    cartDrawerOpen: 'cartDrawer--open',\n    cartOverlayActive: 'cartDrawer__overlay--active',\n  };\n\n  const cartDrawer = document.querySelector(selectors.cartDrawer);\n  const product = document.querySelectorAll(selectors.product);\n  const productAddBtn = document.querySelectorAll(selectors.productAddBtn);\n  const headerCart = document.querySelectorAll(selectors.headerCart);\n  const cartOverlay = document.querySelector(selectors.cartOverlay);\n  const checkoutBtn = document.querySelector(selectors.checkoutBtn);\n\n  const showDrawer = () => {\n    cartDrawer.classList.add(selectors.cartDrawerOpen);\n    cartOverlay.classList.add(selectors.cartOverlayActive);\n  };\n\n  const hideDrawer = () => {\n    cartDrawer.classList.remove(selectors.cartDrawerOpen);\n    cartOverlay.classList.remove(selectors.cartOverlayActive);\n  };\n\n  initListeners();\n\n  productAddBtn.forEach((el) => {\n    el.addEventListener('click', (event) => {\n      event.preventDefault();\n      const variantIDdrawer = el.parentNode.parentNode.parentNode.querySelector(selectors.productSelect).value;\n      let quantityVariant;\n      const productInput = document.querySelectorAll(selectors.productInput);\n      productInput.forEach((qty) => {\n        if (!qty.hasAttribute('hidden')) {\n          quantityVariant = qty.querySelector('input').value;\n        }\n      });\n      addToCartDrawer(variantIDdrawer, quantityVariant);\n    });\n  });\n\n  headerCart.forEach((button) => {\n    button.addEventListener('click', () => {\n      showDrawer();\n    });\n  });\n\n  cartOverlay.addEventListener('click', () => {\n    hideDrawer();\n  });\n\n  function showTotalPrice(item) {\n    if (!item.classList.contains('product')) {\n      item = item.closest(selectors.product);\n    }\n\n    let totalPrice = Number();\n    const productTotal = item.querySelector(selectors.productTotal);\n    const productQtyInput = item.querySelector(selectors.productQtyInput);\n    const productPrice = item.querySelector(selectors.productPrice);\n    const items = +productQtyInput.value;\n    const price = +productPrice.innerHTML.substring(1, 10);\n    totalPrice += (items * price) + '.00';\n    productTotal.innerHTML = window.formatMoney(totalPrice, window.theme.moneyFormat);\n  }\n\n  product.forEach((item) => {\n    if (checkoutBtn) {\n      showTotalPrice(item);\n    }\n  });\n\n  async function changeQty(itemId, quantity) {\n    const variantToChange = {\n      updates: {\n        [itemId]: quantity,\n      },\n    };\n\n    const updatePromise = await fetch('/cart/update.js', {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json',\n      },\n      body: JSON.stringify(variantToChange),\n    });\n\n    if (!updatePromise.ok) {\n      throw new Error('Problem with the server. Try to reload the page');\n    }\n\n    drawCart(itemId, quantity);\n  }\n\n  function initListeners() {\n    const qtyPlus = document.querySelectorAll(selectors.qtyPlus);\n    const qtyMinus = document.querySelectorAll(selectors.qtyMinus);\n    const removeBtn = document.querySelectorAll(selectors.removeBtn);\n    const removeBtnDrawer = document.querySelectorAll(selectors.removeBtnDrawer);\n    const selectorItemsQty = document.querySelectorAll(selectors.selectorItemsQty);\n\n    qtyPlus.forEach((el) => {\n      el.addEventListener('click', (event) => {\n        const productQtyInput = el.parentNode.querySelector('input');\n        const btnMinus = el.parentNode.querySelector(selectors.qtyMinus);\n        const currentItemId = event.currentTarget.closest(selectors.product).dataset.id;\n        productQtyInput.value = +productQtyInput.value + 1;\n\n        btnMinus.disabled = false;\n\n        if (checkoutBtn) {\n          showTotalPrice(el);\n          changeQty(currentItemId, productQtyInput.value);\n          el.setAttribute('disabled', '');\n        }\n      });\n    });\n\n    qtyMinus.forEach((el) => {\n      const productQtyInput = el.parentNode.querySelector('input');\n\n      if (productQtyInput.value === '1') {\n        el.setAttribute('disabled', '');\n      }\n\n      el.addEventListener('click', (event) => {\n        const currentItemId = event.currentTarget.closest(selectors.product).dataset.id;\n\n        productQtyInput.value = +productQtyInput.value - 1;\n\n        if (productQtyInput.value === '1') {\n          el.disabled = true;\n        }\n\n        if (checkoutBtn) {\n          changeQty(currentItemId, productQtyInput.value);\n          showTotalPrice(el);\n          el.setAttribute('disabled', '');\n        }\n      });\n    });\n\n    selectorItemsQty.forEach((select) => {\n      select.addEventListener('click', (event) => {\n        const productQtyInput = select.parentNode.parentNode.querySelector('select');\n        const currentItemId = event.currentTarget.closest(selectors.product).dataset.id;\n\n        if (checkoutBtn) {\n          showTotalPrice(select);\n          changeQty(currentItemId, productQtyInput.value);\n        }\n      });\n    });\n\n    removeBtn.forEach((el) => {\n      el.addEventListener('click', (event) => {\n        const currentItem = event.currentTarget.closest(selectors.product);\n        const currentItemId = currentItem.dataset.id;\n        currentItem.style.display = 'none';\n        changeQty(currentItemId, 0);\n        el.setAttribute('disabled', '');\n      });\n    });\n\n    // remove button for drawer\n    removeBtnDrawer.forEach((el) => {\n      el.addEventListener('click', (event) => {\n        const currentItem = event.currentTarget.closest(selectors.productDrawer);\n        const currentItemId = currentItem.dataset.id;\n        currentItem.style.display = 'none';\n        changeQty(currentItemId, 0);\n        el.setAttribute('disabled', '');\n      });\n    });\n  }\n\n  async function addToCartDrawer(variantIDdrawer, quantityVariant) {\n    const formData = {\n      'items': [{\n        id: variantIDdrawer,\n        quantity: quantityVariant\n      }]\n    };\n\n    const addToCartPromise = await fetch(window.Shopify.routes.root + 'cart/add.js', {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json',\n      },\n      body: JSON.stringify(formData),\n    });\n\n    if (!addToCartPromise.ok) {\n      console.error('Error:', error);\n    }\n    drawCart();\n    showDrawer();\n  }\n\n  async function drawCart(id, quantity) {\n    const cartPromiseIn = await fetch('?section-id=cart-drawer');\n\n    if (!cartPromiseIn.ok) {\n      throw new Error('Problem with the server. Try to reload the page');\n    }\n\n    const cartContent = await cartPromiseIn.text();\n    const parser = new DOMParser();\n    const doc = parser.parseFromString(cartContent, 'text/html');\n    const content = document.querySelector(selectors.content);\n    const newContent = doc.querySelector(selectors.content);\n    const oldSubtotal = document.querySelector(selectors.subtotal);\n    const newSubtotal = doc.querySelector(selectors.subtotal);\n    const cartCount = document.querySelectorAll(selectors.cartCount);\n    const newCartCount = doc.querySelectorAll(selectors.cartCount);\n    const cartCountFooter = document.querySelector(selectors.cartCountFooter);\n    const newCartCountFooter = doc.querySelector(selectors.cartCountFooter);\n    const cartTotal = document.querySelector(selectors.cartTotal);\n    const newCartTotal = doc.querySelector(selectors.cartTotal);\n    const productQty = document.querySelectorAll(selectors.productQty);\n    const newProductQty = doc.querySelectorAll(selectors.productQty);\n    const mobileProduct = document.querySelector(`.cartItem__mobile[data-id=\"${id}\"]`);\n    const mobileSelect = mobileProduct?.querySelector('.customSelect--selected');\n\n    if (mobileSelect && quantity) {\n      mobileSelect.innerHTML = quantity;\n    }\n\n    if (content && newContent) {\n      content.innerHTML = newContent.innerHTML;\n      oldSubtotal.innerHTML = newSubtotal.innerHTML;\n      cartCount.forEach((count, index) => {\n        newCartCount.forEach((newCount, indexNew) => {\n          if (index === indexNew) {\n            count.innerHTML = newCount.innerHTML;\n          }\n        });\n      });\n      if (newCartCountFooter) {\n        cartCountFooter.innerHTML = newCartCountFooter.innerHTML;\n      } else if (cartCount.innerHTML === '(0)') {\n        cartCountFooter.innerHTML = 0;\n      }\n      if (newCartTotal) {\n        cartTotal.innerHTML = newCartTotal.innerHTML;\n      } else if (cartCount.innerHTML === '(0)') {\n        cartTotal.innerHTML = `$0`;\n      }\n      productQty.forEach((qtyInput, index) => {\n        newProductQty.forEach((qtyInputNew, indexNew) => {\n          if (index === indexNew) {\n            const qtyMinusOld = qtyInput.querySelector(selectors.qtyMinus);\n\n            if (qtyMinusOld) {\n              qtyInput.innerHTML = qtyInputNew.innerHTML;\n            }\n          }\n        });\n      });\n\n      initListeners();\n    }\n  }\n\n  // custom select\n  const quantitySelector = document.querySelector(selectors.productQty);\n\n  // click to custom select\n  const customSelector = document.querySelector(selectors.customSelector);\n\n  customSelector?.addEventListener('click', () => {\n    if (quantitySelector.classList.contains('open')) {\n      quantitySelector.classList.remove('open');\n    } else {\n      quantitySelector.classList.add('open');\n    }\n  });\n}());\n\n\n//# sourceURL=webpack://ds-shopify-boilerplate/./scripts/add-to-cart.js?");
/******/ })()
;