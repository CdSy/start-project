import 'bootstrap-less/js/modal.js';
import  '../less/main.less';

import { ShoppingCart } from './components/ShoppingCart.es6';
import { ProductCard } from './components/ProductCard.es6';

window.$$ = window.$$ || {};

function calculateScroll() {
    const header = $('.js-sticky-element');
    let activeState = false;

    $(document).on('scroll', (event) => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (activeState === false && scrollTop > 200) {
            header.addClass('visible');
            activeState = true;
        }

        if (activeState === true && scrollTop < 200) {
            header.removeClass('visible');
            activeState = false;
        }
    });
}

export class Application {
    constructor() {
        this.initShoppingCart();
        this.initProductCard();
    }

    initShoppingCart() {
        $('.js-shopping-cart').each(function() {
            $$.window.store = new ShoppingCart($(this));
        });
    }

    initProductCard() {
        $('.js-product-card').each(function() {
            new ProductCard($(this), $$.window.store);
        });
    }
}

$(function() {
    $$.window = $(window);
	$$.body = $('body');
    $$.html = $('html');
    let formModal = $('#form-modal');
    let successModal = $('#success-modal');
    const app = new Application();

    function initModals() {
        formModal.modal({show: false});
        successModal.modal({show: false});
    }
    
    function bindEvents() {
        const form = $('.js-form');
        const modalTrigger = $('.js-modal-trigger');
    
        form.on('submit', (event) => {
            event.preventDefault();

            formModal.modal('hide');
            successModal.modal('show');
        });

        modalTrigger.on('click', () => {
            if ($$.window.store.products.length === 0) {
                return;
            }

            formModal.modal('show');
        });
    }

    calculateScroll();
    initModals();
    bindEvents();
});
