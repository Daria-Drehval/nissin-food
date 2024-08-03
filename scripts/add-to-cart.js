(function () {
  const selectors = {
    cartCount: '.header__cartItems',
    cartDrawer: '.cartDrawer',
    product: '.product',
    productDrawer: '.cartDrawer__product',
    removeBtnDrawer: '.cartDrawer__productRemove',
    removeBtn: '.cartItem__remove',
    productAddBtn: '.productItem__formButton',
    productSelect: '.productIdSelect--js',
    content: '.cartDrawer__content',
    subtotal: '.cartDrawer__footerSubtotal',
    headerCart: '.header__cart',
    cartOverlay: '.cartDrawer__overlay',
    productPrice: '.cartItem__price',
    productTotal: '.cartItem__productTotal',
    productQtyInput: '.productItem__formQuantityValue',
    qtyPlus: '.button--plus',
    qtyMinus: '.button--minus',
    cartCountFooter: '.cartTotal__itemQty',
    cartTotal: '.cartTotal__value',
    productQty: '.cartItem__contentQuantity',
    productQtySelect: '.cartItem__quantityInput',
    productInput: '.productSection__quantity',
    customSelector: '.customSelect--selected',
    hiddenSelect: '.productIdSelect--js',
    customSelects: '.productCustomSelect--js',
    selectorItemsQty: '.customSelect__items div',
    cartContentWrapper: '.cartContent__wrapper',
    cartDesktopProd: '.cartItem__desktop',
    cartMobileProd: '.cartItem__mobile',
    cartEmpty: '.cartEmpty',
    checkoutBtn: '.cartTotal__checkout',

    cartEmptyHiddenClass: 'cartEmpty--hidden',
    cartContentWrapperHiddenClass: 'cartContent__wrapper--hidden',

    cartDrawerOpen: 'cartDrawer--open',
    cartOverlayActive: 'cartDrawer__overlay--active',
  };

  const cartDrawer = document.querySelector(selectors.cartDrawer);
  const product = document.querySelectorAll(selectors.product);
  const productAddBtn = document.querySelectorAll(selectors.productAddBtn);
  const headerCart = document.querySelectorAll(selectors.headerCart);
  const cartOverlay = document.querySelector(selectors.cartOverlay);
  const checkoutBtn = document.querySelector(selectors.checkoutBtn);

  const showDrawer = () => {
    cartDrawer.classList.add(selectors.cartDrawerOpen);
    cartOverlay.classList.add(selectors.cartOverlayActive);
  };

  const hideDrawer = () => {
    cartDrawer.classList.remove(selectors.cartDrawerOpen);
    cartOverlay.classList.remove(selectors.cartOverlayActive);
  };

  initListeners();

  productAddBtn.forEach((el) => {
    el.addEventListener('click', (event) => {
      event.preventDefault();
      const variantIDdrawer = el.parentNode.parentNode.parentNode.querySelector(selectors.productSelect).value;
      let quantityVariant;
      const productInput = document.querySelectorAll(selectors.productInput);
      productInput.forEach((qty) => {
        if (!qty.hasAttribute('hidden')) {
          quantityVariant = qty.querySelector('input').value;
        }
      });
      addToCartDrawer(variantIDdrawer, quantityVariant);
    });
  });

  headerCart.forEach((button) => {
    button.addEventListener('click', () => {
      showDrawer();
    });
  });

  cartOverlay.addEventListener('click', () => {
    hideDrawer();
  });

  function showTotalPrice(item) {
    if (!item.classList.contains('product')) {
      item = item.closest(selectors.product);
    }

    let totalPrice = Number();
    const productTotal = item.querySelector(selectors.productTotal);
    const productQtyInput = item.querySelector(selectors.productQtyInput);
    const productPrice = item.querySelector(selectors.productPrice);
    const items = +productQtyInput.value;
    const price = +productPrice.innerHTML.substring(1, 10);
    totalPrice += (items * price) + '.00';
    productTotal.innerHTML = window.formatMoney(totalPrice, window.theme.moneyFormat);
  }

  product.forEach((item) => {
    if (checkoutBtn) {
      showTotalPrice(item);
    }
  });

  async function changeQty(itemId, quantity) {
    const variantToChange = {
      updates: {
        [itemId]: quantity,
      },
    };

    const updatePromise = await fetch('/cart/update.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(variantToChange),
    });

    if (!updatePromise.ok) {
      throw new Error('Problem with the server. Try to reload the page');
    }

    drawCart(itemId, quantity);
  }

  function initListeners() {
    const qtyPlus = document.querySelectorAll(selectors.qtyPlus);
    const qtyMinus = document.querySelectorAll(selectors.qtyMinus);
    const removeBtn = document.querySelectorAll(selectors.removeBtn);
    const removeBtnDrawer = document.querySelectorAll(selectors.removeBtnDrawer);
    const selectorItemsQty = document.querySelectorAll(selectors.selectorItemsQty);

    qtyPlus.forEach((el) => {
      el.addEventListener('click', (event) => {
        const productQtyInput = el.parentNode.querySelector('input');
        const btnMinus = el.parentNode.querySelector(selectors.qtyMinus);
        const currentItemId = event.currentTarget.closest(selectors.product).dataset.id;
        productQtyInput.value = +productQtyInput.value + 1;

        btnMinus.disabled = false;

        if (checkoutBtn) {
          showTotalPrice(el);
          changeQty(currentItemId, productQtyInput.value);
          el.setAttribute('disabled', '');
        }
      });
    });

    qtyMinus.forEach((el) => {
      const productQtyInput = el.parentNode.querySelector('input');

      if (productQtyInput.value === '1') {
        el.setAttribute('disabled', '');
      }

      el.addEventListener('click', (event) => {
        const currentItemId = event.currentTarget.closest(selectors.product).dataset.id;

        productQtyInput.value = +productQtyInput.value - 1;

        if (productQtyInput.value === '1') {
          el.disabled = true;
        }

        if (checkoutBtn) {
          changeQty(currentItemId, productQtyInput.value);
          showTotalPrice(el);
          el.setAttribute('disabled', '');
        }
      });
    });

    selectorItemsQty.forEach((select) => {
      select.addEventListener('click', (event) => {
        const productQtyInput = select.parentNode.parentNode.querySelector('select');
        const currentItemId = event.currentTarget.closest(selectors.product).dataset.id;

        if (checkoutBtn) {
          showTotalPrice(select);
          changeQty(currentItemId, productQtyInput.value);
        }
      });
    });

    removeBtn.forEach((el) => {
      el.addEventListener('click', (event) => {
        const currentItem = event.currentTarget.closest(selectors.product);
        const currentItemId = currentItem.dataset.id;
        currentItem.style.display = 'none';
        changeQty(currentItemId, 0);
        el.setAttribute('disabled', '');
      });
    });

    // remove button for drawer
    removeBtnDrawer.forEach((el) => {
      el.addEventListener('click', (event) => {
        const currentItem = event.currentTarget.closest(selectors.productDrawer);
        const currentItemId = currentItem.dataset.id;
        currentItem.style.display = 'none';
        changeQty(currentItemId, 0);
        el.setAttribute('disabled', '');
      });
    });
  }

  async function addToCartDrawer(variantIDdrawer, quantityVariant) {
    const formData = {
      'items': [{
        id: variantIDdrawer,
        quantity: quantityVariant
      }]
    };

    const addToCartPromise = await fetch(window.Shopify.routes.root + 'cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!addToCartPromise.ok) {
      console.error('Error:', error);
    }
    drawCart();
    showDrawer();
  }

  async function drawCart(id, quantity) {
    const cartPromiseIn = await fetch('?section-id=cart-drawer');

    if (!cartPromiseIn.ok) {
      throw new Error('Problem with the server. Try to reload the page');
    }

    const cartContent = await cartPromiseIn.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(cartContent, 'text/html');
    const content = document.querySelector(selectors.content);
    const newContent = doc.querySelector(selectors.content);
    const oldSubtotal = document.querySelector(selectors.subtotal);
    const newSubtotal = doc.querySelector(selectors.subtotal);
    const cartCount = document.querySelectorAll(selectors.cartCount);
    const newCartCount = doc.querySelectorAll(selectors.cartCount);
    const cartCountFooter = document.querySelector(selectors.cartCountFooter);
    const newCartCountFooter = doc.querySelector(selectors.cartCountFooter);
    const cartTotal = document.querySelector(selectors.cartTotal);
    const newCartTotal = doc.querySelector(selectors.cartTotal);
    const productQty = document.querySelectorAll(selectors.productQty);
    const newProductQty = doc.querySelectorAll(selectors.productQty);
    const mobileProduct = document.querySelector(`.cartItem__mobile[data-id="${id}"]`);
    const mobileSelect = mobileProduct?.querySelector('.customSelect--selected');

    if (mobileSelect && quantity) {
      mobileSelect.innerHTML = quantity;
    }

    if (content && newContent) {
      content.innerHTML = newContent.innerHTML;
      oldSubtotal.innerHTML = newSubtotal.innerHTML;
      cartCount.forEach((count, index) => {
        newCartCount.forEach((newCount, indexNew) => {
          if (index === indexNew) {
            count.innerHTML = newCount.innerHTML;
          }
        });
      });
      if (newCartCountFooter) {
        cartCountFooter.innerHTML = newCartCountFooter.innerHTML;
      } else if (cartCount.innerHTML === '(0)') {
        cartCountFooter.innerHTML = 0;
      }
      if (newCartTotal) {
        cartTotal.innerHTML = newCartTotal.innerHTML;
      } else if (cartCount.innerHTML === '(0)') {
        cartTotal.innerHTML = `$0`;
      }
      productQty.forEach((qtyInput, index) => {
        newProductQty.forEach((qtyInputNew, indexNew) => {
          if (index === indexNew) {
            const qtyMinusOld = qtyInput.querySelector(selectors.qtyMinus);

            if (qtyMinusOld) {
              qtyInput.innerHTML = qtyInputNew.innerHTML;
            }
          }
        });
      });

      initListeners();
    }
  }

  // custom select
  const quantitySelector = document.querySelector(selectors.productQty);

  // click to custom select
  const customSelector = document.querySelector(selectors.customSelector);

  customSelector?.addEventListener('click', () => {
    if (quantitySelector.classList.contains('open')) {
      quantitySelector.classList.remove('open');
    } else {
      quantitySelector.classList.add('open');
    }
  });
}());
